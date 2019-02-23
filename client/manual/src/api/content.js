import axios from 'axios';

const baseUrl = 'http://127.0.0.1';

// get data
export function getChapters() {
    let url = `/getChapters`;
    console.log(`Making GET request to: ${url}`);
    return axios.get(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function getSections(chapterID) {
    let url = `/getSections/${chapterID}`;
    console.log(`Making GET request to: ${url}`);
    return axios.get(url).then((res) => {
        if (res.status !== 200) 
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function getArticles(parentID = null) {
    let url = parentID ? `/getArticles/${parentID}` : `/getAllArticles`;
    console.log(`Making GET request to: ${url}`);
    return axios.get(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function getUserInfo() {
    let url = `/getUserInfo`;
    console.log('Getting user information');
    return axios.get(url).then((res) => {
        if (res.status !== 200) 
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

// like operations
export function getLikeArticles() {
    let url = `/getLikeArticles`;
    console.log(`Getting like articles`);
    return axios.get(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function likeArticle(articleID, isToLike) {
    let url;
    if (isToLike) {
        url = `/likeArticle/${articleID}`;
    } else {
        url = `/dislikeArticle/${articleID}`;
    }
    console.log(`Like article with ID: ${articleID}`);
    return axios.post(url).then((res) => {
        if (res.status !== 200) 
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}