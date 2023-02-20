<template>
    <div :class="`container ${props.size}`">
        <slot></slot>
    </div>

</template>

<script setup >

import { defineProps } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default : '',
  },
})

</script>

<style lang="scss">
@import '@/assets/styles/theming';

    .container {
        &.sm {
            max-width: 560px;
        }

        &.md {
            max-width: 960px;
        }

        &.lg {
            max-width: 1240px;
        }

        &.xl {
            max-width: 1440px;
        }
    }


</style>