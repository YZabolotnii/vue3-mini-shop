<script setup lang="ts">
import Header from '@/components/Header.vue';
import CardList from '@/components/CardList.vue';
// import Drawer from "@/components/Drawer.vue";
import {useSneakersStore} from "@/stores/counter.ts";

const sneakersStore = useSneakersStore();

sneakersStore.getSneakers();

</script>

<template>
<!--  <Drawer/>-->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-2">
    <Header/>

    <div class="p-10">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
        <div class="flex items-center gap-4">
          <select class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none">
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <input

                type="text"
                class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
                placeholder="Пошук..."
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img alt="Search" src="/search.svg" />
            </div>
          </div>
        </div>
      </div>

      <CardList />
    </div>
  </div>
</template>












<!--
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event: any) => {
  filters.sortBy = event.target.value;
}

const onChangeSearchInput = (event: any) => {
  filters.searchQuery = event.target.value;
}

const fetchFavorites = async () => {
  try {
    const { data } = await axios.patch(`https://ac80202a41369ee0.mokky.dev/items/3`, {
      isFavorite: true
    });

    sneakers.value = data;
    fetchSneakers();
  } catch (err) {
    console.error(err);
  }
}

const fetchSneakers = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }

    if(filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }

    const { data } = await axios.get(`https://ac80202a41369ee0.mokky.dev/items`, {
      params
    });

    sneakers.value = data;
  } catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await fetchSneakers();
});
watch(filters, fetchSneakers);
-->