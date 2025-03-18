import axios from '../../utilities/axios'

export default {
    state: {
        usersFilter: {},
        user:{}
    },
    getters: {
    },
    mutations: {
        setUsers(state, users) {
            state.usersFilter = users;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        getUsers(context, {pageId, take}){
            context.commit('setLoading', true);
            axios.get(`api/User?pageId=${pageId}&take=${take}`).then(res=>{
                context.commit('setUsers',res.data);
            }).catch(err=>{

            }).finally(()=>{
                context.commit('setLoading', false);
            })
        },
        getUserById(context, id){
            context.commit('setLoading', true);
            return  axios.get(`api/User/${id}`).then(res=>{
                context.commit('setUser',res.data);
            }).catch(err=>{

            }).finally(()=>{
                context.commit('setLoading', false);
            })
        },
        addUser({commit}, user){
            commit("setLoading",true);
            return axios.post("api/User", user).finally(()=>{
                commit("setLoading",false);
            })
        },
        editUser({commit}, user){
            commit("setLoading",true);
            return axios.put('api/User', user).finally(()=>{
                commit("setLoading",false);
            })
        }
    }
}