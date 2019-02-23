const koaRouter = require('koa-router');
const send = require('koa-send');

const User = require('../model/user.js').User;
const contentModel = require('../model/content.js');
const recordArticleHitInfo = require('../model/record.js').recordArticleHitInfo;

const router = new koaRouter();

const path = require('path');
const fileDirPath = path.resolve(__dirname, '../lib/document');

router.get('/getUserInfo', async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.response.body = ctx.session.passport.user;
});

router.get('/getLikeArticles', async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.response.body = ctx.session.passport.user.like;
});

router.post('/likeArticle/:articleID', async (ctx, next) => {
    try {
        let userID = ctx.session.passport.user.userID;
        let user = await User.findOneAndUpdate({userID: userID}, {$addToSet: {like: ctx.params.articleID}}, {new: true});
        ctx.response.type = 'json';
        ctx.response.body = user.like;
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
})

router.post('/dislikeArticle/:articleID', async (ctx, next) => {
    try {
        let userID = ctx.session.passport.user.userID;
        let user = await User.findOneAndUpdate({userID: userID}, {$pull: {like: ctx.params.articleID}}, {new: true});
        ctx.response.type = 'json';
        ctx.response.body = user.like;
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
})

// Content
router.get('/document/:filename', async (ctx, next) => {
    var filename = ctx.params.filename;
    if (Object.keys(ctx.request.query).length > 0) {
        try {
            recordArticleHitInfo(ctx.session.passport.user, ctx.request.query);
        } catch(err) {
            console.error(err);
        }  
    }
    await send(ctx, ctx.params.filename, {root: fileDirPath});
});

router.get('/getChapters/:part', async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.response.body = await contentModel.getChapters(ctx.params.part);
});

router.get('/getSections/:chapterID', async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.response.body = await contentModel.getSections(ctx.params.chapterID);
});

router.get('/getArticles/:parentID', async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.response.body = await contentModel.getArticles(ctx.params.parentID);
});

router.get('/getAllArticles', async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.response.body = await contentModel.getArticles();
});

// Retrieval

module.exports = router;