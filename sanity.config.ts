import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// スキーマタイプ
const schemaTypes = [
  {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (rule: any) => rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (rule: any) => rule.required(),
      },
      {
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime',
        initialValue: () => new Date().toISOString(),
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        rows: 4,
      },
      {
        name: 'mainImage',
        title: 'Main image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'body',
        title: 'Body',
        type: 'array',
        of: [
          {
            title: 'Block',
            type: 'block',
            styles: [
              { title: 'Normal', value: 'normal' },
              { title: 'H1', value: 'h1' },
              { title: 'H2', value: 'h2' },
              { title: 'H3', value: 'h3' },
              { title: 'Quote', value: 'blockquote' },
            ],
            lists: [{ title: 'Bullet', value: 'bullet' }],
            marks: {
              decorators: [
                { title: 'Strong', value: 'strong' },
                { title: 'Emphasis', value: 'em' },
              ],
              annotations: [
                {
                  title: 'URL',
                  name: 'link',
                  type: 'object',
                  fields: [
                    {
                      title: 'URL',
                      name: 'href',
                      type: 'url',
                    },
                  ],
                },
              ],
            },
          },
          {
            type: 'image',
            options: { hotspot: true },
          },
        ],
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: { type: 'author' },
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'category' } }],
      },
    ],
  },
  {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (rule: any) => rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'array',
        of: [
          {
            title: 'Block',
            type: 'block',
            styles: [{ title: 'Normal', value: 'normal' }],
            lists: [],
          },
        ],
      },
    ],
  },
  {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (rule: any) => rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
    ],
  },
]

export default defineConfig({
  name: 'default',
  title: 'HAYABLOG Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio', // 重要: Studioのベースパス

  plugins: [
    structureTool({
      title: 'Content',
      name: 'content',
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Posts')
              .child(S.documentTypeList('post').title('Posts')),
            S.listItem()
              .title('Authors')
              .child(S.documentTypeList('author').title('Authors')),
            S.listItem()
              .title('Categories')
              .child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
    visionTool({
      title: 'GROQ',
      name: 'vision',
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      navbar: () => null, // ナビゲーションバーを非表示
    },
  },
})