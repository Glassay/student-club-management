/**
 * 2018-04-19 Jifeng Cheng
 */

'use strict';

module.exports = app => {
  class Users extends app.Service {
    * login(param) {
      let res;
      console.log('param>>>>>', param);
      try {
        res = yield app.mysql.select('User', {
          where: { userName: param.userName },
        });
        console.log('res>>>>>>', res);
        if (param.password === res[0].password) {
          return res;
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
