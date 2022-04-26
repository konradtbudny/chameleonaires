const models = require('./models');

module.exports = {
  ...models,
};
/*
To-check:
1) Check client settings. (functions in init_db.js does not seems to be running despite calling)
2)  Check double check queries
3) Check the order of dropping and creating tables(is cascade needed?)
*/