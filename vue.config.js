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
				`
      }
    },
    sourceMap: true
  },

  devServer: {
    host: "localhost"
  },

  chainWebpack: (config) => {
    if (isProduction) {
      config.optimization.minimizer("terser").tap((args) => {
        const { terserOptions } = args[0];
				terserOptions["keep_classnames"] = true;
				terserOptions["keep_fnames"] = true;
        return args;
      });
    }
  }
};
