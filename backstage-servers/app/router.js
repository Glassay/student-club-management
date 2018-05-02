'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', 'users.login');
  router.get('/all', 'users.info');
  router.post('/getMembers', 'members.getInfos');
  router.post('/getMember', 'members.getInfo');
  router.post('/deleteMembers', 'members.deleteInfo');
  router.post('/updateMembers', 'members.updateInfo');
  router.post('/insertMembers', 'members.insertInfo');
};
