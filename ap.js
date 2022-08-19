console.log('Welcome to Note Maker')
let addnote = document.getElementById('addnote');
// console.log(addnote)
addnote.addEventListener('click',addNote)

function addNote()
{
    let textbox=document.getElementById('notemaker');
    // console.log(textbox)
    let notes=localStorage.getItem("notes",JSON.stringify("notes"))
    if(notes==null)
        inventory=[]
    else
        inventory=JSON.parse(notes)//convert to array
    if(textbox.value!='')
        inventory.push(textbox.value.trim())
    localStorage.setItem("notes",JSON.stringify(inventory))
    textbox.value=''
    display()
}
function display()
{
    let notes=localStorage.getItem("notes",JSON.stringify("notes"))
    let targetelem = document.getElementById('main-grid')
    console.log("targetElem ",targetelem)
    if(notes==null)
        inventory=[]
    else
        inventory=JSON.parse(notes)
    
    let html=''
    inventory.forEach(function(elem,index){
        html+=`<div class="child">
        <h5>Note. ${index+1}</h5>
        <p class="showtext">${elem}</p>
        <button class="deletenode" id="${index}" onclick="deletenode(this.node)">Delete Node</button>
    </div>    
            `
    })
    targetelem.innerHTML=html;
    if(inventory.length==0)
        targetelem.innerHTML=`<p class="showtext" style="font-size:1.4em;color:white;text-decoration:underline">Nothing to show</p>`
}
function deletenode(index)
{
    let notes=localStorage.getItem("notes",JSON.stringify("notes"))
    if(notes==null)
        inventory=[]
    else
        inventory=JSON.parse(notes)
    inventory.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(inventory));
    display()
}
let searchelem=document.getElementById('srch-btn');
console.log(searchelem)
searchelem.addEventListener('click',searchString)
function searchString()
{
    let targetElem=document.getElementById('box')
    let strToSearch=targetElem.value.toLowerCase()
    // console.log(strToSearch)
    let notecard=document.getElementsByClassName('child');
    // console.log(notecard)
    Array.from(notecard).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt)
        if(cardTxt.includes(strToSearch)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
}