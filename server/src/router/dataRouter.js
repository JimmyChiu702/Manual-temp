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

router.get('/getLikeArticles/:part', async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.response.body = ctx.session.passport.user.like[ctx.params.part - 1];
});

router.post('/likeArticle/:articleID/:part', async (ctx, next) => {
    try {
        let userID = ctx.session.passport.user.userID;
        let updateOption = {$addToSet: {}};
        updateOption['$addToSet'][`like_${ctx.params.part}`] = ctx.params.articleID;
        let user = await User.findOneAndUpdate({userID: userID}, updateOption, {new: true});
        ctx.response.type = 'json';
        ctx.response.body = user[`like_${ctx.params.part}`];        
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
})

router.post('/dislikeArticle/:articleID/:part', async (ctx, next) => {
    try {
        let userID = ctx.session.passport.user.userID;
        let updateOption = {$pull: {}};
        updateOption['$pull'][`like_${ctx.params.part}`] = ctx.params.articleID;
        let user = await User.findOneAndUpdate({userID: userID}, updateOption, {new: true});
        ctx.response.type = 'json';
        ctx.response.body = user[`like_${ctx.params.part}`];
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
})

// Content
router.get('/document/:filename', async (ctx, next) => {
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

router.get('/getAllArticles/:part', async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.response.body = await contentModel.getAllArticles(ctx.params.part);
});

module.exports = router;