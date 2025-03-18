<template>
  <v-app>
    <v-main>
      <c-loading></c-loading>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import CLoading from "@/components/CLoading.vue";

export default {
  name: 'App',
  components: {CLoading},

  data: () => ({
    //
  }),
}
</script>
<style>
.v-toolbar__content, .v-application{
  direction: rtl !important;
}
</style>
