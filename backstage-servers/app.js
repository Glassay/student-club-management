/**
 * 2018-04-18 Jifeng Cheng
 */
'use strict';

const knex = require('knex')({
  client: 'mysql',
  // connection: {
  //   host: '127.0.0.1',
  //   user: 'root',
  //   password: '111111',
  //   database: 'studentClub',
  // },
});

module.exports = app => {
  app.beforeStart(function* () {
    const hasUser = yield app.mysql.query(knex.schema.hasTable('User').toString());
    if (hasUser.length === 0) {
      const studentClub = knex.schema.createTableIfNotExists('User', function(table) {
        table.increments();
        table.string('userName').notNullable().defaultTo('');
        table.string('password').notNullable().defaultTo('');
        table.boolean('jurisdiction').notNullable().defaultTo(0);
        table.string('club').notNullable().defaultTo('');
        table.timestamp('create_at').defaultTo(knex.fn.now());
        table.charset('utf8');
      });
      yield app.mysql.query(studentClub.toString());
    }

    const hasClub = yield app.mysql.query(knex.schema.hasTable('Club').toString());
    if (hasClub.length === 0) {
      const studentClub = knex.schema.createTableIfNotExists('Club', function(table) {
        table.increments();
        table.string('title').notNullable().defaultTo('');
        table.string('content').notNullable().defaultTo('');
        table.string('type').notNullable().defaultTo('');
        table.boolean('status').notNullable().defaultTo(false);
        table.integer('budget').notNullable().defaultTo(0);
        table.string('club').notNullable().defaultTo('');
        table.timestamp('create_at').defaultTo(knex.fn.now());
        table.charset('utf8');
      });
      yield app.mysql.query(studentClub.toString());
    }

    const hasMember = yield app.mysql.query(knex.schema.hasTable('Member').toString());
    if (hasMember.length === 0) {
      const studentClub = knex.schema.createTableIfNotExists('Member', function(table) {
        table.increments();
        table.bigInteger('studentNumber').notNullable().defaultTo(0);
        table.string('name').notNullable().defaultTo('');
        table.string('sex').notNullable().defaultTo('');
        table.string('class').notNullable().defaultTo('');
        table.string('club').notNullable().defaultTo('');
        table.string('level').notNullable().defaultTo(0);
      });
      yield app.mysql.query(studentClub.toString());
    }
  });
};
