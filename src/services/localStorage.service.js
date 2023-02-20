
const USER = 'user'
class LocalStorageService{
    getUserToken(){
        return localStorage.getItem(USER);
    }

    setUserToken(token){
        localStorage.setItem(USER, token)
    }
    
}

export default new LocalStorageService();