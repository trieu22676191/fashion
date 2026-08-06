import { defineField, defineType } from 'sanity'

export const collectionSchema = defineType({
  name: 'collection',
  title: 'Collection (Bộ Sưu Tập)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tên Bộ Sưu Tập',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Đường Dẫn (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Mô tả',
      type: 'text',
    }),
    defineField({
      name: 'isActive',
      title: 'Hiển thị trên trang web',
      description: 'Tắt để ẩn bộ sưu tập này khỏi trang web (menu, trang chủ, trang chi tiết) mà không cần xóa.',
      type: 'boolean',
      initialValue: true,
    })
  ],
})
