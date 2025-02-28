<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
    <div :class="`tableRow ${type==='header' ? 'tableHeader' : ''}`">
        <span class="tableRow__cell">{{rowData.symbol}}</span>
        <span class="tableRow__cell">{{rowData.id}}</span>
        <span class="tableRow__cell">
            <RouterLink v-if="type !== 'header' && type !== 'single'" :to="rowData.id">
                {{ rowData.name }}
            </RouterLink>
            <template v-else>{{ rowData.name }}</template>
        </span>
        <span class="tableRow__cell">
            <template v-if="type === 'header'">
                {{ rowData.priceUsd }}
            </template>
            <template v-else>
                {{ toCurrencyString(rowData.priceUsd) }}
            </template>
        </span>
        <span class="tableRow__cell">
            <template v-if="type === 'header'">
                {{ rowData.marketCapUsd }}
            </template>
            <template v-else>
                {{ toCurrencyString(rowData.marketCapUsd) }}
            </template>
        </span>

        <span
            v-if="type !== 'single'"
            class="tableRow__cell favorite"
            @click="$emit('toggleFavorite', rowData.id)"
            :title="isFavorite ? 'Remove Favorite' : 'Mark Favorite'"
        >
            <template v-if="type === 'header'">
                Favorite
            </template>
            <template v-else-if="isFavorite">
                ✨
            </template>
            <template v-else>
                ⭐
            </template>
        </span>
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
    type: {
      type: String,
      default: '',
    },
    isFavorite: {
      type: Boolean,
    },
  },
  methods: {
    toCurrencyString(number: string) {
      return parseInt(number, 10).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
  },
});
</script>

<style lang="scss">
    .tableRow {
        display:table-row;

        &.tableHeader {
            .tableRow__cell {
                font-weight: 600;
                color: white;
            }
        }

        &__cell {
            display: table-cell;
            min-width: 100px;
            border-right: 1px solid #eee;
            padding: 5px;
            border-bottom: 1px solid #eee;

            a{
                color: #42b983
            }

            &.favorite{
                cursor: pointer;
            }
        }
    }
</style>
