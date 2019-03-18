import axios from 'axios';

export function submit(userInfo, isHelpful, opinion, answer) {
    let url = '/submit';
    console.log('Submitting user answer');
    return axios.post(url, {
        userInfo: userInfo,
        isHelpful: isHelpful,
        opinion: opinion,
        answer: answer
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
    });
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