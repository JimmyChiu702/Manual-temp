const koaRouter = require('koa-router');

const fs = require('fs');
const path = require('path');

const contentModel = require('../model/content');
const {getAllUsers, createUser, removeUser, modifyUser, createUserCsv} = require('../model/user');

const router = new koaRouter();

// admin identity comfirm
router.all('/*', (ctx, next) => {
    if (ctx.isAuthenticated() && ctx.session.passport.user.userID == 'admin')
        return next();
    else 
        ctx.throw(400, 'Only adminastrator is allowed!');
});

// CONTENT MANAGEMENT
// Chapter Management
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

// Section Management
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

// Article Management
router.post('/create/article', async (ctx, next) => {
    const {articleText, chapterID, sectionID, level, part} = ctx.request.body.fields;
    const file = ctx.request.body.files.file;
    if (!articleText || !chapterID || !file || !part || !level) {
        ctx.throw(400, 'Article text, parent id, file, and part are required !');
    }
    try {
        const file = ctx.request.body.files.file;
        const filename = file.name;
        const oldFilePath = file.path;
        const newFilePath = path.resolve(__dirname, `../lib/documents/${filename}`);

        await new Promise((resolve, reject) => {
            fs.rename(oldFilePath, newFilePath, err => {
                if (err)
                    reject(err);
                resolve();     
            });
        });

        ctx.response.type = 'json';
        ctx.response.body = await contentModel.createArticle(articleText, chapterID, sectionID, filename, part, level);
    } catch(err) {
        ctx.throw(500, err.message);
        console.error(err);
    }
});

router.post('/modify/article', async (ctx, next) => {
    const {articleID, articleText, level} = ctx.request.body.fields;
    if (!articleID || (!articleText && !level))
        ctx.throw(400, 'Article ID, article text, and level are required');
    try {
        const file = ctx.request.body.files.file;
        const filename = file.name;
        const oldFilePath = file.path;
        const newFilePath = path.resolve(__dirname, `../lib/documents/${filename}`);

        await new Promise((resolve, reject) => {
            fs.rename(oldFilePath, newFilePath, err => {
                if (err)
                    reject(err);
                resolve();     
            });
        });

        ctx.response.type = 'json';
        ctx.response.body = await contentModel.modifyArticle(articleID, articleText, file, level);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
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

// Manage Articles via CSV
router.post('/ManageArticlesCSV', async (ctx, next) => {
    try {
        const file = ctx.request.body.files.file;
        const filename = file.name;
        const oldFilePath = file.path;
        const newFilePath = path.resolve(__dirname, `../lib/management_csv/${filename}`);

        await new Promise((resolve, reject) => {
            fs.rename(oldFilePath, newFilePath, err => {
                if (err)
                    reject(err);
                resolve();
            });
        });

        
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
})

// USER MANAGEMENT
// Create User 
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

// Modify User
router.post('/modify/user', async (ctx, next) => {
    const {user_id, userID, userName, password, departmentID, departmentName} = ctx.request.body;
    if (!user_id || (!userID && !userName && departmentID && !departmentName && !password))
        ctx.throw(400, 'User_id, userID, departmentID, department name, and password are required !');
    try {
        ctx.response.type = 'json';
        ctx.response.body = await modifyUser(user_id, userID, userName, password, departmentID, departmentName);
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
});

// Remove User
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

// Get Users
router.get('/getAllUsers', async (ctx, next) => {
    try {
        ctx.response.type = 'json';
        ctx.response.body = await getAllUsers();
    } catch(err) {
        console.error(err);
        ctx.throw(400, err.message);
    }
});

// Manage Users via CSV
router.post('/manageUsersCsv/:operation', async(ctx, next) => {
    try {
        const file = ctx.request.body.files.userList;
        const filename = file.name;
        const oldFilePath = file.path;
        const newFilePath = path.resolve(__dirname, `../lib/management_csv/${filename}`);
        
        await new Promise((resolve, reject) => {
            fs.rename(oldFilePath, newFilePath, err => {
                if (err)
                    reject(err);
                resolve();
            });
        });
        
        ctx.type = 'json';
        ctx.body = await createUserCsv(newFilePath, ctx.params.operation);
    } catch(err) {
        ctx.throw(500);
        console.error(err);
    }
});

module.exports = router;