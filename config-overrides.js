const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#e91e63",
      "@font-family": `"Montserrat Regular", sans-serif`,
      "@btn-font-size-lg": "14px",
      "@input-placeholder-color": "#8798AD",
      "@input-color": "#2E384D",
      "@input-icon-color": "#8798AD",
      "@link-color": "#0070E0",

      "@form-error-input-bg": "#fff5f8",
      "@input-bg": "#fff5f8",
      "@input-border-color": "#fff5f8",
      "@label-color": "#69707F",
      "@form-item-label-font-size": "1em",

      "@select-border-color": "#fff5f8",
      "@select-background": "#fff5f8",
    },
  })
);
