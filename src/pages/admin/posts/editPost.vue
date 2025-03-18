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
  categoryId: 0,
  subCategoryId: 0,
  title : '',
  slug : '',
  description : '',
  isSpecial: false,
})

const categories = computed(()=> store.state.categoryModule.categories);
const subCategories = computed(() => {
  return categories.value.filter(f => f.parentId === postData.categoryId);
});
const postId = router.currentRoute.value.params.id;
const files = ref([]);
const imageName = ref("");

async function editPost() {
  const result = await form.value.validate();
  if (result.valid === false) {
    toast.error("اطلاعات نامعتبر است")
    return;
  }

  const formData = new FormData();
  formData.append("PostId", postId);
  formData.append("CategoryId", postData.categoryId.toString());
  formData.append("SubCategoryId", postData.subCategoryId.toString());
  formData.append("Title", postData.title);
  formData.append("Slug", postData.slug);
  if(files.value.length > 0){}
    formData.append("ImageFile", files.value);
  formData.append("Description", postData.description);
  formData.append("IsSpecial", postData.isSpecial.toString());

  store.dispatch("editPost", formData).then(res => {
    if (res.status === 200) {
      router.push({name : 'posts'});
      toast.success("عملیات با موفقیت انجام شد")
    }
  });
}

onMounted(() => {
  store.dispatch('getCategories')
  store.dispatch('getPostById', postId).then(res => {
    if(res.status === 200) {
      postData.categoryId = res.data.categoryId;
      postData.subCategoryId = res.data.subCategoryId;
      postData.title = res.data.title;
      postData.slug = res.data.slug;
      postData.description = res.data.description;
      postData.isSpecial = res.data.isSpecial;
      imageName.value = res.data.imageName;
    }
  })
});

</script>

<template>
  <div>
    <h1>ویرایش پست</h1>
    <hr>
    <v-form
        ref="form"
        @submit.prevent="editPost"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
              v-model="postData.title"
              label="عنوان"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
              v-model="postData.slug"
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
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="pt-0">
          <label>انتخاب دسته بندی</label>
          <select v-model="postData.categoryId" class="custom-select">
            <option v-for="item in categories.filter(f => f.parentId === 0)" :key="item.id" :value="item.id" >{{item.title}}</option>
          </select>
        </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <label>انتخاب زیردسته بندی</label>
          <select v-model="postData.subCategoryId" class="custom-select">
            <option v-for="item in subCategories" :key="item.id" :value="item.id">{{ item.title }}</option>
          </select>
        </v-col>
      </v-row>
      <v-row>
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
        <v-col cols="12" md="6" class="pt-0">
          <v-file-input
              v-model="files"
              label="انتخاب عکس"
              show-size
              accept="image/png, image/jpeg, image/bmp"
          ></v-file-input>
        </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <img :src="`https://blog-api.codeyad-project.ir/images/posts/${imageName}`" style="width: 400px">

        </v-col>
      </v-row>

      <c-submit></c-submit>
    </v-form>
  </div>
</template>

<style scoped>

</style>