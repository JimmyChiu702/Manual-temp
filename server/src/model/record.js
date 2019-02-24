const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginRecordSchema = new Schema({
    userID: { type: String, required: true },
    departmentName: { type: String, required: true },
    loginTime: { type: Date, default: Date.now }
});

const LoginRecord = mongoose.model('LoginRecord', loginRecordSchema);

async function recordLoginInfo(userInfo) {
    if (userInfo.userID != 'admin') {
        try {
            var newRecord = new LoginRecord({
                userID: userInfo.userID,
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
    departmentName: { type: String, required: true },
    articleText: { type: String, required: true },
    sectionText: { type: String, default: '--'},
    chapterText: { type: String, default: '--' },
    time: { type: Date, default: Date.now }
});

const ArticleHitRecord = mongoose.model('ArticleHitRecord', articleHitRecordSchema);

async function recordArticleHitInfo(userInfo, articleInfo) {
    try {
        var newRecord = new ArticleHitRecord({
            userID: userInfo.userID,
            departmentName: userInfo.departmentName,
            articleText: articleInfo.articleText,
            sectionText: articleInfo.sectionText != '' ? articleInfo.sectionText : '--',
            chapterText: articleInfo.chapterText
        });
        return await newRecord.save();
    } catch(err) {
        console.error(err);
    }
}

module.exports = {recordLoginInfo, recordArticleHitInfo};
/*
const Article = require('./content').Article;
const Section = require('./content').Section;
const Chapter = require('./content').Chapter;


function getUser() {
    var n = Math.ceil(Math.random() * 10);
    return `USER${n}`;
}

function getTime() {
    return new Date(1534000000000 + Math.random()*(1537200000000 - 1534000000000))
}

async function getArticle() {
    let article = await Article.findOne({}).skip(Math.floor(Math.random() * 93));
    let chText = (await Chapter.findById(article.chapterID, "chapterText")).chapterText;
    let seText = !!article.sectionID ? (await Section.findById(article.sectionID, "sectionText")).sectionText : '--';
    return {
        articleText: article.articleText,
        chapterText: chText,
        sectionText: seText
    };
}

async function recordArticle(name, articleInfo, time) {
    try {
        var newRecord = new ArticleHitRecord({
            userID: name,
            departmentName: name,
            articleText: articleInfo.articleText,
            sectionText: articleInfo.sectionText,
            chapterText: articleInfo.chapterText,
            time: time
        });
        return await newRecord.save();
    } catch(err) {
        console.error(err);
    }
}

async function recordLogin(name, time) {
    try {
        var newRecord = new LoginRecord({
            userID: name,
            departmentName: name,
            loginTime: time
        });
        await newRecord.save();
    } catch(err) {
        console.error(err);
    }
}

(async () => {
    for(let i=0; i<300; i++) {
        let name1 = getUser();
        let articleInfo = await getArticle();
        let time1 = getTime();
        await recordArticle(name1, articleInfo, time1);

        let name2 = getUser();
        let time2 = getTime();
        await recordLogin(name2, time2);

        console.log(i);
    }
    console.log('FINISHED!!!')
})();
*/