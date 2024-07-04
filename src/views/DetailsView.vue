<template>
  <div class="details">
    <h1>This is details page for {{ $route.params.id }}</h1>

    <div v-if="isLoading">
        Loading Coin Data ...
    </div>
    <div v-else-if="error">
        Some error Occured. Please try later!
    </div>
    <div v-else class="coindata">
        <TableRow :rowData="coinData" type="single"></TableRow>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { CoinsDataModel } from '@/types/CoinsDataModel';
import axios from 'axios';
import TableRow from '@/components/TableRow.vue';

export default defineComponent({
  data() {
    return {
      coinData: {} as CoinsDataModel,
      isLoading: true,
      error: false,
    };
  },
  components: {
    TableRow,
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
        this.error = true;
      } finally {
        this.isLoading = false;
      }

      return data?.data as CoinsDataModel || {};
    },
  },
});

</script>

<style lang="scss">

    .details {
        display: flex;
        flex-direction: column;
    }
    .coindata{
        border-left: 1px solid #eee;
        border-top: 1px solid #eee;
        margin: 0 auto
    }
</style>
