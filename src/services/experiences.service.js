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

}

export default new ExperiencesService()
