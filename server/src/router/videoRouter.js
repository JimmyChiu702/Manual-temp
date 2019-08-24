const koaRouter = require('koa-router');
const router = new koaRouter();
const path = require('path');
const fs = require('fs');

router.get('/workshop/video/:videoName', (ctx, next) => {
    const videoPath = path.resolve(__dirname, `../lib/video/${ctx.params.videoName}`);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = ctx.request.header.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunkSize = (end-start)+1;
        const file = fs.createReadStream(videoPath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes'
        }
        ctx.response.status = 206;
        ctx.response.set(head);
        ctx.response.type = 'video/mp4';
        ctx.response.length = chunkSize;
        ctx.response.body = file;
    } else {
        ctx.response.status = 200;
        ctx.response.type = 'video/mp4';
        ctx.response.body = fs.createReadStream(videoPath);
    }
});

module.exports = router;