import { defineConfig } from "cypress";
import webpack from "@cypress/webpack-preprocessor";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      const options = {
        webpackOptions: {
          resolve: {
            extensions: [".ts", ".js"],
          },
          module: {
            rules: [
              {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: [
                  {
                    loader: "ts-loader",
                  },
                ],
              },
            ],
          },
        },
        watchOptions: {},
      };
      on("file:preprocessor", webpack(options));

      return config;
    },
    baseUrl: "http://localhost:4200",
  },
});