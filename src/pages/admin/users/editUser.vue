<script setup>

import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import CSubmit from "@/components/CSubmit.vue";

const router = useRouter();
const toast = useToast();
const store = useStore();
const form = ref(null);
const fullName = ref("");
const role =ref("");


function editUser() {
  form.value.validate().then(res=>{
    if(res.valid === true)
    {
      if(role.value === false)
        role.value = 1;
      store.dispatch('editUser',{
        userId: router.currentRoute.value.params.id,
        fullName:fullName.value,
        role:role.value
      }).then(res=>{
        if(res.status === 200)
        {
          toast.success("کاربر با موفقیت ویرایش شد");
          router.push("/admin/users");
        }
      }).catch(err=>{
        toast.error("مشکلی در ویرایش کاربر به وجود آمده است")
      })
    }
  });
}

onMounted(async ()=>{
  const userId = router.currentRoute.value.params.id;
  await store.dispatch('getUserById', userId);
  const user = store.state.userModule.user;
  if(user.userName === undefined) {
    router.push("/admin/users");
    toast.error("کاربری یافت نشد")
  }
  fullName.value = user.fullName;
  role.value = user.role;
})
</script>

<template>
  <div>
    <h1>ویرایش کاربر </h1>
    <hr>
    <v-form
        ref="form"
        @submit.prevent="editUser"
    >
      <v-row>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field
              v-model="fullName"
              :rules="[v => !!v || 'نام و نام خانوادگی را وارد کنید' ]"
              label="نام و نام خانوادگی"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pb-0">
          <v-switch
              v-model="role"
              color="primary"
              label="ادمین"
              :value="0"
              hide-details
          ></v-switch>
        </v-col>

      </v-row>

      <c-submit></c-submit>
    </v-form>
  </div>
</template>

<style scoped>

</style>