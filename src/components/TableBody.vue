<template>
    <div class="tableBody">
        <TableRow v-for="row in tableData" :key="row.id" :rowData="row"/>
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
  components: {
    TableRow,
  },
});
</script>
