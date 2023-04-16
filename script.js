// ACESSANDO O SERVIDOR

axios.defaults.headers.common['Authorization'] = 'nIJrwyOIT5oxsFJibUerf5Vi';

const nome = {}

nome.name = prompt('Qual seu nome?');

function AccessServer(){

    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nome);
    promise.then( nomeOK );
    promise.catch( nomeErro );
}

function nomeOK(resp){
    console.log(resp.status);
    console.log(resp.statusText);
    console.log('Entrou no servidor com sucesso');

    setInterval(getDatas(),3000);
}

function nomeErro(resp){
    console.log(resp.response.status);
    if (resp.response.status === 400){
        alert ('Utilize outro nome, este ja esta sendo utilizado');
    }
}

setInterval(AccessServer(), 5000);
//------------------------------------------------------------------------------------------------------

let texts = [];

// RESGATANDO AS MENSAGENS DO SERVIDOR

function getDatas(){

    const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promise.then( getOK );
    promise.catch( getErro );

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
            <li class ="message-box-status">
                ${texts[i].time} ${texts[i].from} ${texts[i].text}
            </li>        
            `; 
        }else if (texts[i].type === 'message'){
            ulTexts.innerHTML += `
            <li class ="message-box">
                ${texts[i].time} ${texts[i].from} para ${texts[i].to}: ${texts[i].text}
            </li>        
            `; 
        }
        else if (texts[i].type === 'message'){
            ulTexts.innerHTML += `
            <li class ="message-box-private">
                ${texts[i].time} ${texts[i].from} reservadamente para ${texts[i].to}: ${texts[i].text}
            </li>        
            `; 
        }
           
    }
}
