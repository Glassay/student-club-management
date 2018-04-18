/**
 * 2018-04-18 Jifeng Cheng
 */
'use strict';

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '111111',
    database: 'studentClub',
  },
});

module.exports = app => {
  app.beforeStart(function* () {
    const hasUser = yield app.mysql.query(knex.schema.hasTable('User').toString());
    if (hasUser.length === 0) {
      const studentClub = knex.schema.createTableIfNotExists('User', function(table) {
        table.increments();
        table.string('user').notNullable().defaultTo('');
        table.string('password').notNullable().defaultTo('');
        table.string('header').notNullable().defaultTo('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png');
        table.timestamp('create_at').defaultTo(knex.fn.now());
        table.charset('utf8');
      });
      yield app.mysql.query(studentClub.toString());
    }
  });
};
