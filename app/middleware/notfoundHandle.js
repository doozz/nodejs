module.exports = app => {
    return async function (ctx, next) {
        await next();
        if (ctx.status === 404 && !ctx.body) {
            ctx.redirect(`/index`);
        }
    }
};