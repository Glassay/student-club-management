/**
 * 2018-04-20 Jifeng Cheng
 */

'use strict';

module.exports = app => {
  class Members extends app.Service {
    * getInfos() {
      let res;
      try {
        res = yield app.mysql.select('Member');
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return res;
    }

    * getInfo(data) {
      let res;
      try {
        res = yield app.mysql.select('Member', {
          limit: 7,
          offset: (data.data - 1) * 7,
        });
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return res;
    }

    * deleteInfo(params) {
      console.log('params>>>>>>>', params);
      console.log('id>>>>>>', params.id);
      try {
        yield app.mysql.delete('Member', { id: params.id });
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return 'success';
    }

    * updateInfo(params) {
      try {
        yield app.mysql.update('Member', params);
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return 'success';
    }

    * insertInfo(params) {
      try {
        yield app.mysql.insert('Member', params);
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return 'success';
    }
  }
  return Members;
};
