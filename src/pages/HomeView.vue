<template>
  <div>
    <h2 style="text-align: center">
      مقالات پربازدید
    </h2>
    <hr>
    <v-row>
      <v-col cols="12" md="4" v-for="item in posts" :key="item.postId">
        <post-card :post="item"></post-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import {getPopularPosts} from '@/services/postService'
import {onMounted, ref} from "vue";
import PostCard from "@/components/PostCard.vue";

const posts = ref([]);
onMounted(()=>{
  getPopularPosts().then(res => {
    if(res.status === 200){
      posts.value = res.data;
    }
  })
})
</script>
