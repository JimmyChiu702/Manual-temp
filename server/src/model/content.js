const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const path= require('path');
const documentDirPath = path.resolve(__dirname, '../lib/document');

// Chapter operations
const chapterSchema = new Schema({
    chapterText: { type: String, required: true },      
    isOnlyArticle: Boolean,                             // if thfe chapter contains only articles, not any section
    createdDate: { type: Date, default: Date.now },
    kind: { type: Number, default: 1 },                 // 0=>head, 1=>content, 2=>tail
    part: { type: Number, default: 1, required: true },                 // indicating which part of content if belongs to
    index: { type: Number, required: true }
});
const Chapter = mongoose.model('Chapter', chapterSchema);

async function createChapter(chapterText, isOnlyArticle, part, kind = 1){
    try {
        var chapterNum = await Chapter.count({part: part});
        console.log(chapterNum)
        var newChapter = new Chapter({
            chapterText: chapterText,
            isOnlyArticle: isOnlyArticle,
            kind: kind,
            part: part,
            index: chapterNum - 1
        });
        await newChapter.save();
        return await getChapters(part);    
    } catch(err) {
        throw err;
    }
}

async function removeChapter(chapterID, part){
    try {
        await Chapter.findByIdAndDelete(chapterID);
        return await getChapters(part);
    } catch(err) {
        throw err;
    }
}

async function modifyChapter(chapterId, newChapterText, part){
    try {
        await Chapter.findByIdAndUpdate(chapterId, {chapterText: newChapterText});
        return await getChapters(part);
    } catch(err) {
        throw err;
    }
}

async function getChapters(part){
    try {
        return await Chapter.find({part: part}, null, {sort: {createdDate: 1}});
    } catch(err) {
        throw err;
    }
}

// Section operations
const sectionSchema = new Schema({
    sectionText: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    chapterID: { type: String, required: true },
    index: { type: Number, required: true }
});
const Section = mongoose.model('Section', sectionSchema);

async function createSection(chapterID, sectionText){
    try {
        var sectionNum = await Section.count({chapterID: chapterID});
        var newSection = new Section({
            sectionText: sectionText,
            chapterID: chapterID,
            index: sectionNum
        });
        await newSection.save();
        return await getSections(chapterID);
    } catch(err) {
        throw err;
    }
}

async function removeSection(sectionID){
    try {
        let removed = await Section.findByIdAndDelete(sectionID);
        return await getSections(removed.chapterID);
    } catch(err) {
        throw err;
    }
}

async function modifySection(sectionID, newSectionText){
    try {
        let modified = await Section.findByIdAndUpdate(sectionID, {sectionText: newSectionText});
        return await getSections(modified.chapterID);
    } catch(err) {
        throw err;
    }
}

async function getSections(chapterID){
    try {
        return await Section.find({chapterID: chapterID}, null, {sort: {createdDate: 1}});
    } catch(err) {
        throw err;
    }
}

// Article operations
const articleSchema = new Schema({
    articleText: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    parentID: { type: String, default: null},
    chapterID: {type: String, required: true, default: null},
    sectionID: {type: String, required: false, default: null},
    filename: { type: String, required: true },
    lastModifiedDate: { type: Date, default: Date.now },
    level: {type: String, default: null},
    part: { type: Number, required: true },
    index: { type: Number, required: true }
});
const Article = mongoose.model('Article', articleSchema);

async function createArticle(articleText, chapterID, sectionID, uploadFileName, part, level){
    try {
        var parentID = sectionID == '' ? chapterID : sectionID;
        var articleNum = await Article.count({parentID: parentID});
        var newArticle = new Article({
            articleText: articleText,
            parentID: parentID,
            chapterID: chapterID,
            sectionID: sectionID,
            filename: uploadFileName,
            level: level!='none'?level:none,
            index: articleNum,
            part: part
        });
        await newArticle.save();
        return await getArticles(parentID);
    } catch(err) {
        console.error(err)
        throw err;
    }
}

async function removeArticle(articleID){
    try {
        let articleToRemove = await Article.findById(articleID);
        await Article.findByIdAndDelete(articleID);
        return await getArticles(articleToRemove.parentID)
    } catch(err) {
        throw err;
    }
}

async function modifyArticle(articleID, newArticleText, file, level){
    try {
        var doc = {};
        if (file != null) {
            doc['filename'] = file.name;
            doc['lastModifiedDate'] = Date.now();
        }
        if (!!newArticleText)
            doc['articleText'] = newArticleText;
        if (!!level || level == '') 
            doc['level'] = level;
        let modified = await Article.findByIdAndUpdate(articleID, doc);
        return getArticles(modified.parentID);
    } catch(err) {
        throw err;
    }
}

async function getArticles(parentID = null){
    try {
        if (parentID)
            return await Article.find({parentID: parentID}, null, {sort: {level: 1, _id: 1}});
        else 
            return await Article.find({}, null, {sort: {level: 1, _id: 1}});
        } catch(err) {
            throw err;
    }
}

async function getAllArticles(part = null) {
    try {
        if (part)
            return await Article.find({part: part},  null, {sort: {level: 1, _id: 1}});
        else
            return await Article.find({},  null, {sort: {level: 1, _id: 1}});
    } catch(err) {
        throw err;
    }
}

function uploadFile(oldPath, newPath){
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, err => {
            if (err) reject(err);
            resolve();
        });
    });
}

// for debugging
async function asyncForEach(arr, callback) {
    for (let el of arr) {
        await callback(el);
    }
}

async function printAll() {
    let chs = await getChapters();
    asyncForEach(chs, async (ch) => {
        console.log(ch.chapterText, ch._id);
        if (ch.isOnlyArticle) {
            let ars = await getArticles(ch._id);
            await asyncForEach(ars, async (ar) => {await console.log(`\t${ar.articleText} ${ar.chapterID}`);});
        } else {
            let ses = await getSections(ch._id);
            await asyncForEach(ses, async (se) => {
                console.log(`\t${se.sectionText}`, se._id);
                let ars = await getArticles(se._id);
                await asyncForEach(ars, async (ar) => {await console.log(`\t\t${ar.articleText} ${ar.sectionID} ${ar.chapterID}`);});
            })
        }
    })
}

module.exports = {
    createChapter, 
    removeChapter,
    modifyChapter,
    getChapters,
    createSection,
    removeSection,
    modifySection,
    getSections,
    createArticle,
    removeArticle,
    modifyArticle,
    getArticles,
    getAllArticles,
    Article,
    Chapter,
    Section
};