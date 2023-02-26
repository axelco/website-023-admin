<script setup >
    import { reactive } from 'vue';

    const state = reactive({
        menu : [
            {
                title : 'Gestion des jobs',
                links : [
                    {
                        title : 'Voir les jobs',
                        routeName : 'experiences',
                    },
                    {
                        title : 'Ajouter un job',
                        routeName : 'addJob',
                        icon: 'plus-lg'
                    },                    
                ]
            },          
        ]
    })

</script>

<template>
    <nav id="appNav">
        <ul v-for="item in state.menu" :key="item.title" class="list">
            <li class="title">{{item.title}}</li>
            <li 
                v-for="link in item.links" 
                :key="link.routeName"
            >
                <RouterLink 
                    :to="{name: link.routeName}" 
                    class="link"
                >
                    <i v-if="link.icon" :class="`bi bi-${link.icon}`" style="margin-right:.2rem"></i>{{link.title}}
                </RouterLink>
            </li>
        </ul>
    </nav>

</template>

<style lang="scss">
@import 'src/assets/styles/theming';

#appNav {
    position: fixed;
    top: 50px;
    width: 200px;
    height: calc(100vh - 50px);
    max-height: calc(100vh - 50px);
    overflow: auto;
    background-color: $black;

    .list{
        padding: 1rem;
        margin-bottom: 0;
        list-style: none;

        .title{
            text-transform: uppercase;
            color: $gray-500;
            margin-bottom: .8rem;
        }

        .link {
            display: block;
            width: 100%;
            padding-top: .25rem;
            padding-bottom: .25rem;
            padding-left: .8rem;
            color: $gray-400;
            text-decoration: none;

            &:hover{
                color: $primary;
            }

            &.router-link-active, &.active{
                color: $white;
            }
        }
    }
}

</style>