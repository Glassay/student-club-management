/**
 * 2018-04-20 Jifeng Cheng
 */

'use strict';

module.exports = app => {
  class MembersController extends app.Controller {
    * getInfo() {
      console.log(this.ctx.request.body);
      this.ctx.body = yield this.service.members.getInfo(this.ctx.request.body);
    }

    * deleteInfo() {
      console.log(this.ctx.request.body);
      this.ctx.body = yield this.service.members.deleteInfo(this.ctx.request.body);
    }

    * updateInfo() {
      console.log(this.ctx.request.body);
      this.ctx.body = yield this.service.members.updateInfo(this.ctx.request.body);
    }

    * insertInfo() {
      console.log(this.ctx.request.body);
      this.ctx.body = yield this.service.members.insertInfo(this.ctx.request.body);
    }
  }
  return MembersController;
};
