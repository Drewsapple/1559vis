/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: ['pastel']
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
