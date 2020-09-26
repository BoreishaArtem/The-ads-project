import * as fb from 'firebase'

class Order {
  constructor(name, phone, adID, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adID = adID
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder({ commit }, { name, phone, adId, ownerID }) {
      const order = new Order(name, phone, adId)
      commit('clearError')

      try {
        await fb.database().ref(`/users/${ownerID}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrder({ commit, getters }) {
      commit('setLoading', true);
      commit('clearError')
      const resultOrders = []
      try {
        const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()
        // console.log(await fb.database().ref('/users/${}'))
        Object.keys(orders).forEach(key => {
          const o = orders[key]
          resultOrders.push(new Order(o.name, o.phone, o.adID, o.done, key))
        })
        commit('loadOrders', resultOrders)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async markOrderDone({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }

  },
  getters: {
    doneOrders(state) {
      return state.orders.filter(o => o.done)
    },
    undoneOrders(state) {
      return state.orders.filter(o => !o.done)
    },
    orders(state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }
}
