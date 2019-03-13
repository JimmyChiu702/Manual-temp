import axios from 'axios';

export function submit() {

}

export function getUserInfo() {
    let url = '/getUserInfo';
    console.log('Getting user information');
    return axios.get(url).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    })
}