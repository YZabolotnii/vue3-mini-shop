<script setup lang="ts">
import CartItem from '@/components/CartItem.vue'
</script>
<template>
  <div class="fle flex-col flex-1 gap-4 justify-between">
    <CartItem
        title="Мужские Кроссовки Nike Blazer Mid Suede"
        :price="1000"
        imageUrl="/sneakers/sneakers-1.jpg"
    />
  </div>
</template>