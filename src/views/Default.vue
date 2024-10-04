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

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl shadow-grey-200 mb-10">
    <Header @openDrawer="openDrawer" :totalPrice="totalPrice"/>
    <div class="p-10">
      <RouterView></RouterView>
    </div>
  </div>
</template>
