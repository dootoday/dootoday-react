module.exports = {
  stories: ["../src/stories/**/*.stories.(ts|tsx|js|jsx|mdx)"],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true
      }
    }
  ],
};
