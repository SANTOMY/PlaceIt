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
    public: 'https://place-it-front.herokuapp.com',
    //host: '0.0.0.0',
    //port: process.env.PORT　|| "8080",
    //disableHostCheck: true
  },
}