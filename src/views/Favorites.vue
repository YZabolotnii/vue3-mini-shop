<script setup lang="ts">
import CardList from "@/components/CardList.vue";

</script>
<template>
  <div class="flex justify-between items-center mb-10">
    <h1 class="text-3xl font-bold">Закладки</h1>
  </div>
  <CardList filterItems="favorites"/>
</template>