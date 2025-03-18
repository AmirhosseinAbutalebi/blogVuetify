<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import Comment from "@/pages/post/comment.vue";

const store = useStore();
const router = useRouter();
const post = ref({});
const slug = ref('');

onMounted(()=>{
  slug.value = router.currentRoute.value.params.slug;
  store.dispatch("getPostBySlug", slug.value).then(res=>{
    if(res.status === 200){
      post.value = res.data;
    }
    else router.back()
  }).catch(err=>{
    router.back()
  });
})
</script>

<template>
  <div class="elevation-8 pr-0 pl-0 pt-0 pb-5 v-container" v-if="post.postId">
    <img class="img" :src="`https://blog-api.codeyad-project.ir/images/posts/${post.imageName}`">
    <div class="pr-4 pl-4">
      <h1>{{ post.title }}</h1>
      <p class="post-content">{{post.description}}</p>

      <hr/>

      <comment :post-id="post.postId"></comment>
    </div>
  </div>
</template>

<style scoped>
.post-content{
  white-space: pre-wrap
}
.img{
  width: 100%;
  max-height: 600px;
}
.v-container{
  width: 50% !important;

}
</style>