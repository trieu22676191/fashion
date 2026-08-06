import { NextResponse } from "next/server";
import { generateContent } from "@/lib/geminiClient";
import { searchProductsForChat, getProductsByIds } from "@/lib/chatTools";

export const runtime = "nodejs";

const MODEL = "gemini-flash-lite-latest";
const MAX_TOOL_ITERATIONS = 4;

const tools = [
  {
    functionDeclarations: [
      {
        name: "search_products",
        description:
          "Tìm kiếm sản phẩm thời trang trong cửa hàng theo tên hoặc mô tả. Dùng khi khách hỏi về loại sản phẩm, nhu cầu (vd. 'áo đi tiệc', 'quần jean'), hoặc muốn biết cửa hàng có gì.",
        parametersJsonSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Từ khóa tìm kiếm, ví dụ 'áo sơ mi', 'đầm dạ hội'",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "recommend_products",
        description:
          "Hiển thị thẻ sản phẩm cụ thể cho khách xem, kèm nút để khách tự thêm vào giỏ hàng. Chỉ gọi với id sản phẩm lấy từ kết quả search_products — không tự bịa id. Không tự động thêm vào giỏ hàng.",
        parametersJsonSchema: {
          type: "object",
          properties: {
            productIds: {
              type: "array",
              items: { type: "string" },
              description: "Danh sách id sản phẩm muốn gợi ý, tối đa 4",
            },
          },
          required: ["productIds"],
        },
      },
    ],
  },
];

function buildSystemInstruction(currentProduct) {
  let text = `Bạn là trợ lý tư vấn của LUMIÈRE, một cửa hàng thời trang cao cấp. Luôn trả lời bằng tiếng Việt, ngắn gọn, thân thiện, chuyên nghiệp.
- Chỉ nói về sản phẩm có thật trong cửa hàng. Dùng tool search_products để tra cứu trước khi khẳng định điều gì về sản phẩm hoặc giá.
- Khi muốn gợi ý sản phẩm cụ thể cho khách xem, gọi tool recommend_products với id sản phẩm lấy từ kết quả search_products gần nhất. Không tự bịa id.
- QUAN TRỌNG: id sản phẩm không được lưu giữa các lượt chat. Nếu khách đồng ý xem một sản phẩm đã nhắc ở lượt trước (vd. "có, cho tôi xem", "ừ"), LUÔN gọi lại search_products với tên sản phẩm đó trong lượt này để lấy id thật, rồi mới gọi recommend_products — tuyệt đối không dùng lại id đã đoán từ lượt trước.
- Không tự động thêm sản phẩm vào giỏ hàng — khách sẽ tự bấm nút "Thêm vào giỏ" trên thẻ sản phẩm hiện ra.
- Nếu không tìm thấy sản phẩm phù hợp sau khi tìm kiếm, hãy thành thật nói không có, đừng bịa ra sản phẩm.
- Trả lời bằng văn bản thuần, không dùng markdown (không dùng **, #, dấu gạch đầu dòng) vì khung chat chỉ hiển thị chữ thô.`;

  if (currentProduct?.name) {
    text += `\n\nKhách đang xem sản phẩm "${currentProduct.name}" (id: ${currentProduct.id}) trên trang web. Nếu khách hỏi mà không nêu rõ tên sản phẩm (vd. "sản phẩm này", "cái này", "áo này"), mặc định họ đang hỏi về sản phẩm đang xem.`;
  }

  return { parts: [{ text }] };
}

async function runTool(name, args) {
  if (name === "search_products") {
    const results = await searchProductsForChat(args?.query || "");
    return {
      output: results.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        color: p.color,
      })),
    };
  }

  if (name === "recommend_products") {
    const ids = Array.isArray(args?.productIds) ? args.productIds.slice(0, 4) : [];
    const products = await getProductsByIds(ids);
    return { products, output: `Đã hiển thị ${products.length} sản phẩm cho khách xem.` };
  }

  return { output: "Tool không tồn tại." };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const history = Array.isArray(body?.messages) ? body.messages : [];
    const currentProduct = body?.currentProduct || null;

    if (history.length === 0) {
      return NextResponse.json({ error: "Thiếu tin nhắn" }, { status: 400 });
    }

    const contents = history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const recommendedProducts = [];
    let finalText = "";

    for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
      const response = await generateContent({
        model: MODEL,
        contents,
        config: {
          systemInstruction: buildSystemInstruction(currentProduct),
          tools,
          maxOutputTokens: 1024,
        },
      });

      const functionCalls = response.functionCalls || [];

      if (functionCalls.length === 0) {
        finalText = (response.text || "").trim();
        break;
      }

      contents.push(response.candidates[0].content);

      const responseParts = [];
      for (const call of functionCalls) {
        const result = await runTool(call.name, call.args);
        if (result.products) {
          recommendedProducts.push(...result.products);
        }
        responseParts.push({
          functionResponse: {
            name: call.name,
            response: { output: result.output },
          },
        });
      }

      contents.push({ role: "user", parts: responseParts });
    }

    if (!finalText) {
      finalText =
        "Xin lỗi, mình chưa thể trả lời câu hỏi này ngay. Bạn có thể hỏi lại theo cách khác không?";
    }

    const seenIds = new Set();
    const products = recommendedProducts
      .filter((p) => {
        if (seenIds.has(p.id)) return false;
        seenIds.add(p.id);
        return true;
      })
      .slice(0, 4);

    return NextResponse.json({ reply: finalText, products });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Xin lỗi, trợ lý đang gặp sự cố. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
