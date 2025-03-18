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
const title = ref("");
const slug = ref("");
const metaTag = ref("");
const metaDescription = ref("");

async function addCategory() {
  const result = await form.value.validate();
  if(result.valid === false)
  {
    toast.error("اطلاعات نامعتبر است")
    return
  }
  let parentId = router.currentRoute.value.query.parentId;
  if(parentId === undefined || !parentId)
    parentId= 0;

  store.dispatch('addCategory',{
    title:title.value,
    slug:slug.value,
    parentId,
    metaDescription:metaDescription.value,
    metaTag:metaTag.value,
  }).then(res=>{
    if(res.status === 200)
    {
      toast.success("دسته بندی با موفقیت ثبت شد");
      router.push({name:"categories"});
    }
  }).catch(err=>{
    toast.error("مشکلی در ثبت دسته بندی به وجود آمده است")
  })
}
</script>

<template>
  <div>
    <h1>افزودن دسته بندی جدید</h1>
    <hr>
    <v-form
        ref="form"
        @submit.prevent="addCategory"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
              v-model="title"
              :rules="[v => !!v || 'عنوان را وارد کنید' ]"
              label="عنوان"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
              v-model="slug"
              :rules="[v => !!v || 'slug را وارد کنید']"
              label="slug"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="pt-0">
          <v-text-field
              v-model="metaTag"
              :rules="[v => !!v || 'metaTag را وارد کنید' ]"
              label="metaTag"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <v-text-field
              v-model="metaDescription"
              :rules="[v => !!v || 'metaDescription را وارد کنید']"
              label="metaDescription"
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