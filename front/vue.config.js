const vuetifyOptional = process.env.NODE_ENV === "production"
  ? [new (require('vuetify-loader/lib/plugin'))()]
  : [];

module.exports = {
  configureWebpack: {
    plugins: [
      ...vuetifyOptional,
    ],
  },
  transpileDependencies: vuetifyOptional.length > 0 ? ["vuetify"] : [],
  devServer: {
    //public: '0.0.0.0:8080',
    disableHostCheck: true
  }

}