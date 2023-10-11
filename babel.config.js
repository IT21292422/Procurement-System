// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: [
//       [
//         "module:react-native-dotenv",
//         {
//           envName: "APP_ENV",
//           moduleName: "@env",
//           path: ".env.local",
//           blocklist: null,
//           allowlist: null,
//           blacklist: null, // DEPRECATED
//           whitelist: null, // DEPRECATED
//           safe: false,
//           allowUndefined: true,
//           verbose: false,
//         },
//       ],
//       "react-native-reanimated/plugin",
//     ],
//   };
// };
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env.local",
          blocklist: null,
          allowlist: null,
          blacklist: null, // DEPRECATED
          whitelist: null, // DEPRECATED
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      "react-native-reanimated/plugin", // Add this line
      "react-native-paper/babel",
    ],
  };
};
