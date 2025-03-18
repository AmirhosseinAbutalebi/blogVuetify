<script setup>

import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {computed, onMounted} from "vue";
import Swal from 'sweetalert2'

const store = useStore();
const toast = useToast();
const router = useRouter();
const categories = computed(()=> store.state.categoryModule.categories);

function deleteCategory(id){
  Swal.fire({
    title: "آیا مایل به حذف دسته بندی هستید",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله مایلم",
    cancelButtonText:"نه حذف نکن"
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch('deleteCategory', id).then(res=>{
        if(res.status===200){
          toast.success("حذف با موفقیت انجام شد")
          store.dispatch('getCategories')
        }
      }).catch(err=>{
        toast.error("مشکلی در حذف دسته بندی پیش آمده است")
      });
    }
  });
}

onMounted(()=>{
  store.dispatch('getCategories')
})
</script>

<template>
  <div>
    <h1>مدیریت دسته بندی ها</h1>
    <hr>
    <v-btn @click="router.push({name:'addCategory'})" color="success" prepend-icon="mdi-plus">افزودن دسته بندی</v-btn>
    <v-table class="elevation-4 mt-5">
      <thead>
      <tr>
      <th>#</th>
      <th>عنوان</th>
      <th>slug</th>
      <th>عملیات</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in categories" :key="item.id">
        <td v-text="item.id"></td>
        <td v-text="item.title"></td>
        <td v-text="item.slug"></td>
        <td>
          <v-btn v-if="item.parentId === 0" @click="router.push({name:'addCategory', query:{parentId:item.id}})" color="primary" prepend-icon="mdi-pencil" class="ml-3">افزودن زیردسته بندی</v-btn>
          <v-btn @click="router.push({ name:'editCategory', params:{ id:item.id}})" color="info" prepend-icon="mdi-pencil" class="ml-3">ویرایش</v-btn>
          <v-btn @click="deleteCategory(item.id)" color="error" prepend-icon="mdi-close" >حذف</v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped>

</style>