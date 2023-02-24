<script setup>
    import { onMounted, reactive } from 'vue';
    import experiencesService from '@/services/experiences.service.js'
    import UiSpinner from '@/components/ui/UiSpinner.vue'

    const state = reactive({ 
        companies: [],
        companiesLoaded : false,
    })

    onMounted(()=>{
        fetchCompanies()
    })

    const fetchCompanies = () => {
        state.companiesLoaded = false
        experiencesService.getCompanies()
        .then(
            (res)=>{
                state.companiesLoaded = true
                state.companies = res.data
            }
        )
    }

</script>

<template>
    <UiSpinner v-if="!state.companiesLoaded" align="start" />
    <ul v-else class="list-group">
        <li v-for="item in state.companies" 
            :key="item._id"
            class="list-group-item"
        >
            <h3 class="h6">{{item.name}}</h3>
            <RouterLink 
                :to="{name: `editCompany`, params : {id: item._id}}" 
                class="btn btn-link"
            >Editer</RouterLink>    
            
        </li>
    </ul>
</template>
