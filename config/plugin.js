'use strict';

// had enabled by egg
// exports.static = true;
exports.validate = {
  enable: true,
  package: 'egg-validate',
}

// exports.cors = {
//   enable: false,
//   package: 'egg-cors',
// }

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
}

// exports.jwt = {
//   enable: true,
//   package: 'egg-jwt',
// }

exports.redis = {
  enable: true,
  package: 'egg-redis',
}