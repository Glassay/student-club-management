/**
 * 2018-04-19 Jifeng Cheng
 */

'use strict';

module.exports = app => {
  class UsersController extends app.Controller {
    * login() {
      console.log(this.ctx.request.body);
      this.ctx.body = yield this.service.users.login(this.ctx.request.body);
    }
    * info() {
      console.log(this.ctx.request.body);
      this.ctx.body = yield this.service.users.info(this.ctx.request.body);
    }
  }
  return UsersController;
};
