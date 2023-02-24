<script setup >
    import { onMounted, reactive } from 'vue';
    import experiencesService from '@/services/experiences.service.js'
    import UiSpinner from '@/components/ui/UiSpinner.vue'

    const state = reactive({ 
        jobs: [],
        jobsLoaded : false,
    })

    onMounted(()=>{
        fetchJobs()
    })

    const fetchJobs = () => {
        state.jobsLoaded = false
        experiencesService.getJobs()
        .then(
            (res)=>{
                state.jobsLoaded = true
                state.jobs = res.data
            }
        )
    }

</script>

<template>
    <UiSpinner v-if="!state.jobsLoaded" align="start" />
    <ul v-else class="list-group">
        <li v-for="item in state.jobs" 
            :key="item._id"
            class="list-group-item"
        >
            <h3 class="h6">{{item.name}}</h3>
            <p>Chez {{ item.company.name }}</p>
            <p>Début : {{ item.startDate }} / fin : {{ item.endDate ? item.endDate : "en cours" }}</p>
            <RouterLink 
                :to="{name: `editJob`, params : {id: item._id}}" 
                class="btn btn-link"
            >Editer</RouterLink>    
            
        </li>
    </ul>
</template>
