<script setup lang="ts">
import Card from "@/components/Card.vue";
import {useSneakersStore} from "@/stores/sneaker.ts";

const props = defineProps({
  filterItems: String
})

const sneakersStore = useSneakersStore();
sneakersStore.getSneakers();

const onClickAdd = (sneakerId: number, isFavorite: boolean, isAdded: boolean) => {
  sneakersStore.updateSneakers(sneakerId, isFavorite, !isAdded)
};

const onClickFavourite = (sneakerId: number, isFavorite: boolean, isAdded: boolean) => {
  sneakersStore.updateSneakers(sneakerId, !isFavorite, isAdded)
};

const sneakerItems = () => {
  if(props.filterItems === 'all') {
    return sneakersStore.sneakers
  } else if (props.filterItems === 'favorites') {
    return sneakersStore.sneakers.filter(sneaker => sneaker.isFavorite)
  }
}
</script>
<template>
  <div class="grid grid-cols-4 gap-10" v-auto-animate>
    <Card
        v-for="item in sneakerItems()"
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
</template>