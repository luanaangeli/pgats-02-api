import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 1,
    //duration: '10s'
    iterations: 1

};

export default function() {
    let resLogin = http.post(
        'http://localhost:3000/users/login', 
        JSON.stringify({
            username: 'Margarete', 
            password: '123456'
        }),
        {
            headers: {
                'Content-Type': 'application/json'

            }
    });
 //console.log(resLogin.json('token'))

    let resTransfer = http.post(
        'http://localhost:3000/transfers', 
        JSON.stringify({
            from: 'Margarete',  
            to: 'Paulo',
            value: 300
        }),
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resLogin.json('token')}`
            

            }
    });
 //console.log(resTransfer)

    check(resTransfer, {
        'retorno da transferencia deve ser igual a 201': (res) => res.status === 201

    });
    



    sleep(1);
}