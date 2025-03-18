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
const title = ref("");
const slug =ref("");
const metaTag = ref("");
const metaDescription = ref("");



async function editCategory() {
  const result = await form.value.validate()
  if (result.valid === false)
  {
    toast.error("مشکلی در ثبت اطلاعات پیش آمده است");
    return;
  }
  store.dispatch('editCategory',{
    id: router.currentRoute.value.params.id,
    title:title.value,
    slug:slug.value,
    metaTag:metaTag.value,
    metaDescription:metaDescription.value,
  }).then(res=>{
    if(res.status === 200)
    {
      toast.success("دسته بندی با موفقیت ویرایش شد");
      router.push({name:"categories"});
    }
  }).catch(err=>{
    toast.error("مشکلی در ویرایش دسته بندی به وجود آمده است")
  })

}

onMounted(async ()=>{
  const categoryId = router.currentRoute.value.params.id;
  const category = await store.dispatch('getCategoriesById', categoryId);
  if(category.data === undefined || !category.data) {
    router.push({name:"categories"});
    toast.error("دسته بندی یافت نشد")
  }
  title.value = category.data.title;
  slug.value = category.data.slug;
  metaTag.value = category.data.metaTag;
  metaDescription.value = category.data.metaDescription;

})
</script>

<template>
  <div>
    <h1>ویرایش دسته بندی </h1>
    <hr>
    <v-form
        ref="form"
        @submit.prevent="editCategory"
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