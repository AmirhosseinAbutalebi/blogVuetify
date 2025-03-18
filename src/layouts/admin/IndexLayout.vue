<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>منو</v-toolbar-title>

        <v-spacer></v-spacer>
        <router-link :to="{name : 'home'}">
          <v-btn variant="text" icon="mdi-logout" class="ml-5"></v-btn>
        </router-link>
      </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          bottom
          location="right"
          theme="dark"
      >
        <v-list>
          <router-link :to="{name: 'users'}">
            <v-list-item prepend-icon="mdi-account-box" title="مدیریت کاربران" v-ripple></v-list-item>
          </router-link>
          <router-link :to="{name: 'categories'}">
            <v-list-item prepend-icon="mdi-book-multiple" title="دسته بندی ها" v-ripple></v-list-item>
          </router-link>
          <router-link :to="{name: 'posts'}">
            <v-list-item prepend-icon="mdi-note-multiple" title="مدیریت پست ها" v-ripple></v-list-item>
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

<script>
export default {
  data: () => ({
    drawer: true,
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>
<style scoped>
a{
  color: white;
  text-decoration: none;
}
</style>