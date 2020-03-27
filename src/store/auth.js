import firebase from "firebase";

export default {
    actions: {
        async login(
            {commit},
            {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            }
            catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async register({dispatch, commit},{email, password, name, bill}){
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/user/${uid}/info`).set({
                    bill,
                    name
                })
            }
            catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async getUid(){
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async logout({commit}) {
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    }
}