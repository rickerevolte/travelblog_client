import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const app = createApp(App)

app.use(router)
app.use(VueGoogleMaps, {
    load: {
        key: GOOGLE_MAPS_API_KEY,
    },
})

app.mount('#app');

const burgerButton = document.getElementById("burgerButton");
const sideMenu = document.getElementById("sideMenu");

burgerButton.addEventListener("click", function (event) {
    event.preventDefault();
    sideMenu.classList.toggle("sideMenuVisible");
});
