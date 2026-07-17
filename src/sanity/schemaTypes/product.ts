import { defineField, defineType } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Product (Sản Phẩm)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tên Sản Phẩm',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn (Slug - Ấn Generate để tự tạo)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'price',
      title: 'Giá tiền (Chuỗi hiển thị, VD: 1,399,000 VND)',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Hình Ảnh',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    }),
    defineField({
      name: 'description',
      title: 'Mô tả',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Màu sắc / SKU',
      type: 'string',
    }),
    defineField({
      name: 'collection',
      title: 'Thuộc Bộ Sưu Tập',
      type: 'reference',
      to: [{ type: 'collection' }]
    }),
    defineField({
      name: 'category',
      title: 'Danh Mục (Áo, Quần, v.v.)',
      type: 'reference',
      to: [{ type: 'category' }]
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Sản phẩm liên quan (Hoàn thiện phong cách)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }]
    }),
    // Complex fields for Size Guide and Care Details can be mapped to nested objects
    defineField({
      name: 'sizeGuide',
      title: 'Kích Thước Sản Phẩm (Size Guide)',
      type: 'object',
      fields: [
        defineField({
          name: 'headers',
          title: 'Các cột (VD: KHU VỰC, XS, S, M, L)',
          type: 'array',
          of: [{ type: 'string' }]
        }),
        defineField({
          name: 'rows',
          title: 'Các dòng',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Khu vực (VD: Ngực)', type: 'string' }),
                defineField({ name: 'values', title: 'Số đo', type: 'array', of: [{ type: 'string' }] })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'careDetails',
      title: 'Chất liệu & Chăm sóc',
      type: 'object',
      fields: [
        defineField({
          name: 'materialOuter',
          title: 'Lớp ngoài',
          type: 'string'
        }),
        defineField({
          name: 'materialInner',
          title: 'Lớp lót',
          type: 'string'
        }),
        defineField({
          name: 'careInstructions',
          title: 'Hướng dẫn chăm sóc',
          type: 'array',
          of: [{ type: 'string' }]
        }),
        defineField({
          name: 'origin',
          title: 'Nguồn gốc',
          type: 'string'
        })
      ]
    })
  ],
})
