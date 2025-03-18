<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>دسته بندی</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn variant="text" icon="mdi-magnify"></v-btn>
        <router-link :to="{name : 'admin'}">
          <v-btn variant="text" icon="mdi-account" class="ml-5"></v-btn>
        </router-link>
      </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          bottom
          location="right"
          theme="dark"
      >
        <v-list>
          <router-link to="" v-for="item in categories.filter(f => f.parentId === 0)" :key="item.id">
            <v-list-item :title="item.title" v-ripple></v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 100vh;">
        <div class="px-5 py-5">
          <router-view></router-view>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {useStore} from "vuex";

const drawer = ref(false);
const group = ref(null);
const store = useStore();
const categories = computed(()=> store.state.categoryModule.categories)

watch(group, () => {
  drawer.value = false;
});

onMounted(()=>{
  store.dispatch('getCategories');
})
</script>
<style scoped>
a{
  color: white;
  text-decoration: none;
}
</style>