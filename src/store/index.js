import { createStore } from 'vuex'
import userModule from './modules/userModule'
import categoryModule from './modules/categoryModule'
import postModule from "@/store/modules/postModule";

export default createStore({
  state: {
    isLoading: false,
  },
  getters: {
  },
  mutations: {
    setLoading(state, loading) {
      state.isLoading = loading;
    }
  },
  actions: {
  },
  modules: {
    userModule,
    categoryModule,
    postModule,
  }
})
