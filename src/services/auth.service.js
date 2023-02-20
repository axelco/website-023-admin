import { api } from "./api.service";

class AuthService {
    
    login(data){
        return api.post(`/user/login`, data)

    }
}

export default new AuthService();