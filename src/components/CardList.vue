<script setup lang="ts">
import Card from '@/components/Card.vue';

// Правильное объявление props
const props = defineProps<{
  items: Array<{
    id: number;
    title: string;
    price: number;
    imageUrl: string;
  }>
}>();

const onClickAdd = () => {
  console.log('clicked add');
};
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <Card
        v-for="item in props.items" :key="item.id"
        :title="item.title"
        :price="item.price"
        :img="item.imageUrl"
        :isAdded="false"
        :isFavorite="true"
        :onClickAdd="onClickAdd"
    />
  </div>
</template>
