// import {basePath, apiVersion} from './config';
import clienteAxios from '../config/axios';

export const signUpApi = async (data) => {
    console.log(data);

    try {
        const respuesta = await clienteAxios.post('api/usuarios', data);
        console.log(respuesta);
    } catch (error) {
        console.log(error);        
    }
}




// export function signUpApi(data){
//     // const url = `${basePath}/${apiVersion}/sign-up`;
//     const url = 'http://localhost:3977/api/v1/sign-up';
//     const params = {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-Type": "application/json"
//         },
//         mode: 'no-cors'
//     };


//     fetch(url, params).then((response) => {
//         console.log(response);
//         // return response.json();
//     })
//     // .then(result => {
//     //     console.log(result);
//     //     // if(result.user){
//     //     //     return result;
//     //     // }
//     //     // return false
//     // }).catch(err => {
//     //     return false
//     // })
// }