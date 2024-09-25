<script setup lang="ts">
import Card from '@/components/Card.vue';
import { useSneakersStore } from "@/stores/counter";

const sneakersStore = useSneakersStore();

const onChangeSelect = (event: any) => {
  sneakersStore.filters.sortBy = event.target.value;
  sneakersStore.getSneakers();
}

const onChangeSearchInput = (event: any) => {
  sneakersStore.filters.searchQuery = event.target.value;
  sneakersStore.getSneakers();
}

const onClickAdd = () => {
  console.log('clicked add');
};

const onClickFavourite = (id: number, isFavorite: boolean) => {
  sneakersStore.updateSneakers(id, !isFavorite).then(() => {
    if(!isFavorite) {
      sneakersStore.postFavorite(id);
    } else {
      sneakersStore.deleteFavorite(id);
    }
  });

};

sneakersStore.getSneakers();
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


  <div class="grid grid-cols-4 gap-10">
    <Card
        v-for="item in sneakersStore.sneakers"
        :key="item.id"
        :title="item.title"
        :price="item.price"
        :img="item.imageUrl"
        :isFavorite="item.isFavorite"
        :isAdded="item.isAdded"
        :onClickAdd="onClickAdd"
        :onClickFavourite="() => onClickFavourite(item.id, item.isFavorite)"
    />
  </div>
</template>
