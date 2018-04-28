/**
 * 2018-04-28 Jifeng Cheng
 * 添加 unique 方法
 */

'use strict';

const knex = require('knex')({
  client: 'mysql',
});

module.exports = {
  * unique(app, table, name) {
    const uniqueName = knex.schema.alterTable(table, function(t) {
      t.unique(name);
    });
    yield app.mysql.query(uniqueName.toString());
  },
};
