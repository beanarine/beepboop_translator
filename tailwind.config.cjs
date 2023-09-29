const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	safelist: [
		{
			pattern: /bg-.+/
		},
		'mocha',
		'macchiato',
		'frappe',
		'latte'
	],

	plugins: [
		require("@catppuccin/tailwindcss")({
		  // prefix to use, e.g. `text-pink` becomes `text-ctp-pink`.
		  // default is `false`, which means no prefix
		  prefix: false,
		  // which flavour of colours to use by default, in the `:root`
		  defaultFlavour: "mocha",
		}),
	  ],
};

module.exports = config;
