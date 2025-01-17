import Vue from 'vue';
import Vuex from 'vuex';

const getters = {
  clientHeight: state => state.clientHeight,
  clientWidth: state => state.clientWidth,
  receivedMessage: state => state.receivedMessage,
  postMessage: state => state.postMessage,
}

const state = {
  clientHeight: 675,
  clientWidth: 375,
  receivedMessage: '',
  postMessage: ''
}

const mutations = {
  SET_CLIENTHEIGHT: (state, clientHeight) => {
    state.clientHeight = clientHeight
  },
  SET_CLIENTWIDTH: (state, clientWidth) => {
    state.clientWidth = clientWidth
  },
  SETReceivedMessage: (state, receivedMessage) => {
    state.receivedMessage = receivedMessage
  },
  SETPostMessage: (state, postMessage) => {
    state.postMessage = postMessage
  },
}

const actions = {
 //设备高度
  setClientHeight({ commit }, data) {
    commit('SET_CLIENTHEIGHT', data)
    return data
  },
  //设备宽度
  setClientWidth({ commit }, data) {
    return new Promise((resolve) => {
      commit('SET_CLIENTWIDTH', data)
      resolve(data)
    })
  },
  setReceivedMessage({ commit }, data) {
    return new Promise((resolve) => {
      commit('SETReceivedMessage', data)
      resolve(data)
    })
  },
  setPostMessage({ commit }, data) {
    return new Promise((resolve) => {
      commit('SETPostMessage', data)
      resolve(data)
    })
  },
}

Vue.use(Vuex)
const store = new Vuex.Store({
  getters,
  state,
  mutations,
  actions
})

export default store
