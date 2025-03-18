<script setup>
import {useStore} from 'vuex'
import {computed} from 'vue'

const store = useStore();
const loading = computed(()=> store.state.isLoading);
</script>

<template>
  <v-btn type="submit" :disabled="loading" class="mt-3 float-left" color="success">
    <slot>
      ثبت اطلاعات
    </slot>
  </v-btn>
</template>

<style scoped>
</style>