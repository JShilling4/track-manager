module.exports = {
	configureWebpack: (config) => {
		config.devtool = "source-map";
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `
                    @import "@/assets/scss/_variables.scss";
                    @import "@/assets/scss/_mixins.scss";
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
