let body = document.getElementsByTagName("body")[0]
let lightMode = localStorage.getItem("lightMode");
let toggleMode = document.querySelector("#toggleButton");
let toggleIcon = document.querySelectorAll(".toggleIcon")
let inputUser = document.getElementById('userName');
let submit = document.getElementById('submit');
let info = document.querySelectorAll(".info")
let notFound = document.querySelector(".show")
let socialLinks = document.querySelectorAll(".socialLinks")
let socials = document.querySelectorAll(".socials")
let mapObject = ["avatar_url", "name", "login", "created_at", "bio", "public_repos", "followers", "following", "location", "blog", "twitter_username", "company"]
let user;
let apiRquest;


////1) functions that interact with API
// request to Api
async function loadUser(){
    const response = await fetch(apiRequest)
    user = await response.json();
    user.message == "Not Found" ? notAvailabeFunction() : updateUser()   
}

// update the links attribute in html
const getLinks = () => {
    socialLinks.forEach((e,i)=>{
        socials[i].textContent != "not availabe" ? socialLinks[i].href += socials[i].textContent : "#n/a"
    })
}

// handle ampty fields when the object API has returned
const notAvailabeFunction = () => {
    notFound.classList.remove("show")
    setTimeout(()=>{
        notFound.classList.add("show")
    },2000)
}

// update all the user info
const updateUser = () => {
    info.forEach((e, i) => {
        if (e.classList.contains("link")){
            e.src = user[mapObject[i]];
            user[mapObject[i]] == null ? e.textContent == "not availabe" : e.textContent = user[mapObject[i]];
        } 
        else if (e.classList.contains("date")){
            let joinedDate = new Date(user[mapObject[i]]).toString().split(' ');
            e.textContent = `Joined ${joinedDate[2]} ${joinedDate[1]} ${joinedDate[3]}`
        } else {
            (user[mapObject[i]] == null || user[mapObject[i]] == "")? e.textContent = "not found" : e.textContent = user[mapObject[i]];
            e.textContent == "not found" ? e.classList.add("notAvailabe") : e.classList.remove("notAvailabe");
        }    
    })
    getLinks()
}

// fill the user name in the apy request string
const searchUser = () => {
    let userName = inputUser.value;
    apiRequest = `https://api.github.com/users/${userName}`;
    loadUser()
}


////2) below functions for UX format
//Dark/Light icon change
const updateIcon = () => {
    toggleIcon[0].classList.toggle("active");
    toggleIcon[0].classList.toggle("inactive");
    toggleIcon[1].classList.toggle("inactive");
    toggleIcon[1].classList.toggle("active");
}

// light/dark change format
const changeFont = () =>{
    body.classList.toggle("light-theme")
}

const updateFont = () =>{
    updateIcon()
    changeFont()
}


// change mode call two functions one change the dark/light mode, the other change the format.
const changeMode = () => {
    updateFont()  
    updateLocalStorage()
}


////3) below functions to keep light/dark mode save in the local storage
if(lightMode=="active"){
    updateFont() 
}
const updateLocalStorage = () =>{
    if(lightMode==null||lightMode=="inactive"){
        localStorage.setItem("lightMode", "active")
        lightMode == "active"
    } else {
        localStorage.setItem("lightMode", "inactive")
        lightMode == "inactive"
    }
}

////4) below click events
//click event to search for user
submit.addEventListener("click", searchUser);
//click event to change the format
toggleButton.addEventListener("click", changeMode);
