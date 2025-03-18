<script setup>
import {useStore} from 'vuex'
import {computed} from 'vue'

const store = useStore();
const loading = computed(()=> store.state.isLoading);
</script>

<template>
<div class="loading" v-if="loading">
  <v-progress-linear
      color="green -accent-4"
      height="10"
      indeterminate
      rounded
  ></v-progress-linear>
</div>
</template>

<style scoped>
.loading{
  width: 100%;
  height: 100%;
  z-index: 1000;
  position: fixed;
  background-color: rgba(127,125,132,0.5);
}
</style>