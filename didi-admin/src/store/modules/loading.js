const loading = {
  state: {
    loading:false
  },

  mutations: {
    SHOW_LOADING: (state) => {
      state.loading = true
    },
    HIDE_LOADING: (state) => {
      state.loading = false
    }
  },

  actions: {
    // 网点信息
    showloader({ commit }) {
      commit('SHOW_LOADING')
    },
    hideloader({ commit }) {
      commit('HIDE_LOADING')
    }
  }
}

export default loading
