/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			keyframes: {
				fade: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				fadeReveal: {
					'0%': { opacity: 1 },
					'50%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
			},
			animation: {
				'fade': 'fade 1s ease-in-out',
				'fade-reveal': 'fadeReveal 1s ease-in-out',
			}
		},
	},
	plugins: [],
}
