const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const wasmExtensionRegExp = /\.wasm$/;
    config.resolve.extensions.push(".wasm");
    config.module.rules.forEach((rule) => {
      (rule.oneOf || []).forEach((oneOf) => {
        if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
          // make file-loader ignore WASM files
          oneOf.exclude.push(wasmExtensionRegExp);
        }
      });
    });
    config.module.rules.push({
      test: wasmExtensionRegExp,
      include: path.resolve(__dirname, "src"),
      use: [{ loader: require.resolve("wasm-loader"), options: {} }],
    });

    const svgExtensionRegExp = /\.svg$/;
    config.resolve.extensions.push(".svg");
    config.module.rules.push({
      test: svgExtensionRegExp,
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
};
