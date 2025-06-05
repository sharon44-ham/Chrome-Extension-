let leads=[]
const inputEl = document.getElementById("input-el")
const saveEl = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-el")
const leadSaved = JSON.parse(localStorage.getItem("leads"))
if(leadSaved){
    leads = leadSaved
    render(leads)
}

let saved = document.getElementById("save-btn")
saved.addEventListener("click",function(){
    if(inputEl.value.trim() === ""){
        ulEl.textContent = "Please enter a valid input" 
    }else{
leads.push(inputEl.value)
inputEl.value = ""
localStorage.setItem("leads", JSON.stringify(leads))
render(leads)
}
})
let deleteEl = document.getElementById("delete-btn")
deleteEl.addEventListener("click", function() {
    localStorage.clear("leads")
    leads = []
    render(leads)
    ulEl.innerHTML = ""
})
let saveTab = document.getElementById("tab-btn")
saveTab.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        leads.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(leads))
        render(leads)
})})


function render(leads){
let listItems = " "
for(let i = 0 ; i<leads.length;i++){
    listItems += `<li style=list-style-type:none;>
        <a target="_blank" href="${leads[i]}"> 
            ${leads[i]} 
                </a>
                    </li>`
    ulEl.innerHTML = listItems
}}
