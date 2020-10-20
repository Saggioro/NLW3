import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.10:3333'
    // emulador:  adb reverse tcp:3333 tcp:3333 -- rodar esse comando para utilizar o localhost
    // localhost do device fisico não será localhost:3333
    // deve-se utilizar o ip da maquina em que a API está rodando, ex:http://192.168.0.10:3333
});

export default api;