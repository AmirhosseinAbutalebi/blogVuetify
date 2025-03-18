import axios from 'axios'

axios.defaults.baseURL = 'now we dont have access to this url'

export default {
    get : axios.get,
    post : axios.post,
    put : axios.put,
    delete : axios.delete
}