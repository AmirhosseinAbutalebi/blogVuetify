import axios from '@/utilities/axios'
import {useToast} from "vue-toastification";

const toast = useToast();

export const getPopularPosts = () => {
    return axios.get('/api/post/popular').catch(err => {
        toast.error("خطایی در دریافت اطلاعات پیش آمده است")
    });
}