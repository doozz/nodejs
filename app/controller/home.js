'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx)
  }
  async index() {
    const { ctx, service } = this
    ctx.helper.resp(ctx, 'hello word')
  }
}

module.exports = HomeController;
