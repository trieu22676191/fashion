import { type SchemaTypeDefinition } from 'sanity'
import { collectionSchema } from './collection'
import { productSchema } from './product'
import categorySchema from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [collectionSchema, productSchema, categorySchema],
}
