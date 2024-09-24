<script setup lang="ts">
import Header from '@/components/Header.vue';
import CardList from '@/components/CardList.vue';
</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-2">
    <Header />
    <div class="p-10">
      <CardList/>
    </div>
  </div>
</template>
