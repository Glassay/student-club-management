/**
 * 2018-05-02 Jifeng Cheng
 */

'use strict';

module.exports = app => {
  class Activities extends app.Service {
    * insertInfo(params) {
      try {
        yield app.mysql.insert('Club', params);
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return 'success';
    }

    * deleteInfo(params) {
      try {
        yield app.mysql.delete('Club', { id: params.id });
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return 'success';
    }

    * updateInfo(params) {
      try {
        yield app.mysql.update('Club', params);
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return 'success';
    }

    * selectInfo() {
      let res;
      try {
        res = yield app.mysql.select('Club');
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return res;
    }
  }
  return Activities;
};
