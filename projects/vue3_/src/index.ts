import { createApp, ref, InjectionKey, Ref } from 'vue'
// import App from './App.vue'
import App from './todos/todoApp.vue'
import enhanceApp from './enhanceApp'
export { key } from './enhanceApp'

const app = createApp(App)
enhanceApp(app)

app.mount('#app')
