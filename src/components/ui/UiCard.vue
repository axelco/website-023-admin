<template>

    <div class="card">
        <div v-if="showHeader" class="card-header">
            <slot name="header"></slot>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
        <div 
            v-if="showFooter" 
            :class="{'no-border' : !showFooterBorder}" 
            class="card-footer">
            <slot name="footer"></slot>
        </div>        
        
    </div>


</template>

<script setup >

import { defineProps } from 'vue';

defineProps({
  showHeader: {
    type: Boolean,
    default : true,
  },
  showFooter: {
    type: Boolean,
    default : true,
  },  
  showFooterBorder : {
    type: Boolean,
    default: false,
  }
})

</script>

<style lang="scss">
@import 'src/assets/styles/theming';

.card{
    background-color: $black;
    color: $gray-400;
    
    .card-body {
        padding: 1.5rem;
        color: $gray-400;
    }
    .card-header, .card-footer{
        border-color: $dark;
        padding: 1rem 1.5rem;
    }

    .card-footer {
        &.no-border{
            border-width: 0;
        }
    }
}

</style>