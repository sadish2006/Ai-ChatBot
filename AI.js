let prompt=document.querySelector("#prompt")
let chatcontainer=document.querySelector(".chat-container")
let circle=document.querySelector("#circle")
const Api="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDyHKhs6JqLwGzVZ63rOdUAjVHU3Eb06RU"

let user={
    data:null,
}

async function generateresponds(aichatbox) {
    let text= aichatbox.querySelector(".ai-chat-area")

    let Requestoption={
      method:"POST",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(
        {"contents":[{"parts":[{"text":user.data}
            ]
        }]
    })
}
try{
    let response= await fetch(Api,Requestoption)
    let data=await response.json()
    let apiresponds=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
    text.innerHTML=apiresponds
}
catch(error){
    console.log(error)
}
finally{
    chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})
}
}





function createchatbox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div
}

function handlechatresponds(message){
     user.data=message
    let html=` <img src="user.jpeg" alt="" id="userImage" width="50">
            <div class="user-chat-area">
             ${user.data}
            </div>`
    prompt.value=""
    let userchatbox=createchatbox(html,"user-chat-box")
    chatcontainer.appendChild(userchatbox)
    chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})
    setTimeout(()=>{
       let html=` <img src="ai.jpeg" alt="" id="aiImage" width="50">
        <div class="ai-chat-area">
            loading...
        </div>`
        let aichatbox=createchatbox(html,"ai-chat-box")
        chatcontainer.appendChild(aichatbox)
        generateresponds(aichatbox)

    },600)

 }

prompt.addEventListener("keydown",(e)=>{
    if (prompt.value!=""){
        if (e.key=="Enter"){
        handlechatresponds(prompt.value)
    }}
})

circle.addEventListener("click",()=>{
    if (prompt.value!=""){
    handlechatresponds(prompt.value)
    }
})
