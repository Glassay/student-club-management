/**
 * 2018-04-20 Jifeng Cheng
 */

'use strict';

const _ = require('lodash');

module.exports = app => {
  class Members extends app.Service {
    * getInfo() {
      console.log('keys>>>>>');
      let res;
      try {
        res = yield app.mysql.select('Member');
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return res;
    }
  }
  return Members;
};
