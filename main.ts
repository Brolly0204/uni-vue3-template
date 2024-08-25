import App from './App.vue'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/interceptors/uni-adaptor.ts'

export function createApp() {
    const app = createSSRApp(App)
    const pinia = Pinia.createPinia()
    pinia.use(piniaPluginPersistedstate)
    app.use(pinia)
    return {
        app,
        Pinia,
    }
}
// #endif
// #ifdef MP
// #endif
