<script setup>
    import UiContainer from "@/components/ui/UiContainer.vue"
    import CompaniesList from "@/components/experiences/CompaniesList.vue"
    import JobsList from "../../components/experiences/JobsList.vue";

</script>

<template>
<UiContainer  >
    <h1 class="display-6 mb-3 mb-lg-5">Gérer les expériences pros</h1>
    <div class="row gx-4">
        <div class="col-12 mb-2 col-lg-8">
            <h2 class="h4 mb-2 ">Jobs enregistrés</h2>
            <JobsList class="mb-2 mb-lg-3" />
            <RouterLink :to="{name: 'addJob'}">Ajouter une expérience</RouterLink>
        </div>
        <div
            class="col-12 col-lg-4"
        >
            <h2 class="h4 mb-2 ">Sociétés enregistrées</h2>
            <CompaniesList class="mb-2 mb-lg-3" />
            <RouterLink :to="{name: 'addCompany'}">Ajouter une société</RouterLink>
        </div>            
    </div>
</UiContainer>
</template>
