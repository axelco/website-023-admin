<script setup >
    import { onMounted, reactive, computed } from 'vue';
    import { useRoute,useRouter } from 'vue-router';
    import experiencesService from './../../services/experiences.service'

    import UiSection from '@/components/ui/Uisection.vue'
    import UiContainer from '@/components/ui/UiContainer.vue'    

    const route = useRoute()
    const router = useRouter()
    const state = reactive({ 
        mode : "add",
        companyId: null,
        formData : {
            name : "",
            description: "",
            websiteUrl : "",
        },
        savingData : false,
        saved : false,
    })    

    onMounted(()=>{
        // On commence par déterminer si on est en édition ou ajout d'entreprise
        setMode()

        // Si on est en édition, on va récupérer les données de l'entreprise
        if(state.mode === "edit"){
            fetchCompanyInfos()
        }
        
    })

    const pageTitle = computed(()=>{
        return state.mode === "edit" ?
            `Editer une entreprise`
            : `Ajouter une entreprise`
    })

    const submitForm = (event) => {
        if(state.formData.name !== ""){
            
            if(state.mode === "edit"){
                updateCompany()
            }else{
                addCompany()
            }
        }
    }

    const setMode = () => {

        switch(route.name){

            case 'editCompany' :
                state.mode = "edit";
                state.companyId = route.params.id
                break;

            default : 
                state.mode = "add";      

            }        
    }

    const fetchCompanyInfos = () => {
        experiencesService.getSingleCompany(state.companyId)
                .then(
                    (res)=>{
                        state.formData.name  = res.data.name 
                        state.formData.description  = res.data.description 
                        state.formData.websiteUrl  = res.data.websiteUrl 
                        console.log(state.formData)
                    }
                ).catch(
                    (error)=>{
                        console.error(error)
                        router.push({name : 'experiences'})

                    }
                )        
    }

    const updateCompany = () => {
        state.savingData = true
        state.saved = false
        experiencesService.editCompany(state.formData, state.companyId)
        .then(
            ()=> {
                state.savingData = false
                state.saved = true
            }
        )
    }

    const addCompany = () => {
        state.savingData = true
        state.saved = false
        experiencesService.addCompany(state.formData)
        .then(
            ()=> {
                state.savingData = false
                state.saved = true
                router.back()
            }
        )
    }    

</script>

<template>
    <UiSection size="lg" >
        <UiContainer size="sm" >
            <button 
                class="btn btn-link"
                @click="router.back()"
            >
                <i class="bi bi-arrow-left"></i> Retour
            </button>
            <h1 class="mb-3">{{ pageTitle }}</h1>
            <div 
                class="alert alert-success" 
                role="alert"
                v-if="state.saved"
            >
                L'entreprise a été mise à jour
            </div>
            <form class="my-3" @submit.prevent="submitForm()">
                <div class="mb-2">
                    <label for="companyName" >Nom de l'entreprise</label>
                    <input 
                        type="text" 
                        v-model="state.formData.name" 
                        id="companyName"
                        class="form-control"
                        required
                        :disabled="state.savingData"
                    />
                </div>
                <div class="mb-2">
                    <label for="companyDescription" >Description (optionnel)</label>
                    <input 
                        type="text" 
                        v-model="state.formData.description" 
                        id="companyDescription"
                        class="form-control"
                        :disabled="state.savingData"
                    />
                </div>       
                <div class="mb-2">
                    <label for="companyWebsite" >Url de l'entreprise (optionnel)</label>
                    <input 
                        type="url" 
                        v-model="state.formData.websiteUrl" 
                        id="companyWebsite"
                        class="form-control"
                        :disabled="state.savingData"
                    />
                </div>
                <div>
                    <button type="submit"
                        class="btn btn-lg btn-primary"
                        :disabled="state.savingData"
                    >
                        <span 
                            v-if="state.savingData"
                            class="spinner-grow spinner-grow-sm" 
                            role="status" 
                            aria-hidden="true"></span>
                        Sauvegarder
                    </button>
                </div>                           
            </form>
        </UiContainer>
    </UiSection>


</template>