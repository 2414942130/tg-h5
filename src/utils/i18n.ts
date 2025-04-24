/*
 * @Description:
 * @Author: huiLong.lan
 * @Date: 2025-04-24 15:26:26
 * @LastEditors: huiLong.lan
 * @LastEditTime: 2025-04-24 15:29:31
 * @FilePath: \tg-h5\src\utils\i18n.ts
 */

import { createI18n } from 'vue-i18n'

function loadLocaleMessages() {
  const locales = import.meta.glob('./locales/*.json', { eager: true })
  const messages: Record<any, any> = {}
  for (const [key, value] of Object.entries(locales)) {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      const data: any = value
      messages[locale] = data.default
    }
  }
  return messages
}

const messages = loadLocaleMessages()

export function getLanguage() {
  const chooseLanguage = localStorage.getItem('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = navigator.language
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1 && !['zh-CN', 'zh-TW'].includes(language)) {
      return locale
    }
  }
  return 'en'
}

const i18n = createI18n<false>({
  legacy: false, // you must set `false`, to use Composition API
  locale: getLanguage() || import.meta.env.VITE_I18N_LOCALE,
  globalInjection: true, // 全域注入，让你在 <template> 可以使用 $t
  messages,
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE // 设置备用语言
})

export default i18n
