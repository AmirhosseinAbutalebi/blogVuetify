<script setup>

import {ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import CSubmit from "@/components/CSubmit.vue";

const router = useRouter();
const toast = useToast();
const store = useStore();
const form = ref(null);
const fullName = ref("");
const userName = ref("");
const password = ref("");
const passwordRules = [
    v => !!v || 'کلمه عبور را وارد کنید',
    v => v.length > 5 || 'کلمه عبور باید بیشتر از ۵ کاراکتر باشد',
]

function addUser() {
  form.value.validate().then(res=>{
    if(res.valid === true)
    {
      store.dispatch('addUser',{
        fullName:fullName.value,
        userName:userName.value,
        password:password.value,
      }).then(res=>{
        if(res.status === 200)
        {
          toast.success("کاربر با موفقیت ثبت شد");
          router.push("/admin/users");
        }
      }).catch(err=>{
        toast.error("مشکلی در ثبت کاربر به وجود آمده است")
      })
    }
  });
}
</script>

<template>
  <div>
    <h1>افزودن کاربر جدید</h1>
    <hr>
  <v-form
  ref="form"
  @submit.prevent="addUser"
  >
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-text-field
            v-model="fullName"
            :rules="[v => !!v || 'نام و نام خانوادگی را وارد کنید' ]"
            label="نام و نام خانوادگی"
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" class="pt-0">
        <v-text-field
            v-model="userName"
            :rules="[v => !!v || 'نام کاربری را وارد کنید']"
            label="نام کاربری"
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="pt-0">
        <v-text-field
            v-model="password"
            label="کلمه عبور"
            :rules="passwordRules"
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <c-submit></c-submit>
  </v-form>
    </div>
</template>

<style scoped>

</style>