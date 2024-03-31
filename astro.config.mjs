import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

import alpinejs from "@astrojs/alpinejs";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
      tailwind(), 
      alpinejs(), 
      icon({
      include: {
        iconamoon: ["arrow-down-2-light"],
        ic: ["outline-email"],
        fe: ["instagram"],
        tabler: ["external-link"],
      },
      }
    )
  ]
});