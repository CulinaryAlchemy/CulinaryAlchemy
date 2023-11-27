/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		fontFamily: {
			inter: 'Inter'
		},
		colors: {
			'card': '#131318',
			'back-primary': '#131318',
			'border': '#25252d',
			'text-primary': '#ebebef',
			'text-secondary': '#d8d8df',
			'text-tertiary': '#b9b9c6',
			'text-quaternary': '#8f8fa3'
		},
		backgroundImage: {
			'right-gradient': 'linear-gradient(90deg, rgba(19,19,24,1) 0%, rgba(19,19,24, 0) 100%)'
		},
		dropShadow: {
			'title': '0px 0px 0.8px white'
		}
	},
	plugins: [],
}
