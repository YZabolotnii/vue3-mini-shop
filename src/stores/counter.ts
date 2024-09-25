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
  favoriteId: number
}

export const useSneakersStore = defineStore('sneakers', () => {
  const errors = ref({});
  const sneakers = ref<Sneakers[]>([]);
  const favorites = ref<Favorite>();
  const filters = ref({
    sortBy: 'title',
    searchQuery: ''
  });

  function setSneakers(arr: Sneakers[]) {
    sneakers.value = arr;
  }

  function setFavorite(obj: Favorite) {
    favorites.value = obj;
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

  // function deleteFavorite(sneakerId: number) {
  //   return axios.delete(`https://ac80202a41369ee0.mokky.dev/favorites/${sneakerId}`)
  //       .then(() => {
  //         const index = sneakers.value.findIndex(sneaker => sneaker.id === sneakerId);
  //         if (index !== -1) {
  //           sneakers.value[index].isFavorite = false;
  //         }
  //       })
  //       .catch(({ response }) => {
  //         errors.value = response.data.errors;
  //       });
  // }

  function deleteFavorite(sneakerId: number) {
    // Знаходимо відповідний улюблений елемент за sneakerId
    const favorite = favorites.value.find((fav: number) => fav.sneakerId === sneakerId);

    if (favorite) {
      return axios.delete(`https://ac80202a41369ee0.mokky.dev/favorites/${favorite.id}`)
          .then(() => {
            const index = sneakers.value.findIndex(sneaker => sneaker.id === sneakerId);
            if (index !== -1) {
              sneakers.value[index].isFavorite = false;
            }
          })
          .catch(({ response }) => {
            errors.value = response.data.errors;
          });
    } else {
      console.error("Улюблений елемент з таким sneakerId не знайдено");
    }
  }


  // Викликаємо getSneakers, коли фільтри змінюються
  watch(filters, getSneakers);

  return {
    getSneakers,
    updateSneakers,
    postFavorite,
    deleteFavorite,
    sneakers,
    filters
  };
});
