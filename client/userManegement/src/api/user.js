import axios from 'axios';

export function getUser() {
    let url = '/getAllUsers';
    console.log(`GET: ${url}`);
    return axios.get(url).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function createUser(input) {
    let url = '/create/user';
    console.log(`POST: ${url}`);
    return axios.post(url, input).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function modifyUser(input) {
    let url = '/modify/user';
    console.log(`POST: ${url}`);
    return axios.post(url, input).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function removeUser(user_id) {
    let url = '/remove/user';
    console.log(`POST: ${url}`);
    return axios.post(url, {
        user_id: user_id
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}