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

interface Favorite {
  sneakerId: number;
  favoriteId: number;
}

export const useSneakersStore = defineStore('sneakers', () => {
  const errors = ref({});
  const sneakers = ref<Sneakers[]>([]);
  const favorites = ref<Favorite[]>([]); // Change to an array of Favorite
  const filters = ref({
    sortBy: 'title',
    searchQuery: ''
  });

  function setSneakers(arr: Sneakers[]) {
    sneakers.value = arr;
  }

  function setFavorite(obj: Favorite) {
    favorites.value.push(obj);
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

  function postFavorite(sneakerId: number) {
    return axios.post(`https://ac80202a41369ee0.mokky.dev/favorites/`,{
      sneakerId: sneakerId,
    })
        .then(({ data }) => {
          setFavorite(data);
        })
        .catch(({ response }) => {
          errors.value = response.data.errors;
        });
  }

  function deleteFavorite(favoriteId: number) {
    return axios.delete(`https://ac80202a41369ee0.mokky.dev/favorites/${favoriteId}`)
        .then(() => {
          const index = favorites.value.findIndex(fav => fav.favoriteId === favoriteId);
          if (index !== -1) {
            favorites.value.splice(index, 1);
          }
        })
        .catch(({ response }) => {
          console.error(response.data.errors);
        });
  }

  // Call getSneakers when filters change
  watch(filters, getSneakers);

  return {
    getSneakers,
    updateSneakers,
    postFavorite,
    deleteFavorite,
    sneakers,
    favorites,
    filters
  };
});
