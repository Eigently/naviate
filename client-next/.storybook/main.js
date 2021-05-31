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
    config.resolve.alias["@emotion/core"] = toPath(
      "node_modules/@emotion/react"
    );
    config.resolve.alias["emotion-theming"] = toPath(
      "node_modules/@emotion/react"
    );

    const svgExtensionRegExp = /\.svg$/;
    config.resolve.extensions.push(".svg");
    config.module.rules.push({
      test: svgExtensionRegExp,
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
};
