const plugin = require("tailwindcss/plugin");
module.exports = {
	content: ["components/**/*.vue", "pages/**/*.vue"],
	corePlugins: {
		container: false,
	},
	theme: {
		screens: {
			sm: "375px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			xxl: "1440px",
			xxxl: "1920px",
		},


		colors: {
			'um-white': '#FFFFFF',
			'um-black': '#000000',
			'um-blue-light': '#283A97',
			'um-blue': '#1B264F',
			'um-red': '#DC2626',
			'um-light': '#FFF0EA',
			'um-palepink': '#F5C1BC',
			'um-green': '#16A34A',
			'um-blue-info': '#2563EB',
		},
		spacing: {
			0: "0rem",
			1: "0.25rem",
			2: "0.5rem",
			3: "0.75rem",
			4: "1rem",
			5: "1.25rem",
			6: "1.5rem",
			7: "2rem",
			8: "3rem",
			9: "3.75rem",
			10: "5rem",
			11: "6rem",
			12: "7.5rem",
		},
		borderRadius: {
			none: "0",
			xs: "0.3125rem",
			sm: "0.938rem",
			DEFAULT: "1.25rem",
			md: "1.875rem",
			lg: "2.5rem",
			full: "9999px",
		},

		extend: {
			backgroundImage: {
				'hero-pattern': "url('/assets/image/Blue_Corner.png')",
			},

			strokeWidth: {
				1.5: "1.5px",
			},
			transitionTimingFunction: {
				"umbraco-ease": "cubic-bezier(0.785, 0.135, 0.15, 0.86);",
			},
			aspectRatio: {
				"4/3": "4 / 3",
				"3/4": "3 / 4",
				"1/1": "1 / 1",
			},
		},
	},
	plugins: [
		plugin(function ({ addComponents, theme }) {
			addComponents({
				".container-row": {
					display: "grid",
					gridTemplateColumns: theme("gridTemplateColumns.4"),
					columnGap: ".5rem",
					"@media (min-width: 1024px)": {
						gridTemplateColumns: theme("gridTemplateColumns.12"),
						columnGap: "1rem",
					},
				},
				".container": {
					maxWidth: "100%",
					paddingLeft: "16px",
					paddingRight: "16px",
					marginLeft: "auto",
					marginRight: "auto",
					"@screen xxl": {
						maxWidth: "1400px",
						paddingRight: "54px",
						paddingLeft: "54px",
					},
					"@screen xxxl": {
						maxWidth: "1720px",
					},
				},
			});
		}),
	],
	safelist: [],
};
