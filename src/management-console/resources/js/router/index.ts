import Vue from 'vue'
// import VueRouter, { Route } from 'vue-router'
import VueRouter from 'vue-router'
import Home from '@/components/pages/Home.vue'
import Dashboard from '@/components/pages/Dashboard.vue'
import Login from '@/components/pages/Login.vue'
import { RouteConfig } from 'vue-router/types/router'
import { Operator } from '@/api'
// import permission, { noGuard } from '@/router/permissionHelper'
import { noGuard } from '@/router/permissionHelper'

Vue.use(VueRouter)

export type Meta = {
    requiredAuth: boolean
    validPermission: (me: Operator) => boolean
}
interface RouteConfigExtend extends RouteConfig {
    meta: Meta
}

const routes: RouteConfigExtend[] = [
    {
        path: '/',
        name: 'home',
        redirect: { name: 'dashboard' },
        component: Home,
        meta: { requiredAuth: true, validPermission: noGuard },
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: Dashboard,
                meta: { requiredAuth: true, validPermission: noGuard },
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiredAuth: false, validPermission: noGuard },
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router

// function propsKey(key: string, modKey?: string) {
//   return {
//     props: (route: Route) => {
//       if (route.params[key] == null) {
//         return null
//       }

//       const parsedInt = parseInt(route.params[key], 10)
//       return {
//         [modKey || key]: isNaN(parsedInt) ? route.params[key] : parsedInt,
//       }
//     },
//   }
// }

// function propsKeys(keys: Array<string>) {
//   return {
//     props: (route: Route) => {
//       let obj: { [k: string]: any } = {}
//       keys.forEach((key) => {
//         if (route.params[key] == null) {
//           return null
//         }

//         const parsedInt = parseInt(route.params[key], 10)
//         obj[key] = isNaN(parsedInt) ? route.params[key] : parsedInt
//       })
//       return obj
//     },
//   }
// }
