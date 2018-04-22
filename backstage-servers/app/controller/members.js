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

    * updateIndo() {
      console.log(this.ctx.request.body);
      this.ctx.body = yield this.service.members.updateIndo(this.ctx.request.body);
    }
  }
  return MembersController;
};
