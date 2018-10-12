'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
    constructor(ctx) {
        super(ctx);
        this.UserCreateTransfer = {
            name: {type: 'string', required: true, allowEmpty: false},
            age: {type: 'string', required: true, allowEmpty: false},
        }

        this.UserUpdateTransfer = {
            name: {type: 'string', required: false},
            age: {type: 'string', required: false},    
        }
    }
    async index() {
        const { ctx, service } = this
        const res = await service.users.index()
        ctx.helper.resp(ctx, res)  
    }

    async show() {
        const { ctx, service } = this
        const { id } = ctx.params
        const res = await service.users.show(id)
        ctx.helper.resp(ctx, res)  
    }

    async update() {
        const { ctx, service } = this 
        // 校验参数
        ctx.validate(this.UserUpdateTransfer)
        const {id}  = ctx.params
        const payload = ctx.request.body || {}
        const res = await service.users.update(id, payload)  


        if (res !== 1) {
            ctx.helper.resp(ctx, '修改失败', 500)      
        }
        ctx.helper.resp(ctx, '修改成功') 
    }

    async create() {
        const { ctx, service } = this
        // 校验参数
        ctx.validate(this.UserCreateTransfer)
        const payload = ctx.request.body || {}
        const res = await service.users.create(payload);
        if (res !== 1) {
            ctx.helper.resp(ctx, '添加失败', 500)      
        }
        ctx.helper.resp(ctx, '添加成功')      
    }

    async destroy() {
        const { ctx, service } = this
        // 校验参数
        const id  = ctx.params
        const res = await service.users.destroy(id);
        if (res !== 1) {
            ctx.helper.resp(ctx, '删除失败', 500)      
        }
        ctx.helper.resp(ctx, '删除成功')      
    }
}

module.exports = UsersController;