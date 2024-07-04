<template>
    <div class="tableRow">
        {{ rowData }}
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
