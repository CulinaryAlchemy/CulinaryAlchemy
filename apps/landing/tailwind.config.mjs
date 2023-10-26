/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		colors: {
			'back-primary': '#131318',
			'card': '#09090d',
			'border': '#25252d',
			'text-primary': '#ebebef',
			'text-secondary': '#d8d8df',
			'text-tertiary': '#b9b9c6',
			'text-quaternary': '#8f8fa3'
		}
	},
	plugins: [],
}
