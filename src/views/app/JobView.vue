<script setup >
    import { onMounted, reactive, computed } from 'vue';
    import { useRoute,useRouter } from 'vue-router';
    import experiencesService from './../../services/experiences.service'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    import UiContainer from '@/components/ui/UiContainer.vue'    

    const route = useRoute()
    const router = useRouter()

    const state = reactive({ 
        mode : "add",
        jobId: null,
        formData : {
            name : "",
            company: "",
            location : "",
            startDate : "",
            endDate: "",
            shortDescription : "",
            contractType: "",
            missionsContent : '',
            successContent: '',

        },
        companiesList : {
            items : [],
            loaded : false,
        },
        savingData : false,
        saved : false,
        contractsList : ['cdd', 'cdi', 'stage'],
        editor : {
            theme  : ClassicEditor,
            config : {},
        },         
    })    

    onMounted(()=>{
        fetchCompaniesList()
        // On commence par déterminer si on est en édition ou ajout d'entreprise
        setMode()

        // Si on est en édition, on va récupérer les données de l'entreprise
        if(state.mode === "edit"){
            fetchJob()
        }
        
    })

    const pageTitle = computed(()=>{
        return state.mode === "edit" ?
            `Editer une expérience pro`
            : `Ajouter une expérience pro`
    })

    const submitForm = (event) => {

        if(state.formData.name !== ""){
            
            if(state.mode === "edit"){
                updateJob()
            }else{
                addJob()
            }
        }
    }

    const setMode = () => {

        switch(route.name){

            case 'editJob' :
                state.mode = "edit";
                state.jobId = route.params.id
                break;

            default : 
                state.mode = "add";      

            }        
    }

    const fetchJob = () => {
        experiencesService.getSingleJob(state.jobId)
        .then(
            (res)=>{
                state.formData  = res.data

                // On modifie la valeur de company par son id et non l'objet entier
                state.formData.company = res.data.company._id
                
                // On transforme la date de début renvoyée pour être lisible côté front
                if(state.formData.startDate){
                    let startDate = new Date(state.formData.startDate)
                    state.formData.startDate = startDate.toISOString().split('T')[0]
                                                
                }
                // On transforme la date de find renvoyée pour être lisible côté front
                if(state.formData.endDate){
                    let endDate = new Date(state.formData.endDate)
                    state.formData.endDate = endDate.toISOString().split('T')[0]
                                                
                }                         

            }
        ).catch(
            (error)=>{
                console.error(error)
                router.push({name : 'experiences'})

            }
        )        
    }

    const fetchCompaniesList = () => {
        state.companiesList.loaded = false
        experiencesService.getCompanies()
        .then(
            (res)=> {
                state.companiesList.loaded = true
                state.companiesList.items = res.data
            }
        )
    }

    const updateJob = () => {
        state.savingData = true
        state.saved = false
        experiencesService.editJob(state.formData, state.jobId)
        .then(
            ()=> {
                state.savingData = false
                state.saved = true
            }
        )
    }

    const addJob = () => {
        state.savingData = true
        state.saved = false
        experiencesService.addJob(state.formData)
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
    <div >
        <UiContainer size="md" >
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
                <div class="row">
                    <div class="col-12 mb-2 mb-lg-3">
                        <label for="name" >Nom de votre job</label>
                        <input 
                            type="text" 
                            v-model="state.formData.name" 
                            id="name"
                            class="form-control"
                            required
                            :disabled="state.savingData"
                        />                    
                    </div>
                    <div class="col-12 mb-2 mb-lg-3">
                        <label for="location" >Localisation</label>
                        <input 
                            type="text" 
                            v-model="state.formData.location" 
                            id="location"
                            class="form-control"
                            required
                            :disabled="state.savingData"
                        />                    
                    </div>                    
                    <div class="col-12 mb-2 col-lg-4 mb-lg-3">
                        <label for="company" >Type de contrat</label>
                        <select 
                            v-model="state.formData.contractType"
                            class="form-select"
                            required
                        >
                            <option value="">- Selectionner -</option>
                            <option
                                v-for="item in state.contractsList"
                                :key="item"
                                :value="item"
                                :selected="state.formData.contractType === item"
                            >{{ item }}</option>
                        </select>                    
                    </div>                      
                    <div class="col-12 mb-2 col-lg-8 mb-lg-3">
                        <label for="company" >Sélectionner la société</label>
                        <select 
                            v-model="state.formData.company"
                            class="form-select"
                            required
                        >
                            <option value="">- Selectionner -</option>
                            <option
                                v-for="item in state.companiesList.items"
                                :key="item._id"
                                :value="item._id"
                                :selected="state.formData.company === item._id"
                            >{{ item.name }}</option>
                        </select>                    
                    </div>     
                    <div class="col-12 mb-2 col-lg-6 mb-lg-3">
                        <label for="startDate" >Date de début</label>
                        <input 
                            type="date" 
                            v-model="state.formData.startDate" 
                            id="startDate"
                            class="form-control"
                            required
                            :disabled="state.savingData"
                        />                    
                    </div>  
                    <div class="col-12 mb-2 col-lg-6 mb-lg-3">
                        <label for="endDate" >Date de fin</label>
                        
                        <input 
                            type="date" 
                            v-model="state.formData.endDate" 
                            id="endDate"
                            class="form-control"                            
                            :disabled="state.savingData"
                        />   
                        <small>Si c'est votre job actuel, laisser vide</small>                 
                    </div>   
                    <div class="col-12 mb-2 mb-lg-3">
                        <label for="name" >Description courte</label>
                        <textarea
                            v-model="state.formData.shortDescription" 
                            id="companyName"
                            class="form-control"    
                            :disabled="state.savingData"                    
                        >
                            {{ state.formData.shortDescription }}
                        </textarea> 
                    </div>  
                    <div class="col-12 mb-2 col-lg-6">
                        <label 
                            class="form-label"
                        >🚀 Succès</label>
                        <ckeditor 
                        :editor="state.editor.theme" 
                        v-model="state.formData.successContent" 
                        :config="state.editor.config"></ckeditor>                    
                    </div>                      
                    <div class="col-12 mb-2 col-lg-6">
                        <label 
                            class="form-label"
                        >📐 Missions</label>
                        <ckeditor 
                        :editor="state.editor.theme" 
                        v-model="state.formData.missionsContent" 
                        :config="state.editor.config"></ckeditor>                    
                    </div>                                                                
                </div>


                <div class="mt-2 mt-lg-3">
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
    </div>


</template>

<style lang="scss">


.ck-editor__editable{
    min-height: 200px;
    max-height: 500px;
    overflow-y: auto !important;
}
</style>