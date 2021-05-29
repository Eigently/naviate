const path = require("path");

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    "@storybook/addon-a11y",
    "@storybook/addon-toolbars",
    "@storybook/preset-create-react-app",
    "storybook-addon-performance/register",
    "storybook-dark-mode",
  ],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: (config, { configType }) => {
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

    // add a dedicated loader for WASM
    config.module.rules.push({
      test: wasmExtensionRegExp,
      include: path.resolve(__dirname, "src"),
      use: [{ loader: require.resolve("wasm-loader"), options: {} }],
    });

    config.resolve.alias["@emotion/core"] = toPath(
      "node_modules/@emotion/react"
    );
    config.resolve.alias["emotion-theming"] = toPath(
      "node_modules/@emotion/react"
    );

    return config;
  },
};
