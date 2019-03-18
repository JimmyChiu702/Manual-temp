const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginRecordSchema = new Schema({
    userID: { type: String, required: true },
    userName: { type: String, required: true },
    departmentName: { type: String, required: true },
    loginTime: { type: Date, default: Date.now }
});

const LoginRecord = mongoose.model('LoginRecord', loginRecordSchema);

async function recordLoginInfo(userInfo) {
    if (userInfo.departmentID != 'ADMIN') {
        try {
            var newRecord = new LoginRecord({
                userID: userInfo.userID,
                userName: userInfo.userName,
                departmentID: userInfo.departmentID,
                departmentName: userInfo.departmentName
            });
            await newRecord.save();
        } catch(err) {
            console.error(err);
        }
    }
}

const articleHitRecordSchema = new Schema({
    userID: { type: String, required: true },
    userName: { type: String, required: true },
    departmentID: { type: String, required: true },
    departmentName: { type: String, required: true },
    articleText: { type: String, required: true },
    sectionText: { type: String, required: true },
    chapterText: { type: String, required: true },
    time: { type: Date, default: Date.now }
});

const ArticleHitRecord = mongoose.model('ArticleHitRecord', articleHitRecordSchema);

async function recordArticleHitInfo(userInfo, articleInfo) {
    if (userInfo.departmentID != 'ADMIN') {
        try {
            var newRecord = new ArticleHitRecord({
                userID: userInfo.userID,
                userName: userInfo.userName,
                departmentID: userInfo.departmentID,
                departmentName: userInfo.departmentName,
                articleText: articleInfo.articleText,
                sectionText: articleInfo.sectionText,
                chapterText: articleInfo.chapterText
            });
            return await newRecord.save();
        } catch(err) {
            console.error(err);
        }
    }
}

module.exports = {recordLoginInfo, recordArticleHitInfo};