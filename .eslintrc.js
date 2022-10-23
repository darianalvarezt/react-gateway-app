module.exports = {
  env: {
    browser: true,
    node: true,
    jquery: true,
    jest: true,
    es2021: true,
  },
  extends: ["airbnb", "prettier"],
  overrides: [],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
  plugins: ["react"],
  rules: {
    'arrow-body-style': [2, 'as-needed'],
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    'no-console': 0,
    'react/prop-types': 0,
    'no-underscore-dangle': 0,
    'func-names': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
  },
};
