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
    kind: { type: Number, default: 1 }          // 0=>head, 1=>content, 2=>tail
});
const Chapter = mongoose.model('Chapter', chapterSchema);

async function createChapter(chapterText, isOnlyArticle, kind = 1){
    try {
        var newChapter = new Chapter({
            chapterText: chapterText,
            isOnlyArticle: isOnlyArticle,
            kind: kind
        });
        await newChapter.save();
        return await getChapters();    
    } catch(err) {
        throw err;
    }
}

async function removeChapter(chapterID){
    try {
        await Chapter.findByIdAndDelete(chapterID);
        return await getChapters();
    } catch(err) {
        throw err;
    }
}

async function modifyChapter(chapterId, newChapterText){
    try {
        await Chapter.findByIdAndUpdate(chapterId, {chapterText: newChapterText});
        return await getChapters();
    } catch(err) {
        throw err;
    }
}

async function getChapters(){
    try {
        return await Chapter.find({}, null, {sort: {createdDate: 1}});
    } catch(err) {
        throw err;
    }
}

// Section operations
const sectionSchema = new Schema({
    sectionText: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    chapterID: { type: String, required: true }
});
const Section = mongoose.model('Section', sectionSchema);

async function createSection(chapterID, sectionText){
    try {
        var newSection = new Section({
            sectionText: sectionText,
            chapterID: chapterID
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
    level: {type: String, default: null}
});
const Article = mongoose.model('Article', articleSchema);

async function createArticle(articleText, chapterID, sectionID, uploadFilePath, uploadFileName, level = null){
    try {
        await uploadFile(uploadFilePath, documentDirPath);
        var newArticle = {
            articleText: articleText,
            chapterID: chapterID,
            sectionID: sectionID,
            filename: uploadFileName,
            level: level
        };
        return await newArticle.save();
    } catch(err) {
        throw err;
    }
}

async function createArticleWithoutFile(articleText, parentID, uploadFileName, level = null) {
    try {
        var newArticle = new Article({
            articleText: articleText,
            parentID: parentID,
            filename: uploadFileName,
            level: level
        });
        return await newArticle.save();
    } catch(err) {
        throw err;
    }
}

async function removeArticle(articleID){
    try {
        let articleToRemove = await Article.findById(articleID);
        fs.unlinkSync(`${uploadPath}${articleToRemove.filename}`);
        return await Article.findByIdAndDelete(articleID);
    } catch(err) {
        throw err;
    }
}

async function modifyArticle(articleID, newArticleText, uploadFilePath, uploadFileName, level){
    try {
        if (uploadFileName != null) {
            await Article.uploadFile(uploadFilePath, documentDirPath);
            return await Article.findByIdAndUpdate(articleID, {articleText: newArticleText, filename: uploadFileName, lastModifiedDate: Date.now, level: level}); 
        } else {
            return await Article.findByIdAndUpdate(articleID, {articleText: newArticleText});
        }
    } catch(err) {
        throw err;
    }
}

async function getArticles(parentID = null){
    try {
        if (parentID)
            return await Article.find({parentID: parentID}, null, {sort: {createdDate: 1}});
        else 
            return await Article.find({}, null, {sort: {createdDate: 1}});
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
    createArticleWithoutFile,
    removeArticle,
    modifyArticle,
    getArticles,
    Article,
    Chapter,
    Section
};