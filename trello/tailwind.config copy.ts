import { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			transitionProperty: {
				"spacing": "height, width",
			},
			colors: {
				turquoise: "#00ced1",
			},
			spacing: {
				"15": "3.75rem",
				"61": "15.25rem",
				"75": "18.75rem",
				"112.5": "28.125rem",
				"137.5": "34.375rem",
				"152.5": "38.125rem",
				"175": "43.75rem",
				"185": "46.25rem",
			},
			boxShadow: {
				"custom": "0 4px 8px rgba(0, 0, 0, 0.1)"
			}
		},
	},
	plugins: [],
};

export default config;
