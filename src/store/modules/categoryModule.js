import axios from '../../utilities/axios'

export  default {
    state :{
        categories:[],
    },
    getters : {
    },
    mutations : {
        setCategories(state, categories){
            state.categories = categories;
        },
    },
    actions : {
        getCategories(context){
            context.commit('setLoading', true);
            return axios.get('api/Category').then(res=>{
                context.commit('setCategories', res.data);
            }).catch(err=>{

            }).finally(()=>{
                context.commit('setLoading', false);
            })
        },
        getCategoriesById(context, id){
            context.commit('setLoading', true);
            return axios.get(`api/Category/${id}`).finally(()=>{
                context.commit('setLoading', false);
            })
        },
        addCategory(context, category){
            context.commit('setLoading', true);
            return axios.post(`api/Category`, category).finally(()=>{
                context.commit('setLoading', false);
            })
        },
        deleteCategory(context, categoryId){
            context.commit('setLoading', true);
            return axios.delete(`api/Category/${categoryId}`).finally(()=>{
                context.commit('setLoading', false);
            })
        },
        editCategory(context, category){
            context.commit('setLoading', true);
            return axios.put(`api/Category`, category).finally(()=>{
                context.commit('setLoading', false);
            })
        }
    }
}