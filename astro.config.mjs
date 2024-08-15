import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

import alpinejs from "@astrojs/alpinejs";

import icon from "astro-icon";

const PORT = parseInt(import.meta.env.VITE_PORT) || 3000;
const SITE_URL = 'https://lullaby6.github.io'
const BASE_URL = 'fondo-de-cine'

// https://astro.build/config
export default defineConfig({
  server: {
    port: PORT
  },
  site: SITE_URL,
  base: BASE_URL,
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