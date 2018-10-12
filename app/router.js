'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const checkstatus = app.middleware.checkstatus();

  router.get('/index', controller.home.index)
  router.resources('user', '/api/user', controller.v1.users)
};
