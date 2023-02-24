
const USER = 'user'
class LocalStorageService{
    getUserToken(){
        return localStorage.getItem(USER);
    }

    setUserToken(token){
        localStorage.setItem(USER, token)
        console.log(this.getUserToken())
    }

    destroyUserToken(){
        localStorage.removeItem(USER)
    }
    
}

export default new LocalStorageService();