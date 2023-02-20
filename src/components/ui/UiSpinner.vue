<template>
  <div :class="containerStyle">
    <div class="spinner-grow text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>  

</template>

<script setup >

import { defineProps } from 'vue';
import { computed } from 'vue'

const props = defineProps({
    align: {
        type: String,
        default : 'center',
    },
})

const containerStyle = computed(()=> {
    return `d-flex justify-content-${props.align}` 
})



</script>