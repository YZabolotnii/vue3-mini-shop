import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import axios from "axios";

interface Sneakers {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  isAdded: boolean;
}

export const useSneakersStore = defineStore('sneakers', () => {
  const errors = ref({});
  const sneakers = ref<Sneakers[]>([]);
  const filters = ref({
    sortBy: 'title',
    searchQuery: ''
  });

  function setSneakers(arr: Sneakers[]) {
    sneakers.value = arr;
    errors.value = {};
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function getSneakers() {
    const params: any = {
      sortBy: filters.value.sortBy,
    };

    if (filters.value.searchQuery) {
      params.title = `*${filters.value.searchQuery}*`;
    }

    return axios.get(`https://ac80202a41369ee0.mokky.dev/items/`, { params })
        .then(({ data }) => {
          setSneakers(data);
        })
        .catch(({ response }) => {
          errors.value = response.data.errors;
        });
  }

  function updateSneakers(id: number, favorite: boolean) {
    return axios.patch(`https://ac80202a41369ee0.mokky.dev/items/${id}/`, {
      isFavorite: favorite,
    })
        .then(() => {
          const index = sneakers.value.findIndex(sneaker => sneaker.id === id);
          if (index !== -1) {
            sneakers.value[index] = {
              ...sneakers.value[index],
              isFavorite: favorite
            };
          }
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
  }

  // Викликаємо getSneakers, коли фільтри змінюються
  watch(filters, getSneakers);

  return {
    getSneakers,
    updateSneakers,
    sneakers,
    filters
  };
});
