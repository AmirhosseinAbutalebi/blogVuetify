import axios from '../../utilities/axios'

export default {
    state:{
        posts:{},
    },
    getters:{
    },
    mutations:{
        setPosts(state, posts){
            state.posts = posts;
        }
    },
    actions:{
        getPostById(context, id){
            context.commit('setLoading', true);
            return axios.get(`/api/Post/${id}`).finally(()=>{
                context.commit('setLoading', false);
            })
        },
        getPostBySlug(context, slug){
            context.commit('setLoading', true);
            return axios.get(`/api/Post/getBySlug/${slug}`).finally(()=>{
                context.commit('setLoading', false);
            })
        },
        getPostByFilter(context, {pageId,take,title}){
            context.commit('setLoading', true);
            return axios.get(`/api/Post`,{params:{pageId, take, title}}).then(res=>{
                if (res.status === 200) {
                    context.commit('setPosts', res.data);
                }
            }).catch(err=>{

            }).finally(()=>{
                context.commit('setLoading', false);
            })
        },
        addPost(context, post){
            context.commit('setLoading', true);
            return axios.post(`/api/post`,post).finally(()=>{
                context.commit('setLoading', false);
            })
        },
        editPost(context, post){
            context.commit('setLoading', true);
            return axios.put(`/api/Post`,post).finally(()=>{
                context.commit('setLoading', false);
            })
        },
        deletePost(context, id){
            context.commit('setLoading', true);
            return axios.delete(`/api/Post/${id}`).finally(()=>{
                context.commit('setLoading', false);
            })
        }
    }
}