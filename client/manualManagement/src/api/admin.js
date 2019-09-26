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