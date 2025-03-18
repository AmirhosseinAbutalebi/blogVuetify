<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const router = useRouter();
const store = useStore();
const pageId = ref(1);
const userFilter = computed(()=>store.state.userModule.usersFilter);

watch(pageId, () => {
  store.dispatch('getUsers',{pageId:pageId.value, take:10});
})

onMounted(()=> {
  store.dispatch('getUsers',{pageId:pageId.value, take:10});
})
</script>

<template>
  <div>
    <h1>مدیریت کاربران</h1>
    <hr>
    <v-btn @click="router.push({name:'addUser'})" color="success" prepend-icon="mdi-plus">افزودن کاربر جدید</v-btn>

    <br>

    <v-table class="elevation-4 mt-5">
      <thead>
      <tr>
        <th>نام کاربری</th>
        <th>نام و نام خانوادگی</th>
        <th>نفش کاربر</th>
        <th>عملیات</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item ,index) in userFilter.users" :key="index">
        <td v-text="item.userName"></td>
        <td v-text="item.fullName"></td>
        <td>
          <span v-if="item.role===0">ادمین</span>
          <span v-if="item.role===1">کاربر</span>
        </td>
        <td>
          <v-btn @click="router.push(`/admin/users/edit/${item.userId}`)" prepend-icon="mdi-pencil" color="info">ویرایش</v-btn>
        </td>
      </tr>
      <tr v-if="userFilter.entityCount==0">
        <td colspan="4">کاربری برای نمایش وجود ندارد</td>
      </tr>
      </tbody>
    </v-table>
    <v-pagination
        v-model="pageId"
        :length="userFilter.pageCount"
        :total-visible="5"
        rounded="circle"
        next-icon="mdi-chevron-left"
        prev-icon="mdi-chevron-right"
    ></v-pagination>
  </div>
</template>

<style scoped>

</style>

