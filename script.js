// ACESSANDO O SERVIDOR

axios.defaults.headers.common['Authorization'] = 'nIJrwyOIT5oxsFJibUerf5Vi';

const user= {}

user.name = prompt('Qual seu nome?');

function AccessServer(){

    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', user);
    promise.then( nomeOK );
    promise.catch( nomeErro );
}

function nomeOK(resp){
    console.log(resp.status);
    console.log(resp.statusText);
    console.log('Entrou no servidor com sucesso');

    getDatas()
}

function nomeErro(resp){
    console.log(resp.response.status);
    if (resp.response.status === 400){
        alert ('Utilize outro nome, este ja esta sendo utilizado');
        window.location.reload()
    }
}

setInterval(AccessServer(), 5000);
//------------------------------------------------------------------------------------------------------

let texts = [];

// RESGATANDO AS MENSAGENS DO SERVIDOR

function getDatas(){
setInterval(() => {

    const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promise.then( getOK );
    promise.catch( getErro );
    
}, 3000);

}

function getOK(resp){
    console.log(resp.status);
    console.log(resp.statusText);
    console.log('Dados requisitados com sucesso');
    console.log(resp.data);
    texts = resp.data;

    renderTexts()
}

function getErro(resp){
    console.log(resp.response.status);
}


function renderTexts(){

    const ulTexts = document.querySelector('.body-texts');
    ulTexts.innerHTML = '';

    for(let i = 0; i < texts.length; i++){

        if (texts[i].type === 'status'){
            ulTexts.innerHTML += `
            <li data-test="message" class ="message-box-status">
                <p class="break">
                    <span class="time">(${texts[i].time })</span> 
                    <span class="from">${texts[i].from }</span> 
                    <span class="text">${texts[i].text }</span> 
                </p>
            </li>        
            `; 
        }else if (texts[i].type === 'message'){
            ulTexts.innerHTML += `
            <li data-test="message" class ="message-box">
                <p class="break">
                    <span class="time">(${texts[i].time})</span> 
                    <span class="from">${texts[i].from}</span> para 
                    <span class="to">${texts[i].to}</span>: 
                    <span class="text">${texts[i].text}</span>
                </p>
            </li>        
            `; 
        }
        else if (texts[i].type === 'private'){
            ulTexts.innerHTML += `
            <li data-test="message" class ="message-box-private">
                <p class="break">
                    <span class="time">(${texts[i].time})</span> 
                    <span class="from">${texts[i].from}</span> reservadamente para 
                    <span class="to">${texts[i].to}: </span>
                    <span class="text">${texts[i].text}</span>
                <p>    
            </li>        
            `; 
        }
           
    }
}

const newMsg = {};

function newMessage(){
    const msg = document.querySelector('.input-message').value;

    newMsg.from = user.name;
    newMsg.to = "Todos"
    newMsg.text = msg
    newMsg.type = "message";

    console.log(newMsg)

    sendMessage();

    document.querySelector('.input-message').value = '';

}

function sendMessage(){
    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', newMsg);
    promise.then( msgOK );
    promise.catch( msgErro );
}

function msgOK(resp){
    console.log('Mensagem salva no servidor com sucesso');

    const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promise.then( get2OK );
}

function msgErro(resp){
    console.log(resp.response.status);
    window.location.reload()
}

function get2OK(resp){
    texts = resp.data;

    renderTexts()
}