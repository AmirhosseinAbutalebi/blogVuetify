import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";


loadFonts()


createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
    .use(Toast,{
        rtl:true,
        position: POSITION.TOP_CENTER
    })
  .mount('#app')
