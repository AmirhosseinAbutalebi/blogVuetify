import { createRouter, createWebHistory } from 'vue-router'

import IndexLayout from '@/layouts/admin/IndexLayout.vue'
import MainLayout from '@/layouts/Main/MainLayout.vue'

import HomePage from '@/pages/HomeView.vue'
import singlePost from "@/pages/post/singlePost.vue"

import IndexAdmin from '@/pages/admin/IndexAdmin.vue'

import indexUser from "@/pages/admin/users/IndexUser.vue";
import addUser from "@/pages/admin/users/addUser.vue"
import editUser from "@/pages/admin/users/editUser.vue"

import indexCategory from "@/pages/admin/categories/indexCategory.vue"
import addCategory from "@/pages/admin/categories/addCategory.vue"
import editCategory from "@/pages/admin/categories/editCategory.vue"

import indexPost from "@/pages/admin/posts/indexPost.vue"
import addPost from "@/pages/admin/posts/addPost.vue"
import editPost from "@/pages/admin/posts/editPost.vue"

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomePage,
        name: 'home'
      },
      {
        path: 'post/:slug',
        component: singlePost,
        name: 'singlePost',
      }
    ]
  },
  {
    path: '/admin',
    component: IndexLayout,
    children: [
      {
        path: '',
        name: 'admin',
        component: IndexAdmin
      },
      {
        path: 'users',
        component: indexUser,
        name: 'users',
      },
      {
        path: 'users/add',
        component: addUser,
        name : 'addUser'
      },
      {
        path: 'users/edit/:id',
        component: editUser,
        name : 'editUser'
      },

      {
        path: 'categories',
        component: indexCategory,
        name : 'categories'
      },
      {
        path: 'categories/add',
        component: addCategory,
        name : 'addCategory'
      },
      {
        path: 'categories/edit/:id',
        component: editCategory,
        name : 'editCategory'
      },

      {
        path: 'posts',
        component: indexPost,
        name : 'posts'
      },
      {
        path: 'posts/add',
        component: addPost,
        name : 'addPost'
      },
      {
        path: 'posts/edit/:id',
        component: editPost,
        name : 'editPost'
      },
      ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
