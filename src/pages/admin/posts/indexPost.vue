<script setup>

import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {computed, onMounted, reactive} from "vue";
import Swal from "sweetalert2";

const store = useStore();
const toast = useToast();
const router = useRouter();
const post = computed(()=> store.state.postModule.posts);
const filterPost = reactive({
  pageId : 1,
  take : 10,
  title : ''
})

function filter(){
  store.dispatch('getPostByFilter', filterPost);
}

const deletePost = (id) => {
  Swal.fire({
    title: "آیا مایل به حذف پست هستید",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله مایلم",
    cancelButtonText:"نه حذف نکن"
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch('deletePost', id).then(res=>{
        if(res.status===200){
          toast.success("حذف با موفقیت انجام شد")
          store.dispatch('getPostByFilter', filterPost);
        }
      }).catch(err=>{
        toast.error("مشکلی در حذف پیش آمده است")
      });
    }
  });
}

onMounted(()=>{
  store.dispatch('getPostByFilter', filterPost);
})
</script>

<template>
  <div>
    <h1>مدیریت پست ها</h1>
    <hr>
    <v-btn @click="router.push({name:'addPost'})" color="success" prepend-icon="mdi-plus">افزودن پست جدید</v-btn>

    <v-form @submit.prevent="filter" class="elevation-4 py-5 px-5 mt-5" >
      <v-row>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field
              v-model="filterPost.title"
              label="عنوان"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field
              v-model="filterPost.take"
              label="تعداد نمایش در صفحه"
              type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="info" type="submit">فیلتر</v-btn>
    </v-form>
    
    <v-table class="elevation-4 mt-5">
      <thead>
      <tr>
        <th>عکس</th>
        <th>عنوان</th>
        <th>slug</th>
        <th>نویسنده</th>
        <th>عملیات</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in post.posts" :key="item.id">
        <td>
          <img :src="`https://blog-api.codeyad-project.ir/images/posts/${item.imageName}`" style="width: 100px">
        </td>
        <td v-text="item.title"></td>
        <td v-text="item.slug"></td>
        <td v-text="item.userFullName"></td>
        <td>
          <v-btn @click="router.push({ name:'editPost', params:{ id:item.postId}})" color="info" prepend-icon="mdi-pencil" class="ml-3">ویرایش</v-btn>
          <v-btn @click="deletePost(item.postId)" color="error" prepend-icon="mdi-close" >حذف</v-btn>
        </td>
      </tr>
      <tr v-if="post.entityCount===0">
        <td colspan="5">پستی برای نمایش وجود ندارد</td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped>

</style>