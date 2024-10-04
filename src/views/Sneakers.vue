<script setup lang="ts">
import CardList from "@/components/CardList.vue";
import {useSneakersStore} from "@/stores/sneaker.ts";

const sneakersStore = useSneakersStore();
sneakersStore.getSneakers();

const onChangeSelect = (event: any) => {
  sneakersStore.filters.sortBy = event.target.value;
  sneakersStore.getSneakers();
}

const onChangeSearchInput = (event: any) => {
  sneakersStore.filters.searchQuery = event.target.value;
  sneakersStore.getSneakers();
}



</script>
<template>
  <div class="flex justify-between items-center mb-10">
    <h1 class="text-3xl font-bold">Все кроссовки</h1>
    <div class="flex items-center gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none">
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <input
            type="text"
            @input="onChangeSearchInput"
            class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
            placeholder="Пошук..."
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img alt="Search" src="/search.svg" />
        </div>
      </div>
    </div>
  </div>

  <CardList filterItems="all"/>

</template>
