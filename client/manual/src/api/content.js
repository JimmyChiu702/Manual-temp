import axios from 'axios';

// get data
export function getChapters(part) {
    let url = `/getChapters/${part}`;
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

export function getAllArticles(part) {
    let url = `/getAllArticles/${part}`;
    console.log(`Making GET request to: ${url}`);
    return axios.get(url).then(res => {
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
export function getLikeArticles(part) {
    let url = `/getLikeArticles/${part}`;
    console.log(`Getting like articles`);
    return axios.get(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function likeArticle(articleID, isToLike, part) {
    let url;
    if (isToLike) {
        url = `/likeArticle/${articleID}/${part}`;
    } else {
        url = `/dislikeArticle/${articleID}/${part}`;
    }
    console.log(`Like article with ID: ${articleID}`);
    return axios.post(url).then((res) => {
        if (res.status !== 200) 
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}