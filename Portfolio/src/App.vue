<template>
  <div class="flex h-screen w-screen bg-black text-white overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 p-4 m-5 bg-greyspot flex flex-col h-8/10 overflow-y-auto scroll-smooth md:scroll-auto scrollbar-thumb-gray-700 scrollbar-track-gray-900 rounded-lg">
      <div class="flex items-center space-x-2 mb-4">
        <HomeIcon class="w-6 h-6" />
        <span>Inicio</span>
      </div>
      <div class="flex items-center space-x-2 mb-4">
        <SearchIcon class="w-6 h-6" />
        <span>Buscar</span>
      </div>
      <div class="flex items-center space-x-2">
        <LibraryIcon class="w-6 h-6" />
        <span>Tu Biblioteca</span>
      </div>
      <div class="mt-6 " >
        <h2 class="text-lg font-semibold">Projects</h2>
        <ul class="mt-2 space-y-2">
          <li class="cursor-pointer ">            
            <div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <img class="size-12 shrink-0" src="https://placehold.in/300x300@2x.png/dark" alt="ChitChat Logo" />
            <div>
            <div class="text-xl font-medium text-black dark:text-white hover:text-gray-400" >ChitChat</div>
            </div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
    
    <!-- Main Content -->
    <main class="flex-1 p-1  overflow-auto bg-black">
      <div class="max-w-full h-8/10 mx-auto p-4 m-5  px-6 bg-greyspot rounded-lg scrollbar-thumb-custom scrollbar-track-greyspot scrollbar-hover:scrollbar-thumb-[#059669] scrollbar-active:scrollbar-thumb-emerald-500/50 scrollbar overflow-y-scroll  ">
        <div class="flex justify-between">
          <h1 class="text-3xl font-bold">¡Es viernes de lanzamientos!</h1>
          <input class="w-72 p-2 bg-gray-800 border border-gray-700 rounded" placeholder="¿Qué quieres reproducir?" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          <div class="bg-gray-800 p-4 cursor-pointer rounded" v-for="n in 8" :key="n">
            <div class="h-40 bg-gray-700 rounded-lg"></div>
            <p class="mt-2">Mix Diario {{ n }}</p>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Now Playing Bar -->
    <footer class="w-full p-4 bg-black fixed bottom-0 flex items-center justify-between ">
      <div class="flex items-center space-x-4">
        <img src="https://placehold.in/300x200@2x.png/dark" alt="Cover" class="w-12 h-12 rounded" />
        <div>
          <p class="text-sm font-semibold">Misbehave</p>
          <p class="text-xs text-gray-400">Ship Wrek, Disco Lines</p>
        </div>
        <button class="text-gray-400 hover:text-white"><PlusIcon class="w-5 h-5" /></button>
      </div>
      <div class="flex items-center space-x-4 mb-2">
        <button class="text-gray-400 hover:text-white"><ShuffleIcon class="w-5 h-5" /></button>
        <button class="text-gray-400 hover:text-white"><SkipBackIcon class="w-5 h-5" /></button>
        <button class="bg-white text-black p-2 rounded-full"><PlayIcon class="w-6 h-6" /></button>
        <button class="text-gray-400 hover:text-white"><SkipForwardIcon class="w-5 h-5" /></button>
        <button class="text-gray-400 hover:text-white"><RepeatIcon class="w-5 h-5" /></button>
      </div>
      <div class="flex items-center space-x-2 w-1/3">
        <span class="text-xs">0:06</span>
        <input type="range" class="w-full h-1 bg-gray-700 rounded-lg appearance-none" />
        <span class="text-xs">2:54</span>
      </div>
      <div class="flex items-center space-x-4">
        <button class="text-gray-400 hover:text-white"><VolumeIcon class="w-5 h-5" /></button>
        <input type="range" class="w-20 h-1 bg-gray-700 rounded-lg appearance-none" />
        <button class="text-gray-400 hover:text-white"><FullscreenIcon class="w-5 h-5" /></button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, SearchIcon, LibraryIcon, PlayIcon, SkipBackIcon, SkipForwardIcon, ShuffleIcon, RepeatIcon, VolumeIcon, FullscreenIcon, PlusIcon } from 'lucide-vue-next';
</script>

<style>
body {
  font-family: 'Inter', sans-serif;

}
</style>