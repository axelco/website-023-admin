<script setup >

import TopNav from '../components/app/TopNav.vue';
import AppNav from '../components/app/AppNav.vue';
import UiSection from '../components/ui/UiSection.vue'
</script>

<template>

    <main >
        <TopNav />
        <div id="appMain">
            <AppNav />
            <div id="appInner">
                <RouterView />
            </div>
            
        </div>
    </main>
    

</template>

<style lang="scss">
@import 'src/assets/styles/theming';

#appMain{
    margin-top: 50px;
}

#appInner {
    margin-left: 200px;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
}

</style>