// INDEX JS
console.log("Blog API");
const API_URL = "http://localhost:3000/";

async function fetch_data(){
    try{
        const res = await fetch(API_URL);
        if(!res.ok)return;
        const data = await res.json();
        console.log(data);
    }catch(err) {
        console.error("Error fetching data:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetch_data();
})