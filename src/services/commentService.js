import axios from '@/utilities/axios'

export const getComments = (postId)=>{
    return axios.get(`/api/Comment`, postId)
}
export const addComment = (comment)=>{
    return axios.post('/api/comment', comment)
}
export const deleteComment = (id)=>{
    return axios.delete(`/api/comment/${id}`)
}