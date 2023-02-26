<script setup >
    import { useRouter } from 'vue-router';
    import localStorageService from '../../services/localStorage.service';

    const router = useRouter();

    const logout = () => {
        localStorageService.destroyUserToken()
        router.push({name: 'login'});
    }

</script>

<template>
    <nav id="topNav">
        <div class="container-fluid">
            <div>Admin panel</div>
            <button @click="logout()" class="ms-auto nav-link">Déconnexion</button>
        </div>
    </nav>

</template>

<style lang="scss">
@import 'src/assets/styles/theming';

#topNav {
    display: flex;
    flex-direction: column;
    height: 50px;
    justify-content: center;
    padding-top: .5rem;
    padding-bottom: .5rem;
    background-color: $primary;
    color: $black;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 800;
    .container, .container-fluid {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: space-between;
        
    }

    .nav-link{
        border: none;
        padding: 0 .5rem;
        color: $black;
        background-color: transparent;

        &:hover{
            color: $dark;
        }
    }
}

</style>