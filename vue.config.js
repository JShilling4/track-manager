const isProduction = process.env.NODE_ENV === "production";

module.exports = {
	configureWebpack: {
		devtool: !isProduction ? "source-map" : undefined
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `
					@import "@/design/scss/mixins.scss";
				`,
			},
		},
		sourceMap: true,
	},

	devServer: {
		host: "localhost",
	},
};
