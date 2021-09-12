module.exports = {
	configureWebpack: (config) => {
		config.devtool = "source-map";
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `
                    @import "@/design/scss/mixins.scss";
                `,
				sourceMap: true,
			},
		},
		sourceMap: true,
	},

	devServer: {
		host: "localhost",
	},
};
