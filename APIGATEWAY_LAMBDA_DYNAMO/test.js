const lambdaLocal = require('lambda-local');
const PHPSESSID_EVENT=require("./TestEvents/PHPSESSID.json")

var listaTest=[]
//Environment variables
var environment={
    foo:'bar',
}


const PHPSESSID= async()=>{
    //Limpiar el chiquero
    const response=await lambdaLocal.execute({
    event:PHPSESSID_EVENT,
    lambdaPath: 'PHPSESSID/index.js',
    profilePath: '~/.aws/credentials',
    profileName: 'default',
    environment,
    timeoutMs: 30000
});
listaTest=[...listaTest,(response)?"PASO TEST 1":`NO PASO TEST 1`]
}

PHPSESSID();

//CHEQUEO
const corroborar=()=>{for (var item of listaTest){
    console.log(item)
}
    console.log("-----------")
    setTimeout(corroborar,2000);
}

corroborar();