/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  /**
   * eslint 默认行为是忽略以 `.` 开头的文件 / 文件夹. 但是我们需要对 `.vitepress` 目录下的文件进行检查.
   * @see https://stackoverflow.com/questions/57947585/eslint-warning-file-ignored-by-default-use-a-negated-ignore-pattern
   */
  ignorePatterns: ["!.vitepress"],

  parserOptions: {
    ecmaVersion: "latest"
  }
};
