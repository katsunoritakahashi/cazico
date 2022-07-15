<template>
    <v-navigation-drawer
        :mini-variant="props.drawer"
        :width="300"
        clipped
        app
        permanent
    >
        <v-divider />
        <v-list dense nav>
            <div
                class="d-flex"
                v-for="menu in menus"
                :key="menu.navTitle || menu.title"
            >
                <v-list-item
                    :exact="menu.exact"
                    link
                    :to="{ name: menu.pathName }"
                    class="mt-1"
                    style="max-width: 250px"
                    @click="() => linkTo(menu.pathName)"
                >
                    <v-tooltip right :disabled="!props.drawer">
                        <template v-slot:activator="{ on }">
                            <v-list-item-icon v-on="on">
                                <v-icon :color="menu.color">{{
                                    menu.icon
                                }}</v-icon>
                            </v-list-item-icon>
                        </template>
                        <span>{{ menu.navTitle || menu.title }}</span>
                    </v-tooltip>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ menu.navTitle || menu.title }}
                            <MenuBadge :content="newCount[menu.pathName]" />
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <ContextMenu
                    v-if="menu.contextMenus"
                    :close-on-content-click="true"
                >
                    <template #button="{ on }">
                        <v-btn text icon color="grey lighten-1" v-on="on">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </template>
                    <template #default="{ close }">
                        <v-list-item
                            v-for="contextMenu in menu.contextMenus"
                            :key="contextMenu.pathName"
                            link
                            dense
                            :to="{ name: contextMenu.pathName }"
                            class="my-1"
                        >
                            <v-list-item-avatar v-if="contextMenu.icon">
                                <v-icon>{{ contextMenu.icon }}</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    contextMenu.title
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </ContextMenu>
            </div>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import {
    injectAuth,
    injectNewInquiry,
} from '@/components/providers/InjectHelper'
import getAuthorizedMenu from '@/router/menus'
import MenuBadge from '@/components/atoms/MenuBadge.vue'

type Props = {
    drawer: boolean
}

export default defineComponent({
    components: {
        MenuBadge,
    },
    props: {
        drawer: {
            type: Boolean,
        },
    },
    setup(props: Props) {
        const auth = injectAuth()
        const { newCount, resetCount } = injectNewInquiry()

        const linkTo = (pathName: string) => {
            resetCount(pathName)
        }

        return {
            props,
            menus: getAuthorizedMenu(auth.me),
            newCount,
            linkTo,
        }
    },
})
</script>
