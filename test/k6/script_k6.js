import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 10,
    duration: '20s',
    //iterations: 1
    thresholds: {
        http_req_duration: ['p(90)<=2', 'p(95)<=3'],
        http_req_failed: ['rate<0.01']
    }

};

export default function() {
    let resLogin = http.post(
        'http://localhost:3000/users/login', 
        JSON.stringify({
            username: 'Paulo', 
            password: '123456'
        }),
        {
            headers: {
                'Content-Type': 'application/json'

            }
    });


    let resTransfer = http.post(
        'http://localhost:3000/transfers', 
        JSON.stringify({
            from: 'Paulo',  
            to: 'Margarete',
            value: 1
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