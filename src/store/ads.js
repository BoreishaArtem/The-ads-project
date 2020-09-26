import * as fb from 'firebase'

class Ad {
  constructor(title, description, ownerID, promo = false, imageSrc = '', id = null) {
    this.title = title
    this.description = description
    this.ownerID = ownerID
    this.promo = promo
    this.imageSrc = imageSrc
    this.id = id
  }
}
export default {
  state: {
    ads: []
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
    loadAds(state, payload) {
      state.ads = payload
    },
    updateAd(state, { title, description, id }) {
      const ad = state.ads.find(a => {
        return a.id === id
      })
      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      const image = payload.image
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.promo,
          ''
        )
        const ad = await fb.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        const fileData = await fb.storage().ref(`ads/${ad.key}${imageExt}`).put(image)
        const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()

        await fb.database().ref('ads').child(ad.key).update({
          imageSrc
        })
        console.log(imageSrc);
        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds({ commit }) {
      commit('clearError')
      commit('setLoading', false)
      const resultAD = [];
      try {
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()
        if (ads) {
          Object.keys(ads).forEach(key => {
            const ad = ads[key]
            resultAD.push(
              new Ad(ad.title, ad.description, ad.ownerID, ad.promo, ad.imageSrc, key)
            )
          });
        }
        commit('loadAds', resultAD)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateAd({ commit }, { title, description, id }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await fb.database().ref('ads').child(id).update({
          title, description
        })
        commit('updateAd', {
          title, description, id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads(state) {
      return state.ads
    },
    promoAds(state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds(state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerID === getters.user.id
      })
    },
    adById(state) {
      return function (adId) {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
