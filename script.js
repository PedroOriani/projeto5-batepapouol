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

    getDatas();
}

function nomeErro(resp){
    console.log(resp.response.status);
    if (resp.response.status === 400){
        alert ('Utilize outro nome, este ja esta sendo utilizado');
        AccessServer()
    }
}

setInterval(AccessServer(),5000);
//------------------------------------------------------------------------------------------------------

// RESGATANDO AS MENSAGENS DO SERVIDOR

function getDatas(){

    const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/participants');
    promise.then( getOK );
    promise.catch( getErro );

}

function getOK(resp){
    console.log(resp.status);
    console.log(resp.statusText);
    console.log('Dados requisitados com sucesso');
}

function getErro(resp){
    console.log(resp.response.status);
}
