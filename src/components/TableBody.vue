<template>
    <div class="tableBody">
        <TableRow :rowData="headersData" type="header" />
        <TableRow
            v-for="row in tableData"
            :key="row.id"
            :rowData="row"
            :isFavorite="isFavoriteCoin(row.id)"
            @toggleFavorite="toggleFavorite"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { CoinsDataModel } from '@/types/CoinsDataModel';
import TableRow from '@/components/TableRow.vue';

export default defineComponent({
  name: 'TableBody',
  props: {
    tableData: {
      type: Array as PropType<CoinsDataModel[]>,
      required: true,
    },
  },
  data() {
    return {
      headersData: {
        symbol: 'Symbol',
        name: 'Name',
        id: 'ID',
        rank: 'Rank',
        marketCapUsd: 'Market Cap USD $',
        priceUsd: 'Price USD $',
      } as CoinsDataModel,
      favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as Array<string>,
    };
  },
  components: {
    TableRow,
  },
  methods: {
    isFavoriteCoin(id: string) {
      return this.favorites.includes(id);
    },
    toggleFavorite(id: string) {
      const isFavorite = this.isFavoriteCoin(id);
      if (isFavorite) {
        const idx = this.favorites.findIndex((e:string) => e === id);
        this.favorites.splice(idx, 1);
      } else this.favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
  },
});
</script>

<style lang="scss">
    .tableBody{
        display: table;
        border-left: 1px solid #eee;
        border-top: 1px solid #eee;
        width: 100%;
        margin: 2rem 0;
    }
</style>
