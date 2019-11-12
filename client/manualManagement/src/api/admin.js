import axios from 'axios';

export function createChapter(chapterText, isOnlyArticle, part) {
    let url = `/create/chapter`;
    console.log(`[POST] ${url}`);
    return axios.post(url, {
        chapterText: chapterText,
        isOnlyArticle: isOnlyArticle,
        part: part
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function modifyChapter(chapterID, newChapterText, part) {
    let url = `/modify/chapter`;
    console.log(`[POST] ${url}`);
    return axios.post(url, {
        chapterID: chapterID,
        newChapterText: newChapterText,
        part: part
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function removeChapter(chapterID, part) {
    let url = `/remove/chapter`;
    console.log(`[POST] ${url}`);
    return axios.post(url, {
        chapterID: chapterID,
        part: part
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function createSection(sectionText, chapterID) {
    let url = `/create/section`;
    console.log(`[POST] ${url}`);
    return axios.post(url, {
        sectionText: sectionText,
        chapterID: chapterID
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function modifySection(sectionID, newSectionText) {
    let url = `/modify/section`;
    console.log(`[POST] ${url}`);
    return axios.post(url, {
        sectionID: sectionID,
        newSectionText: newSectionText
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function removeSection(sectionID) {
    let url = `/remove/section`;
    console.log(`[POST] ${url}`);
    return axios.post(url, {
        sectionID: sectionID
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function createArticle(data) {
    let url = `/create/article`;
    console.log(`[POST] ${url}`);
    return axios.post(url, data).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function modifyArticle(data) {
    let url = `/modify/article`;
    console.log(`[POST] ${url}`);
    return axios.post(url, data).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function removeArticle(articleID) {
    let url = `/remove/article`;
    console.log(`[POST] ${url}`);
    return axios.post(url, {
        articleID: articleID
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function csvUpload(data, action) {
    let url = `/manageContentCsv/${action}`;
    console.log(`[POST] ${url}`);
    return axios.post(url, data).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}