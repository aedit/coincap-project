<template>
  <div class="home">
    <div class="sorting">
      <label for="sorting">
        <span>Sort By: </span>
        <select id="sorting" v-model="sorting" class="sorting">
        <option value="name">Name</option>
        <option value="symbol">Symbol</option>
      </select>
    </label>
    </div>
    <div v-if="isLoading">
      Loading Data ...
    </div>
    <TableBody v-else :tableData="computedTableData"/>

    <div class="pagination">
      <button v-if="currentPage > 1" @click="currentPage--" class="previous-btn">Previous</button>
      <div>
        <span id="currentPage">{{ currentPage }}</span>
        / <span id="totalPages">{{ totalPages }}</span>
      </div>
      <button v-if="currentPage < totalPages" @click="currentPage++" class="next-btn">Next</button>
    </div>
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
      sorting: 'rank' as keyof CoinsDataModel,
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

      newData.sort(
        (a: CoinsDataModel, b: CoinsDataModel) => a[this.sorting as keyof CoinsDataModel]
          .localeCompare(b[this.sorting as keyof CoinsDataModel]),
      );

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

<style lang="scss">
  .home {
    display: flex;
    flex-direction: column;

    .sorting{
      display: flex;
      justify-content: flex-end;

      label {
        display: flex;
        gap: 0.5rem;
      }
    }

    .pagination {
      display: flex;
      justify-content: center;
      gap: 1rem;
      align-items: center;
    }

    button {
      color: #eee;
      font-weight: bold;
      background-color: #42b983;
      cursor: pointer;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
    }
  }
</style>
