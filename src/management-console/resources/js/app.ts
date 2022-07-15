import Vue from 'vue'
import vuex, { Store } from 'vuex'
import App from '@/App.vue'
import router from '@/router'
import { actions, getters, mutations, state } from './store'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import ja from 'vuetify/src/locale/ja'
import VueCompositionApi from '@vue/composition-api'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// atoms
import DirtyBadge from '@/components/atoms/DirtyBadge.vue'

// molecules
import ProgressFetch from '@/components/molecules/ProgressFetch.vue'
import DatePicker from '@/components/molecules/DatePicker.vue'
import TimePicker from '@/components/molecules/TimePicker.vue'
import ValidationError from '@/components/molecules/ValidationError.vue'
import FormPassword from '@/components/molecules/FormPassword.vue'
import SelectPrefecture from '@/components/molecules/SelectPrefecture.vue'
import SelectCity from '@/components/molecules/SelectCity.vue'
import AmountTextField from '@/components/molecules/AmountTextField.vue'
import ButtonActionCreate from '@/components/molecules/ButtonActionCreate.vue'
import SelectOperators from '@/components/molecules/SelectOperators.vue'
import PermissionRoute from '@/components/molecules/PermissionRoute.vue'
import ContextMenu from '@/components/molecules/ContextMenu.vue'

// organisms
import HeaderPage from '@/components/organisms/HeaderPage.vue'
import FilterMenu from '@/components/organisms/FilterMenu.vue'
import ActionsIndex from '@/components/organisms/ActionsIndex.vue'
import AttachmentsMenu from '@/components/organisms/AttachmentsMenu.vue'

// templates
import PageDefault from '@/components/templates/PageDefault.vue'

// features
import TransitionShow from '@/components/features/TransitionShow.vue'
import Hidden from '@/components/features/Hidden.vue'

Vue.config.productionTip = false

// register plugins
Vue.use(vuex)
Vue.use(Vuetify)
Vue.use(VueCompositionApi)

// register global components
Vue.component('DirtyBadge', DirtyBadge)
Vue.component('PageDefault', PageDefault)
Vue.component('HeaderPage', HeaderPage)
Vue.component('Hidden', Hidden)
Vue.component('FilterMenu', FilterMenu)
Vue.component('FormPassword', FormPassword)
Vue.component('ButtonActionCreate', ButtonActionCreate)
Vue.component('ActionsIndex', ActionsIndex)
Vue.component('SelectPrefecture', SelectPrefecture)
Vue.component('SelectCity', SelectCity)
Vue.component('SelectOperators', SelectOperators)
Vue.component('AmountTextField', AmountTextField)
Vue.component('TransitionShow', TransitionShow)
Vue.component('ProgressFetch', ProgressFetch)
Vue.component('DatePicker', DatePicker)
Vue.component('TimePicker', TimePicker)
Vue.component('AttachmentsMenu', AttachmentsMenu)
Vue.component('ValidationError', ValidationError)
Vue.component('PermissionRoute', PermissionRoute)
Vue.component('ContextMenu', ContextMenu)

const vuetify = new Vuetify({
    lang: {
        locales: { ja },
        current: 'ja',
    },
    theme: {
        dark: false,
        // @see https://vuetifyjs.com/ja/styles/colors#javascript-color-pack
        themes: {
            light: {
                primary: '#00958C',
                secondary: '#B0BEC5',
                // accent: colors.indigo.base, // #3F51B5
            },
        },
    },
    icons: {
        iconfont: 'md',
    },
})

const store = new Store({
    state,
    mutations,
    getters,
    actions,
})

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app')
