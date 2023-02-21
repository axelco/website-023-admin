
const USER = 'user'
class LocalStorageService{
    getUserToken(){
        return localStorage.getItem(USER);
    }

    setUserToken(token){
        localStorage.setItem(USER, token)
        console.log(this.getUserToken())
    }
    
}

export default new LocalStorageService();