<template>
  <div class="home">
    <div v-if="isLoading">
      Loading Data ...
    </div>
    <TableBody v-else :tableData="computedTableData"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { CoinsDataModel } from '@/types/CoinsDataModel';
import axios from 'axios';
import TableBody from '@/components/TableBody.vue';

const PER_PAGE = 10;

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      tableData: [] as CoinsDataModel[],
      intervalID: 0 as ReturnType<typeof setInterval>,
      isLoading: true,
      totalPages: 0,
      currentPage: 1,
      errorMessage: '',
    };
  },
  components: {
    TableBody,
  },
  async mounted() {
    this.isLoading = true;
    this.tableData = await this.fetchCoinsData();
    this.totalPages = Math.ceil((this.tableData?.length || 0) / PER_PAGE);

    this.intervalID = setInterval(async () => {
      this.tableData = await this.fetchCoinsData();
    }, 10000);
  },
  beforeUnmount() {
    clearInterval(this.intervalID);
  },
  computed: {
    computedTableData(): CoinsDataModel[] {
      let newData = this.tableData || [];
      newData = newData?.slice((this.currentPage - 1) * PER_PAGE, this.currentPage * PER_PAGE)
      || [];

      return newData;
    },
  },
  methods: {
    async fetchCoinsData() {
      let data;
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets');
        data = response.data;
      } catch (e) {
        this.errorMessage = 'Some Error Occured';
      } finally {
        this.isLoading = false;
      }

      return data.data as CoinsDataModel[] || [];
    },
  },
});
</script>
