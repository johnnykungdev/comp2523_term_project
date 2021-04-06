const is_heroku = process.env.IS_HEROKU || false;
const dbConfigHeroku =
  "mysql://b2f37b099fd578:281dc4a2@us-cdbr-east-03.cleardb.com/heroku_6ce3521612a0a7d";
const dbConfigLocal = "mysql://root:xraptorl@localhost/oop_term_project";
if (is_heroku) {
  var databaseConnectionString = dbConfigHeroku;
} else {
  var databaseConnectionString = dbConfigLocal;
}
module.exports = databaseConnectionString;
