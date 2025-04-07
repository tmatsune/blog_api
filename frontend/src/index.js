import { User, API_URL } from "./js/user_state.js";
var current_user = new User();

async function conenct_to_backend(){
    try {
        const res = await fetch(API_URL);
        if(!res.ok)return;
        const data = await res.json();
        console.log(data.message);
    } catch(err) {
        console.error("Error fetching data:", err);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await conenct_to_backend();
        const fetched_user = await current_user.load_user();
        const user_name_tag = document.getElementsByClassName('user-name');
        if(fetched_user){
            user_name_tag[0].innerText = `Name: ${current_user.first_name} ${current_user.last_name}`;
        }else{
            user_name_tag[0].innerText = `Name: Not Found`;
        }
    } catch(err) {
        console.error("Error loading user data:", err);
    }

});