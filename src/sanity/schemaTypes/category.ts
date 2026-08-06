import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Danh Mục (Category)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tên Danh Mục',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Mô Tả',
      type: 'text',
    }),
    defineField({
      name: 'isActive',
      title: 'Hiển thị trên trang web',
      description: 'Tắt để ẩn danh mục này khỏi trang web (menu, danh sách) mà không cần xóa.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
