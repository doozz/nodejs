module.exports = app => {
    return async function (ctx, next) {
        try {
            await next();
        } catch(err){
            ctx.logger.error(err);
            ctx.helper.resp(ctx,err.message,500)  
        }
    }
  };

