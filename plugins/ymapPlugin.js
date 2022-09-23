import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: 'cb344b91-4bf0-4691-911d-e4f6485820bf',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1',
  debug: false
} // настройки плагина

Vue.use(YmapPlugin, settings)
