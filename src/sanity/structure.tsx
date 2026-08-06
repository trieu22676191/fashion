import type { StructureResolver } from "sanity/structure";
import { TogglableDocumentList } from "./tools/TogglableDocumentList";

function togglableList(
  S: Parameters<StructureResolver>[0],
  docType: string,
  title: string,
  titleField: string
) {
  return S.listItem()
    .id(docType)
    .title(title)
    .child(
      Object.assign(S.documentTypeList(docType).serialize(), {
        type: "component",
        component: TogglableDocumentList,
        options: { docType, titleField },
      })
    );
}

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      togglableList(S, "collection", "Collection (Bộ Sưu Tập)", "title"),
      togglableList(S, "product", "Product (Sản Phẩm)", "name"),
      togglableList(S, "category", "Danh Mục (Category)", "title"),
    ]);
