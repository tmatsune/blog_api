const API_URL = "http://localhost:3000/";
const USER_ID = 3;
const LOCAL_STORAGE_KEY = "current_user";

class User{
    static instance;
    first_name;
    last_name;
    id;
    constructor(){
        if(User.instance) return this.instance;
        this.instance = this;
    };
    static get_instance(){
        if (!User.instance) { User.instance = new User(); }
        return User.instance;
    }
    async load_user(){
        var current_user = await this.get_user_storage();
        if(!current_user){
            current_user = await this.fetch_user_backend();
            if(current_user){
                var string_data = JSON.stringify(current_user);
                this.set_user_storage(string_data);
            }else{ 
                console.log("failed to get data from API"); 
                return false;
            }
        }else{ 
            console.log("got user from storage"); 
        }
        console.log(current_user);
        this.first_name = current_user.first_name;
        this.last_name = current_user.last_name;
        this.id = current_user.id;
        return true;
    }
    async fetch_user_backend(){
        try{
            var res = await fetch(`${API_URL}user/${USER_ID}`);
            if(!res.ok) return null;
            var user_data = await res.json();
            return user_data[0]
        } catch(err) {
            console.error('Fetch error:', err);
            return null;
        }
    }
    async get_user_storage(){
        const user = localStorage.getItem(LOCAL_STORAGE_KEY);
        if(!user) return null;
        var user_data = await JSON.parse(user);
        return user_data;
    }
    remove_user_storage(){ localStorage.removeItem(LOCAL_STORAGE_KEY); }
    set_user_storage(user_data){ localStorage.setItem(LOCAL_STORAGE_KEY, user_data); }
    display_user(){ console.log(`${this.first_name} ${this.last_name} ${this.id}`); }
}

export { User, API_URL, USER_ID, LOCAL_STORAGE_KEY };