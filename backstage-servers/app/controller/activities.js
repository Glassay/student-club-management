/**
 * 2018-05-02 Jifeng Cheng
 */

'use strict';

module.exports = app => {
  class ActivitiesController extends app.Controller {
    * insertInfo() {
      console.log(this.ctx.request.body);
      this.ctx.body = yield this.service.activities.insertInfo(this.ctx.request.body);
    }

    * deleteInfo() {
      console.log(this.ctx.request.body);
      this.ctx.body = yield this.service.activities.deleteInfo(this.ctx.request.body);
    }

    * updateInfo() {
      console.log(this.ctx.request.body);
      this.ctx.body = yield this.service.activities.updateInfo(this.ctx.request.body);
    }

    * selectInfo() {
      console.log(this.ctx.request.body);
      this.ctx.body = yield this.service.activities.selectInfo(this.ctx.request.body);
    }
  }
  return ActivitiesController;
};
