<script setup lang="ts">
import Card from '@/components/Card.vue';
import { useSneakersStore } from "@/stores/sneaker.ts";
import Header from "@/components/Header.vue";
import Drawer from "@/components/Drawer.vue";
import {computed, provide, ref, watchEffect} from "vue";

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

const onClickAdd = (sneakerId: number, isFavorite: boolean, isAdded: boolean) => {
  sneakersStore.updateSneakers(sneakerId, isFavorite, !isAdded)
};

const onClickFavourite = (sneakerId: number, isFavorite: boolean, isAdded: boolean) => {
  sneakersStore.updateSneakers(sneakerId, !isFavorite, isAdded)
};

const toggleDrawer = ref(false)

const closeDrawer = () => {
  toggleDrawer.value = false
}

const openDrawer = () => {
  toggleDrawer.value = true
}

const totalPrice = computed(() => {
  return sneakersStore.sneakers
      .filter(sneaker => sneaker.isAdded)
      .reduce((sum, sneaker) => sum + sneaker.price, 0);
});

provide('cartActions', {
  closeDrawer,
  openDrawer
})

watchEffect(() => {
  if (toggleDrawer.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})
</script>

<template>
  <Drawer @closeDrawer="closeDrawer" v-if="toggleDrawer" :totalPrice="totalPrice"/>

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-2">
    <Header @openDrawer="openDrawer" :totalPrice="totalPrice"/>
    <div class="p-10">
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
            :onClickAdd="() => onClickAdd(item.id, item.isFavorite, item.isAdded)"
            :onClickFavourite="() => onClickFavourite(item.id, item.isFavorite, item.isAdded)"
        />
      </div>
    </div>
  </div>
</template>
