/**
 * 2018-04-19 Jifeng Cheng
 */

'use strict';

module.exports = app => {
  class Users extends app.Service {
    * login(param) {
      let res;
      try {
        res = yield app.mysql.select('User', {
          where: { username: param.username },
        });
        if (param.password === res[0].password) {
          return 'success';
        }
        return false;
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
    }
    * info() {
      let res;
      try {
        res = yield app.mysql.select('User');
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return res;
    }
  }
  return Users;
};
