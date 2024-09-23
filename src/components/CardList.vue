<script setup lang="ts">
import Card from '@/components/Card.vue';
import { useSneakersStore } from "@/stores/counter";

const sneakersStore = useSneakersStore();

sneakersStore.getSneakers().then(() => {
  console.log(sneakersStore.sneakers);
});

const onClickAdd = () => {
  console.log('clicked add');
};

// Функція для оновлення улюблених
const onClickFavourite = (id: number, isFavorite: boolean) => {
  sneakersStore.updateSneakers(id, !isFavorite); // Передаємо нове значення isFavorite
};
</script>

<template>
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
