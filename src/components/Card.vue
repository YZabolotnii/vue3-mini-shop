<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  img: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavourite: Function, // Додаємо новий props для обробки кліка на улюблені
});

const clickFavourite = () => {
  props.onClickFavourite(); // Викликаємо передану функцію для зміни улюблених
};
</script>

<template>
  <div
      class="relative flex flex-col w-full border border-slate-100 rounded-xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
  >
    <div @click="clickFavourite" class="absolute top-8 left-8">
      <img v-if="!isFavorite" src="/like-1.svg" alt="Favorite"/>
      <img v-else src="/like-2.svg" alt="Favorite"/>
    </div>
    <img :src="img" class="w-full" alt="Sneaker"/>
    <p>{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col gap-2">
        <span class="text-slate-200">Ціна:</span>
        <span class="font-bold">{{ price }} грн</span>
      </div>
      <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus"/>
    </div>
  </div>
</template>
