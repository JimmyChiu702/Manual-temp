import axios from 'axios';

const baseUrl = 'http://127.0.0.1';

// CONTENT MANAGEMENT
// create
export function createChapter(chapterText, isOnlyArticle, part) {
    let url = `/create/chapter`;
    console.log(`Create chapter with text: ${chapterText}`);
    return axios.post(url, {
        chapterText: chapterText, 
        isOnlyArticle: isOnlyArticle,
        part: part
    }).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    })
}

export function createSection(sectionText, chapterID) {
    let url = `/create/section`;
    console.log(`Create section with text: ${sectionText}`);
    return axios.post(url, {
        sectionText: sectionText,
        chapterID: chapterID
    }).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data; 
    });
}

export function createArticle(data) {
    let url = `/create/article`;
    console.log(data)
    return axios.post(url, data).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

// modify
export function modifyChapter(chapterID, newChapterText, part) {
    let url = `/modify/chapter`;
    return axios.post(url, {
        chapterID: chapterID,
        newChapterText: newChapterText,
        part: part
    }).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function modifySection(sectionID, newSectionText) {
    let url = `/modify/section`;
    return axios.post(url, {
        sectionID: sectionID,
        newSectionText: newSectionText
    }).then((res) => {
        console.log(res);
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function modifyArticle(data) {
    let url = `/modify/article`;
    return axios.post(url, data).then(res => {
        if (res.status !== 200) 
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

// remove
export function removeChapter(chapterID, part) {
    let url = `/remove/chapter`;
    return axios.post(url, {
        chapterID: chapterID,
        part: part
    }).then((res) => {
        if (res.status !== 200) 
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function removeSection(sectionID) {
    let url = `/remove/section`;
    return axios.post(url, {
        sectionID: sectionID
    }).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function removeArticle() {
    let url = `/remove/article`;
    return axios.post(url, {
        articleID: articleID
    }).then((res) => {
        if (res.stats !== 200) 
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

// USER MANAGEMENT
// get all users
export function getAllUsers() {
    let url = `/getAllUsers`;
    return axios.get(url).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

// signup
export function createUser(userID, departmentName, password) {
    let url = `/create/user`;
    return axios.post(url, {
        userID: userID,
        departmentName: departmentName,
        password: password
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function removeUser(user_id) {
    let url = `/remove/user`;
    return axios.post(url, {
        user_id: user_id
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function modifyUser(user_id, userID, departmentName, password) {
    let url = `/modify/user`;
    return axios.post(url, {
        user_id: user_id,
        userID: userID,
        departmentName: departmentName,
        password: password
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}