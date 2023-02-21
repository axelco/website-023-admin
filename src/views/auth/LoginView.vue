<script setup >

    import { reactive } from "vue";
    import { useRouter } from "vue-router";
    import authService from '@/services/auth.service'
    import localStorageServece from "@/services/localstorage.service"

    import UiContainer from "@/components/ui/UiContainer.vue"
    import UiSpinner from "@/components/ui/UiSpinner.vue"
    import UiSection from "@/components/ui/UiSection.vue";
    import UiCard from "@/components/ui/UiCard.vue";

    const state = reactive({
        formData : {
            email : '',
            password: '',
        },
        formStatus : {
            submitting : false,
            error: null,
        }

    })

    const router = useRouter()

    const login = () => {
        state.formStatus.submitting = true
        authService.login(state.formData)
        .then(

            (res) =>{ 
                state.formStatus.submitting = false
                state.formStatus.error = null
                localStorageServece.setUserToken(res.data.token)
                router.push({name : 'home'})
            }
        )
        .catch(

            (error)=> {
                state.formStatus.submitting = false;
                state.formStatus.error = error.toString()

            }
        )
    }
</script>

<template>
    <UiSection size="lg" >
        <UiContainer size="sm" >
            <UiCard 
                :show-footer="false" 
                :show-header="false"
            >
                <div v-if="!state.formStatus.submitting">
                    <div 
                        class="alert alert-warning mb-2"
                        v-if="state.formStatus.error !== null"
                    >
                        Tu ne peux pas te connecter... 
                    
                    </div>                
                    <h1>Se connecter à l'admin</h1>
                    <form class="py-3" @submit.prevent="login">
                        <div class="mb-3">
                            <label 
                                for="email" 
                                class="form-label"
                            >
                                E-mail</label>
                            <input 
                                v-model="state.formData.email"
                                required
                                type="email" 
                                class="form-control" 
                                id="email" 
                            />
                        </div>                    
                        <div class="mb-3">
                            <label 
                                for="password" 
                                class="form-label"
                            >
                                Mot de passe</label>
                            <input 
                                v-model="state.formData.password"
                                required
                                type="password" 
                                class="form-control" 
                                id="password" 
                            />
                        </div>  
                        <button
                            type="submit"
                            class="btn btn-lg btn-primary">
                                Connexion
                        
                        </button>                
                    </form>                
                
                </div>
                <div v-else>

                    <UiSpinner />
                </div>

            </UiCard>
            
        </UiContainer>    
    </UiSection>

</template>