import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  { files: ['**/*.{js,mjs,cjs,vue}'],
    ignores: [
      'node_modules/',
      'dist/',
      'src/assets/', // 添加你想忽略的路径
    ],
   },

  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential']
]
