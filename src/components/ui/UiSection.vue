<template>
    <section :class="setSectionCss">
        <slot></slot>
    </section>

</template>

<script setup >

import { defineProps, computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default : '',
  },
})

const setSectionCss = computed(()=>{
    let css = 'ar-section'
    const possibleSizes = ['sm','lg', 'xl']
    if(props.size !== "" && possibleSizes.includes(props.size)){
        css += ` ${props.size}`
    }

    return css
})

</script>

<style lang="scss">

    .ar-section{
        
        padding-top: calc(10vh - 2rem);
        padding-bottom: calc(10vh - 2rem);

        &.sm{
            padding-top: calc(7vh - 2rem);
            padding-bottom: calc(7vh - 2rem);
        }        

        &.lg{
            padding-top: calc(15vh - 2rem);
            padding-bottom: calc(15vh - 2rem);
        }

        &.xl{
            padding-top: calc(20vh - 2rem);
            padding-bottom: calc(20vh - 2rem);
        }

    }

</style>