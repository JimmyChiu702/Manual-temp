import axios from 'axios';

// get user information
export function getUserInfo() {
    let url = `/getUserInfo`;
    console.log(`[GET] ${url}`);
    return axios.get(url).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function getChapters(part) {
    let url = `/getChapters/${part}`;
    console.log(`[GET] ${url}`);
    return axios.get(url).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function getSections(chapterID) {
    let url = `/getSections/${chapterID}`;
    console.log(`[GET] ${url}`);
    return axios.get(url).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function getArticles(parentID=null) {
    let url = `/getArticles/${parentID}`;
    console.log(`[GET] ${url}`);
    return axios.get(url).then(res => {
        if (res.status !== 200)
            throw new Error(`Unnexpected response code: ${res.status}`);
        return res.data;
    });
}