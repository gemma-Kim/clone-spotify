const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@features": path.resolve(__dirname, "src/features"),
      "@types": path.resolve(__dirname, "src/types"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@components": path.resolve(__dirname, "src/components"),
      "@context": path.resolve(__dirname, "src/context"),
    },
  },
};
