<template>
  <div class="w-full p-4 mb-2 px-6 bg-gradient-to-b from-bgtopgradient to-black rounded-lg ">
    
    <!-- Título de Destacados -->
    <div >
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
        <h1 class="text-5xl lg:text-3xl font-bold">¡Highlights!</h1>  
      </Motion>
    </div>
    <!-- Proyectos Favoritos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <router-link 
      v-for="IndividualFavProject in IndividualFavoritesProjects" 
      :key="IndividualFavProject.id" 
      :to="{
        path: `/project/${IndividualFavProject.id}`,
        query: { title: IndividualFavProject.title, subtitle: IndividualFavProject.subtitle }
      }"
      > 
      <Motion
      :initial="{  y: 140, opacity: 0, scale: 0.85  }"
      :in-view="{  y: 0,opacity: 1, }"
      :in-view-options="{
        once: true,
      }"
      :transition="{
        delay: 0.1 + IndividualFavProject.id * 0.2,
      }">
      <ProjectFavoriteCard 
      :title="IndividualFavProject.title" 
      :image="IndividualFavProject.image" 
      :description="IndividualFavProject.description" 
      :color="IndividualFavProject.color" 
      />
    </Motion>
  </router-link>
</div>
    </div>
<!-- Título de Proyectos -->
<h1 class="text-5xl lg:text-3xl mt-15 font-bold mt-7">Projects - {{categorytoprint}}</h1>

<!-- Lista de Proyectos Filtrados -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
  <router-link 
  v-for="IndividualProject in filteredProjects" 
  :key="IndividualProject.id" 
  :to="{
    path: `/project/${IndividualProject.id}`,
    query: { title: IndividualProject.title, subtitle: IndividualProject.subtitle }
  }"
  >
  <Motion
  :initial="{  y: 140, opacity: 0, scale: 0.85  }"
  :animate="{  y: 0,opacity: 1 }"
  :transition="{
    delay: 0.6 
  }">
  <ProjectCard 
  :title="IndividualProject.title" 
  :image="IndividualProject.image" 
  :description="IndividualProject.description" 
  :color="IndividualProject.color" 
  />
</Motion>
</router-link>
</div>

<div class="h-50 block lg:hidden"></div>

</div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useRoute } from "vue-router";
import ProjectCard from '/src/components/ProjectCard.vue';
import ProjectFavoriteCard from '/src/components/ProjectFavoriteCard.vue';
import { Motion } from '@oku-ui/motion';

const route = useRoute();
const selectedCategory = ref<string | null>(null);
const IndividualProjects = ref([]);
const IndividualFavoritesProjects = ref([]);
const IDsFavoritos = ["1", "2", "3"];
const categorytoprint = computed(() => {
  switch (route.query.category) {
    case "ue":
    return "Unreal Engine";
    case "web":
    return "Web Development";
    case "games":
    return "Videogames";
    case "ar":
    return "Augmented Reality";
    case "mr":
    return "Mixed Reality";
    case "vr":
    return "Virtual Reality";
    case "archviz":
    return "Archviz";
    case "py":
    return "Python";
    case "app":
    return "Apps";
    case "other":
    return "Others";
    default:
    return "All Categories"; // Valor por defecto si no coincide ninguna categoría
  }
});

const filteredProjects = computed(() => {
  if (!selectedCategory.value) return IndividualProjects.value;
  
  return IndividualProjects.value.filter(project => {
    if (!Array.isArray(project.tags)) {
      return false;
    }
    const match = project.tags.some(tag => tag.trim().toLowerCase() === selectedCategory.value);
    return match;
  });
});


watchEffect(() => {
  let category = route.query.category;
  
  
  if (Array.isArray(category)) {
    category = category[0];
  }
  
  selectedCategory.value = category ? category.trim().toLowerCase() : null;
});


onMounted(async () => {
  try {
    const response = await fetch('dataProjectCard.json'); 
    
    if (!response.ok) throw new Error("Error al obtener los datos");
    
    let projects = await response.json();
    
    // ✅ Convertir `tags` a un array real
    projects.forEach(project => {
      if (typeof project.tags === "string") {
        
        try {
          project.tags = JSON.parse(project.tags);
        } catch (e) {
          
          project.tags = project.tags
          .replace(/\[|\]/g, "")  
          .split(",") 
          .map(tag => tag.trim().toLowerCase());
        }
      }
    });
    
    IndividualProjects.value = projects;
    IndividualFavoritesProjects.value = projects.filter(project => IDsFavoritos.includes(String(project.id)));
    
    
  } catch (error) {
    console.error(" Error al cargar los datos:", error);
  }
});
</script>


<style>
/* Animación Fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
