<template >
  <div v-if="project" class="p-6 text-white bg-black ">
    <div class="relative bg-gradient-to-b from-purple-800 to-black p-6 rounded-lg   ">
      <router-link to="/projects" class=" rounded-lg transition ">
        <ArrowLeft class="size-20 mb-10 lg:size-15"  />
      </router-link>
      <div class="flex items-center">
        <img :src="project.image" class="rounded-lg w-48 h-48 object-cover shadow-lg " />
        <div class="ml-6">
          <p class="text-2xl lg:text-sm text-gray-300">{{route.query.subtitle}}</p>
          <h1 class="text-5xl lg:text-5xl font-bold w-9/10 lg:w-7/10">{{route.query.title}}</h1>
        </div>
      </div>
    </div>
    
    <div class="p-6 min-h-screen text-white text-3xl lg:text-xl">
      <!-- Navegación de Tabs -->
      <div class="flex border-b border-gray-700">
        <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = tab"
        class="px-4 py-2 transition-all duration-300"
        :class="activeTab === tab ? 'border-b-2 border-green-500 text-white' : 'text-gray-400 hover:text-white'"
        >
        {{ tab }}
      </button>
    </div>
    
    <!-- Contenido de Tabs -->
    <div class="mt-4">
      <div v-if="activeTab === 'Description'" class="text-3xl lg:text-xl w-8/10">
        <p v-for="(line, index) in project.description" :key="index" v-html="line"></p>
      </div>
      
      <div v-if="activeTab === 'Images'" class="text-2xl lg:text-xl">
        <div class="p-6 bg-black min-h-screen text-white">
          <!-- Masonry Wall -->
          <masonry-wall v-if="images.length" :items="images" :min-columns="2" :max-columns="3" :gap="16">
            <template #default="{ item, index }">
              <div class="relative group overflow-hidden rounded-lg cursor-pointer" @click="openLightbox(index)">

                <img v-if="item.type === 'imagen'" :src="item.src" :alt="item.alt"
                class="w-full h-[200px] object-cover transition-transform duration-300 transform group-hover:scale-110" />

              <!-- Video con icono de Play -->
              <div v-if="item.type === 'video'" class="relative">
                <video :src="item.src" controls class="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-110">
                </video>
                
                <!-- Icono de Play con Lucide -->
                <div class="absolute inset-0 flex items-center justify-center  bg-opacity-50 group-hover:bg-opacity-70 transition-opacity">
                  <PlayCircle class="w-12 h-12 text-white opacity-90 group-hover:opacity-50 transition-opacity" />
                </div>
              </div>
              
            </div>
          </template>
        </masonry-wall>
        
        <!-- Lightbox (Pantalla Completa) -->
        <div v-if="lightboxActive" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button @click="closeLightbox" class="absolute top-10 right-10 text-white text-7xl lg:text-5xl size-20 lg:size-15 rounded-lg bg-purple-800 z-99">&times;</button>
          
          <button @click="prevImage" class="absolute left-6 text-white cursor-pointer text-5xl lg:text-5xl size-15 lg:size-15 rounded-lg bg-purple-800 opacity-50">&larr;</button>
          
          <!-- Imagen en pantalla completa -->
          <img v-if="currentImage.type === 'imagen'" :src="currentImage.src" :alt="currentImage.alt"
          class="max-w-full max-h-screen object-contain shadow-lg">
          
          <!-- Video en pantalla completa -->
          <video v-if="currentImage.type === 'video'" :src="currentImage.src" id="fullscreen-video" 
          controls autoplay class="max-w-full max-h-screen object-contain shadow-lg">
        </video>
        
        <button @click="nextImage" class="absolute right-6 text-white text-4xl cursor-pointer text-5xl lg:text-5xl size-15 lg:size-15 rounded-lg bg-purple-800 opacity-50">&rarr;</button>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import { useRoute } from "vue-router";
import { ArrowLeft,PlayIcon, PlayCircle,CheckIcon } from "lucide-vue-next";
import MasonryWall from "@yeger/vue-masonry-wall";


const route = useRoute();
const project = ref(null);
const lightboxActive = ref(false);
const currentIndex = ref(0);
const images = computed(() => project.value?.ImagenesIndividualProjectArray || []);
const currentImage = computed(() => images.value[currentIndex.value] || null);

const openLightbox = (index) => {
  currentIndex.value = index;
  lightboxActive.value = true;
  
  nextTick(() => {
    const videoElement = document.getElementById("fullscreen-video");
    
  });
};

const prevImage = () => {
  if (!images.value.length) return;
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

const nextImage = () => {
  if (!images.value.length) return;
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const closeLightbox = () => {
  lightboxActive.value = false;
  
  // Salir del modo pantalla completa si está activo
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};

onMounted(async () => {
  try {
    const response = await fetch("/dataIndividualProject.json");
    if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
    const jsonData = await response.json();
    project.value = jsonData.find((p) => p.id == route.params.id);
    
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
  }
});

// Lista de Tabs
const tabs = ["Description", "Images"];
const activeTab = ref(tabs[0]);
</script>
