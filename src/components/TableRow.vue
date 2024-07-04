<template>
    <div class="tableRow">
        <span class="tableRow__cell">{{rowData.symbol}}</span>
        <span class="tableRow__cell">{{rowData.id}}</span>
        <span class="tableRow__cell">{{rowData.name}}</span>
        <span class="tableRow__cell">{{rowData.priceUsd}}</span>
        <span class="tableRow__cell">{{rowData.marketCapUsd}}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { CoinsDataModel } from '@/types/CoinsDataModel';

export default defineComponent({
  name: 'TableRow',
  props: {
    rowData: {
      type: Object as PropType<CoinsDataModel>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
    .tableRow {
        display:table-row;

        &__cell {
            display: table-cell;
            min-width: 100px;
            border-right: 1px solid #eee;
            padding: 5px;
            border-bottom: 1px solid #eee;
        }
    }
</style>
