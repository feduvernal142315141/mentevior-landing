// Los documentos legales viven en Markdown, no en .astro: las fechas y la
// versión salen del frontmatter y alimentan a la vez el <head>, el sello de
// la página y el sitemap — nunca pueden divergir del cuerpo del documento.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const legal = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    // Título corto para nav, footer y cross-links entre documentos
    shortTitle: z.string(),
    description: z.string(),
    // Encabezado tal cual lo trae el documento firmado
    effective: z.string(),
    updated: z.string(),
    // ISO, para <meta> y sitemap lastmod
    updatedISO: z.string(),
    version: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { legal };
