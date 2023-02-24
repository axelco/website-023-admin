<script setup>
    import UiContainer from "@/components/ui/UiContainer.vue"
    import UiSection from "@/components/ui/UiSection.vue";
    import CompaniesList from "@/components/experiences/CompaniesList.vue"
</script>

<template>
    <UiSection size="lg" >
        <UiContainer  >
            <h1 class="display-6 mb-3 mb-lg-5">Gérer les expériences pros</h1>
            <div class="row">
                <div
                 class="col-12 col-lg-4"
                >
                    <h2 class="h4 mb-2 ">Sociétés enregistrées</h2>
                    <CompaniesList class="mb-2 mb-lg-3" />
                    <RouterLink :to="{name: 'addCompany'}">Ajouter une société</RouterLink>
                </div>            
            </div>
        </UiContainer>
    </UiSection>
</template>
