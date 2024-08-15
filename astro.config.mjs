import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

import alpinejs from "@astrojs/alpinejs";

import icon from "astro-icon";

const PORT = parseInt(import.meta.env.VITE_PORT) || 3000;

// https://astro.build/config
export default defineConfig({
  server: {
    port: PORT
  },
  integrations: [
      tailwind(),
      alpinejs(),
      icon({
      include: {
        iconamoon: ["arrow-down-2-light"],
        ic: ["outline-email"],
        fe: ["instagram"],
        tabler: ["external-link"],
        "material-symbols": ["menu", "close"],
      },
      }
    )
  ]
});