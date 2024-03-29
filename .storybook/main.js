module.exports = {
  stories: ["../src/stories/**/*.stories.(ts|tsx|js|jsx|mdx)"],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
    '@storybook/addon-knobs/register',
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true
      }
    }
  ],
};
