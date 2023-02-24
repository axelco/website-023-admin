import { api } from "./api.service";

class ExperiencesService {

    getCompanies(){
        return api.get(`/resume/job-companies`)
    }

    getSingleCompany(id){
        return api.get(`/resume/job-companies/${id}`)
    }

    editCompany(data, id){
        return api.put(`/resume/job-companies/${id}`, data)
    }

    addCompany(data){
        return api.post(`/resume/job-companies`, data)
    }

    getJobs(){
        return api.get(`/resume/jobs`)
    }  
    
    getSingleJob(id){
        return api.get(`/resume/jobs/${id}`)
    }

    editJob(data, id){
        return api.put(`/resume/jobs/${id}`, data)
    }

    addJob(data){
        return api.post(`/resume/jobs`, data)
    }    

}

export default new ExperiencesService()
