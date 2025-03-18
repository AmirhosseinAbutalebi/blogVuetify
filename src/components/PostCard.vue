<script setup>
  import {useRouter} from "vue-router";

  const router = useRouter();
  const props = defineProps({
      post: {
        type: Object,
      },
  })

</script>

<template>
  <div>
    <v-card
        class="mx-auto"
        max-width="450"
        hover
        outlined
    >
      <v-img
          height="200px"
          :src="`https://blog-api.codeyad-project.ir/images/posts/${props.post.imageName}`"
          cover
      ></v-img>

      <v-card-title style="text-align: center">
        {{ props.post.title }}
      </v-card-title>

      <v-card-subtitle>
        دسته بندی :
        {{ props.post.category.title }}
      </v-card-subtitle>

      <v-card-actions class="show-btn-left">
        <v-btn
            color="medium-emphasis"
            variant="outlined"
            @click="router.push({name : 'singlePost', params: {slug: props.post.slug}})"
        >
          دیدن مطلب
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.show-btn-left {
  float: left;
}
</style>