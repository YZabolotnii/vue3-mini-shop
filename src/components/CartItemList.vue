<script setup lang="ts">
import CartItem from '@/components/CartItem.vue'
import {useSneakersStore} from "@/stores/sneaker.ts";
import InfoBlock from "@/components/InfoBlock.vue";

const sneakersStore = useSneakersStore();
sneakersStore.getSneakers();

const onClickRemove = (sneakerId: number, isFavorite: boolean, isAdded: boolean) => {
  sneakersStore.updateSneakers(sneakerId, isFavorite, !isAdded)
};

</script>
<template>
  <div v-if="sneakersStore.sneakers.filter(sneakers => sneakers.isAdded).length" class="flex flex-col flex-1 gap-4 justify-between">
    <CartItem
        v-for="item in sneakersStore.sneakers.filter(sneakers => sneakers.isAdded)"
        :key="item.id"
        :title="item.title"
        :price="item.price"
        :imageUrl="item.imageUrl"
        :onClickRemove="() => onClickRemove(item.id, item.isFavorite, item.isAdded)"
    />
  </div>
  <div v-else>
    <InfoBlock title="Корзина порожня" description="Добавте принаймі одну пару кросівок, щоб зробити заказ." imageUrl="/package-icon.png"/>
  </div>
</template>