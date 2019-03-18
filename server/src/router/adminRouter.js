const koaRouter = require('koa-router');
const mongoose = require('mongoose');

const contentModel = require('../model/content');
const {getAllUsers, createUser, removeUser, modifyUser} = require('../model/user');

const router = new koaRouter();

// admin identity comfirm
router.all('/*', (ctx, next) => {
    if (ctx.isAuthenticated() && ctx.session.passport.user.userID == 'admin')
        return next();
    else 
        ctx.throw(400, 'Only adminastrator is allowed!');
})

// CONTENT MANAGEMENT
// Create
router.post('/create/chapter', async (ctx, next) => {
    const {chapterText, isOnlyArticle, part} = ctx.request.body;
    if (!chapterText) {
        ctx.throw(400, 'Chapter text is required !')
    }
    try {
        ctx.response.type = 'json';
        ctx.response.body = await contentModel.createChapter(chapterText, isOnlyArticle, part);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }

});

router.post('/create/section', async (ctx, next) => {
    const {chapterID, sectionText} = ctx.request.body;
    if (!sectionText || !chapterID) {
        ctx.throw(400, 'Section text is required !')
    }
    try {
        ctx.response.type = 'json';
        ctx.response.body = await contentModel.createSection(chapterID, sectionText);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
});

router.post('/create/article', async (ctx, next) => {
    const {articleText, chapterID, sectionID, level, part} = ctx.request.body.fields;
    const file = ctx.request.body.files.file;
    if (!articleText || !chapterID || !file || !part || !level) {
        ctx.throw(400, 'Article text, parent id, file, and part are required !');
    }
    try {
        ctx.response.type = 'json';
        ctx.response.body = await contentModel.createArticle(articleText, chapterID, sectionID, file.path, file.name, part, level);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
});

// Remove
router.post('/remove/chapter', async (ctx, next) => {
    const {chapterID, part} = ctx.request.body;
    if (!chapterID) {
        ctx.throw(400, 'Chapter id is required !');
    }
    try {
        ctx.response.type = 'json';
        ctx.response.body = await contentModel.removeChapter(chapterID, part);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
});

router.post('/remove/section', async (ctx, next) => {
    const {sectionID} = ctx.request.body;
    if (!sectionID) {
        ctx.throw(400, 'Section id is required !');
    }
    try {
        ctx.response.type = 'json';
        ctx.response.body = await contentModel.removeSection(sectionID);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message)
    }
});

router.post('/remove/article', async (ctx, next) => {
    const {articleID} = ctx.request.body;
    if (!articleID) {
        ctx.throw(400, 'Article ID is required !');
    }
    try {
        ctx.response.type = 'json';
        ctx.response.body = await contentModel.removeArticle(articleID);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
});

// Modify
router.post('/modify/chapter', async (ctx, next) => {
    const {chapterID, newChapterText, part} = ctx.request.body;
    if (!chapterID || !newChapterText) {
        ctx.throw(400, 'Chapter id and chapter text are required !');
    }
    try {
        ctx.response.type = 'json';
        ctx.response.body = await contentModel.modifyChapter(chapterID, newChapterText, part);
    } catch(err) {
        console.error(err);
        ctx.throw(400, qerr.message);
    }
});

router.post('/modify/section', async (ctx, next) => {
    const {sectionID, newSectionText} = ctx.request.body;
    if (!sectionID || !newSectionText) {
        ctx.throw(400, 'Section id and section text are required !');
    }
    try {
        ctx.response.type = 'json';
        ctx.response.body = await contentModel.modifySection(sectionID, newSectionText);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
});

router.post('/modify/article', async (ctx, next) => {
    const {articleID, articleText, level} = ctx.request.body.fields;
    const file = !! ctx.request.body.files.file ? ctx.request.body.files.file : null;
    console.log(ctx.request.body.fields)
    try {
        ctx.response.type = 'json';
        ctx.response.body = await contentModel.modifyArticle(articleID, articleText, file, level);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
});

// USER MANAGEMENT
// create user 
router.post('/create/user', async (ctx, next) => {
    const {userID, userName, password, departmentID, departmentName} = ctx.request.body;
    if (!userID || !departmentName || !password)
        ctx.throw(400, 'userID , department name ,and password text are required !');
    try {
        ctx.response.type = 'json';
        ctx.response.body = await createUser(userID, userName, password, departmentID, departmentName);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
});

// remove user
router.post('/remove/user', async (ctx, next) => {
    const {user_id} = ctx.request.body;
    if (!user_id)
        ctx.throw(400, 'User_id is required !');
    try {
        ctx.response.type = 'json';
        ctx.response.body = await removeUser(user_id);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
});

// modify user
router.post('/modify/user', async (ctx, next) => {
    const {user_id, userID, userName, password, departmentID, departmentName} = ctx.request.body;
    if (!user_id || (!userID && !userName && departmentID && !departmentName && !password))
        ctx.throw(400, 'User_id, userID, department name, and password are required !');
    try {
        ctx.response.type = 'json';
        ctx.response.body = await modifyUser(user_id, userID, userName, password, departmentID, departmentName);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
})

// get all users
router.get('/getAllUsers', async (ctx, next) => {
    try {
        ctx.response.type = 'json';
        ctx.response.body = await getAllUsers();
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
});

module.exports = router;