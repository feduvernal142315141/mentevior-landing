// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://mentevior.com",
  integrations: [
    mdx(),
    sitemap({
      // Los legales pesan menos que la landing en el índice, pero se indexan:
      // "mentevior baa" es una búsqueda real de un comprador evaluándonos.
      serialize: (item) => ({
        ...item,
        priority: item.url.includes("/legal/") ? 0.5 : 1.0,
        changefreq: item.url.includes("/legal/") ? "yearly" : "monthly",
      }),
    }),
  ],
  // El BAA se incorpora por URL dentro de contratos firmados, así que su ruta
  // canónica no se mueve nunca. Los alias cortos son para compartir a mano.
  redirects: {
    "/privacy": "/legal/privacy",
    "/terms": "/legal/terms",
    "/baa": "/legal/baa",
    "/legal": "/trust",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
