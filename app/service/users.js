const Service = require('egg').Service;

class UsersService extends Service {
  constructor(ctx) {
    super(ctx)
    this.table = 'users'
  }
  async index() {
    const users = await this.app.mysql.select(this.table);
    return  users ;
  }

  async show(id) {
    const users = await this.app.mysql.get(this.table,{ id: id });
    return  users ;
  }

  async create(playload) {
    const result = await this.app.mysql.insert(this.table, playload );
    return result.affectedRows;
  }

  async update(id, row) {
    const options = {
      where: {
        id
      }
    };
   
    const result = await this.app.mysql.update(this.table, row, options);
    console.log(result)
    return result.affectedRows;
  }
}

module.exports = UsersService;

