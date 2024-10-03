<script setup>
import CartItemList from './CartItemList.vue';
import CartHeader from "@/components/CartHeader.vue";

defineProps({
  totalPrice: Number
})

const emit = defineEmits(['closeDrawer'])


</script>

<template>
  <div @click="() => emit('closeDrawer')" class="fixed z-10 top-0 h-full w-full bg-black opacity-70" />
  <div class="flex flex-col justify-between fixed h-full z-10 top-0 right-0 w-96 bg-white px-10 py-7">
    <CartHeader />

    <div class="flex flex-col flex-1 justify-between overflow-auto hide-scrollbar">
      <div class="flex flex-col gap-5 mb-5">
        <CartItemList />
      </div>

      <div>
        <div class="flex flex-col gap-5">
          <div class="flex items-end gap-2">
            <span>Всього:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ totalPrice }} грн.</span>
          </div>

          <div class="flex items-end gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ (totalPrice * 0.05).toFixed() }} грн.</span>
          </div>
        </div>

        <button
            class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
        >
          Оформить заказ
          <img src="/arrow-next.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>