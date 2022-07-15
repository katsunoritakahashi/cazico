// @see https://github.com/nuxt-community/typescript-template/tree/master/template

// eslint-disable-next-line no-unused-vars
import { MutationTree, ActionTree, GetterTree } from 'vuex'

interface RootState {}
export const state = (): RootState => ({})

export const mutations: MutationTree<RootState> = {}

export const getters: GetterTree<RootState, RootState> = {}

export const actions: ActionTree<RootState, RootState> = {}
