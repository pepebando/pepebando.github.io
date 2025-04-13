<template>
  <div class="flex h-screen w-screen bg-black text-white ">
    <main class="w-full">
      <div class="w-full flex ">
        <!-- Sidebar Desktop -->

        <div class="w-2/10 p-4 m-2 bg-black flex flex-col rounded-lg hidden lg:block">
          <Motion
        :initial="{  x: -140, opacity: 0 }"
        :in-view="{  x: 0,opacity: 1 }"
        :in-view-options="{
          once: true,
        }"
        :transition="{
          delay: 0.2,
        }">
          <router-link 
          to="/" 
          class="flex items-center space-x-2 mb-4 cursor-pointer transition-opacity hover:opacity-75"
          >
          <HomeIcon class="w-6 h-6" />
          <span>Home</span>
        </router-link>
        
        <router-link 
        to="/projects" 
        class="flex items-center space-x-2 mb-4 cursor-pointer transition-opacity hover:opacity-75"
        >
        <LibraryIcon class="w-6 h-6" />
        <span>All my projects</span>
      </router-link>
      
      <router-link 
      to="/contact" 
      class="flex items-center space-x-2 cursor-pointer transition-opacity hover:opacity-75"
      >
      <MailIcon class="w-6 h-6" />
      <span>Contact</span>
    </router-link>
  </Motion>
  
    <div class="mt-7">
      <Motion
        :initial="{  x: -140, opacity: 0 }"
        :in-view="{  x: 0,opacity: 1 }"
        :in-view-options="{
          once: true,
        }"
        :transition="{
          delay: 0.3,
        }">
      <h2 class="text-lg font-semibold">Categories</h2>
      </Motion>
      <ul class="mt-1 space-y-1">
        <router-link 
        v-for="(category,index) in categories" 
        :key="index" 
        :to="{ path: '/projects', query: { category: category.tags } }"
        class="transition-opacity hover:opacity-75"
        >
        <Motion
        :initial="{  x: -140, opacity: 0 }"
        :in-view="{  x: 0,opacity: 1 }"
        :in-view-options="{
          once: true,
        }"
        :transition="{
          delay: 0.4 + index * 0.1,
        }">
        <SidebarCard :title="category.title" :image="category.image" />
      </Motion>
    </router-link>
  </ul>
</div>
</div>
<!--Menu Mobile-->
<div class="relative lg:hidden">
  <!-- Botón de menú -->
  
  <button @click="isOpen = !isOpen" class="fixed top-10 right-10 z-50 p-2 bg-black text-white rounded-lg shadow-lg">
    <MenuIcon class="w-20 h-20" />
  </button>
  <transition name="slide-fade">
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-80 z-40 flex flex-col p-6">
      <h1 class="text-5xl text-center mt-25 m-10">Main menu</h1>
      <button @click="isOpen = false" class="absolute top-10 left-10 text-white text-7xl">&times;</button>
      <masonry-wall :items="menuMobile" :column-width='650' :min-columns="3" :gap="10" >
        <template v-slot="{ item }">
          <router-link @click="isOpen = false" :to="item.link" class="block p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition">
            <div class="flex items-center space-x-3">
              <span class="text-3xl text-center mx-auto">{{ item.title }}</span>
            </div>
          </router-link>
        </template>
      </masonry-wall>
      <h1 class="text-5xl text-center mt-25 m-10">Categories</h1>
      <masonry-wall :items="categories" :min-columns="2"  :gap="10">
        <template v-slot="{ item }">
          <router-link @click="isOpen = false" :key=item.index :to="{path: '/projects',query:{category: item.tags}}" class="block p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition">
            <div class="flex items-center space-x-3">
              <span class="text-3xl text-center mx-auto">{{ item.title }}</span>
            </div>
          </router-link>
        </template>
      </masonry-wall>
    </div>
  </transition>
</div>
<!-- Contenido Principal con animación -->
<div class="flex-1">
  <Transition name="fade">
    <router-view />
  </Transition>
</div>
</div>
</main>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SidebarCard from '/src/components/SidebarCard.vue';
import MasonryWall from "@yeger/vue-masonry-wall";
import { HomeIcon,LibraryIcon,MailIcon,MenuIcon } from "lucide-vue-next";
import { Motion } from '@oku-ui/motion';

const isOpen = ref(false);
const menuMobile = ref([
{ title: "Home", link: "/", image: "https://img.icons8.com/ffffff/ios-filled/50/home.png" },
{ title: "Projects", link: "/projects", image: "https://img.icons8.com/ffffff/ios-filled/50/project.png" },
{ title: "Contact", link: "/contact", image: "https://img.icons8.com/ffffff/ios-filled/50/email.png" },
]);
const categories = ref([
{ title: 'All',tags:''},
{ title: 'Unreal Engine',tags:'ue'},
{ title: 'Web', tags:"web"},
{ title: 'Videogames',tags:'games' },
{ title: 'Mixed Reality',tags:'mr' },
{ title: 'Virtual Reality',tags:'vr' },
{ title: 'Archviz',tags:'archviz'},
{ title: 'Python',tags:'py' },
{ title: 'APPs',tags:'app' }
]);




</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
html{
  background-color: black;
}
/* Transición de Fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
/* Animaciones para el menú */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
