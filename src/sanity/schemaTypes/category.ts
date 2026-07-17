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
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
