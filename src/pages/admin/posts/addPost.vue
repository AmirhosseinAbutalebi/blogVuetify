<script setup>

import {computed, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import CSubmit from "@/components/CSubmit.vue";

const router = useRouter();
const toast = useToast();
const store = useStore();
const form = ref(null);
const postData = reactive({
  userId: 0,
  categoryId: 0,
  subCategoryId: 0,
  title : '',
  slug : '',
  description : '',
  isSpecial: false,
})
const users = computed(()=> store.state.userModule.usersFilter);
const categories = computed(()=> store.state.categoryModule.categories);

const subCategories = computed(() => {
  return categories.value.filter(f => f.parentId === postData.categoryId);
});

const files = ref([]);

async function addPost() {
  const result = await form.value.validate();
  if (result.valid === false) {
    toast.error("اطلاعات نامعتبر است")
    return;
  }
  if (postData.userId <= 0  || postData.subCategoryId <= 0 || files.value.length === 0) {
    toast.error("اطلاعات نامعتبر است")
    return;
  }

  const formData = new FormData();
  formData.append("UserId", postData.userId.toString());
  formData.append("CategoryId", postData.categoryId.toString());
  formData.append("SubCategoryId", postData.subCategoryId.toString());
  formData.append("Title", postData.title);
  formData.append("Slug", postData.slug);
  formData.append("ImageFile", files.value);
  formData.append("Description", postData.description);
  formData.append("IsSpecial", postData.isSpecial.toString());

  store.dispatch("addPost", formData).then(res => {
    if (res.status === 200) {
      router.push({name : 'posts'});
      toast.success("عملیات با موفقیت انجام شد")
    }
  });
}

onMounted(() => {
  store.dispatch('getUsers', { pageId: 1, take: 100 });
  store.dispatch('getCategories')
});


</script>

<template>
  <div>
    <h1>افزودن پست جدید</h1>
    <hr>
    <v-form
        ref="form"
        @submit.prevent="addPost"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
              v-model="postData.title"
              :rules="[v => !!v || 'عنوان را وارد کنید' ]"
              label="عنوان"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
              v-model="postData.slug"
              :rules="[v => !!v || 'slug را وارد کنید']"
              label="slug"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="pt-0">
          <v-textarea
              v-model="postData.description"
              clear-icon="mdi-close-circle"
              label="توضیحات"
              clearable
              required
              solo
              :rules="[v => !!v || 'توضیحات را وارد کنید']"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="pt-0">
          <label>انتخاب نویسنده</label>
          <select v-model="postData.userId" class="custom-select">
            <option v-for="item in users.users" :key="item.userId" :value="item.userId">{{item.fullName}}</option>
          </select>
        </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <label>انتخاب دسته بندی</label>
          <select v-model="postData.categoryId" class="custom-select">
            <option v-for="item in categories.filter(f => f.parentId === 0)" :key="item.id" :value="item.id" >{{item.title}}</option>
          </select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="pt-0">
          <label>انتخاب زیردسته بندی</label>
          <select v-model="postData.subCategoryId" class="custom-select">
            <option v-for="item in subCategories" :key="item.id" :value="item.id">{{ item.title }}</option>
          </select>
        </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <v-switch
              v-model="postData.isSpecial"
              color="primary"
              label="آیا این پست ویژه می باشد"
              hide-details
          ></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="pt-0">
          <v-file-input
              v-model="files"
              label="انتخاب عکس"
              show-size
              accept="image/png, image/jpeg, image/bmp"
              required
              :rules="[v => !!v || 'عکس را انتخاب نمایید']"
          ></v-file-input>
        </v-col>
      </v-row>

      <c-submit></c-submit>
    </v-form>
  </div>
</template>

<style scoped>

</style>