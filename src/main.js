import './styles/index.scss'

import { createApp } from 'vue'
import { Quasar } from 'quasar'

import App from './App.vue'
import quasarConfig from './quasar.config'

const app = createApp(App)

app.use(Quasar, quasarConfig)

app.mount('#app')
