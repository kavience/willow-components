module.exports = {
  presets: ["@babel/preset-typescript", "@babel/preset-react", ["@babel/preset-env", {
    "targets": {
      "browsers": ["last 2 versions"],
    },
    "modules": process.env.IS_TEST ? "commonjs" : false,
  }]],
  plugins: ["@babel/plugin-transform-runtime", ["@babel/plugin-proposal-private-methods", { "loose": !process.env.IS_TEST }]]
}