module.exports = {
  // 指定环境
  env: {
    browser: true,
    es2021: true
  },

  // 指定解析器选项
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },

  // 使用的插件
  plugins: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    'prettier'
  ],

  // 继承的配置
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    'prettier'
  ],

  // 自定义规则
  rules: {
    'no-console': 'warn', // 警告使用 console
    'no-unused-vars': 'error', // 错误提示未使用的变量
    'vue/no-v-html': 'off', // 关闭 Vue 的 no-v-html 规则
    '@typescript-eslint/no-explicit-any': 'off' // 关闭 TypeScript 的 no-explicit-any 规则
  }
}
