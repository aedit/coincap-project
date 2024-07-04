<template>
  <div class="details">
    <h1>This is details page for {{ $route.params.id }}</h1>

    <div v-if="isLoading">
        Loading Coin Data ...
    </div>
    <div v-else>
        {{ coinData }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { CoinsDataModel } from '@/types/CoinsDataModel';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      coinData: {} as CoinsDataModel,
      isLoading: true,
    };
  },
  async mounted() {
    const { params: { id } } = this.$route;
    this.coinData = await this.fetchCoinData(id);
  },
  methods: {
    async fetchCoinData(id: string | string[]) {
      this.isLoading = true;
      let data;
      try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
        data = response.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }

      return data.data as CoinsDataModel;
    },
  },
});

</script>
