export const state = () => ({
  host: 'https://marketing.milktawa.id/smartpeople/',
  // host: 'http://127.0.0.1/',
  // host: 'http://192.168.1.100/',
  registerModal: false,
  loginState: 0,
  superAdmin: 0,
  admin: 0,
  loginModal: false,
  modalPersetujuan: false,
  userData: { nama: 'Mr. X', alamatL: 'Suro karo boyo', ktp: 'nodata', id: '0' },
  maintenance: false,
  tanggal: [{ checkpoint: '2020-04-04', checkpoint2: '2020-04-05' }],
  panel: false,
  getJson: [],
  loading:false
})

export const mutations = {
  SET_REGISTER_MODAL_ACTIVE (state, payload) {
    state.registerModal = payload
  },
  SET_AGREED_MODAL_ACTIVE (state, payload) {
    state.modalPersetujuan = payload
  },
  SET_LOGIN (state, payload) {
    state.loginState = payload
  },
  SET_ADMIN (state, payload) {
    state.admin = payload
  },
  SET_SUPER_ADMIN (state, payload) {
    state.superAdmin = payload
  },
  SET_LOGIN_MODAL_ACTIVE (state, payload) {
    state.loginModal = payload
  },
  SET_USER_DATA (state, payload) {
    state.userData = payload
  },
  SET_TANGGAL (state, payload) {
    state.tanggal = payload
  },
  SET_PANEL (state, payload) {
    state.panel = payload
  },
  SET_ALAMAT (state, payload) {
    state.getJson = payload
  },
  SET_LOADING (state, payload) {
    state.loading = payload
  }
  
}

export const actions = {
  /*  nuxtServerInit ({ commit }, context) {
    commit('SET_USER_DATA', context.app.$cookies.get('data'))
    commit('SET_ADMIN', context.app.$cookies.get('hola'))
    commit('SET_SUPER_ADMIN', context.app.$cookies.get('super'))
  } */
}
