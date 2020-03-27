import firebase from "firebase";

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo (state, info){
            state.info = info
        },
        clearInfo (state){
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}){
            try{
                const uid = await dispatch('getUid')
                const infoFromBase = (await firebase.database().ref(`/user/${uid}/info`).once('value')).val()
                commit('setInfo', infoFromBase)
            }catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateInfo({dispatch, commit, getters}, toUpdate){
            try{
                const uid = await dispatch('getUid')
                const updateData = {...getters.info, ...toUpdate}
                await firebase.database().ref(`/user/${uid}/info`).update(updateData)
                commit('setInfo', updateData)
            }catch (e) {
                commit('setError', e)
                throw e
            }
        }
    },
    getters: {
        info: s => s.info,
    }
}