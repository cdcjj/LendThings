var path = require('path');
var knex = require('knex') ({
  client: 'mysql',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('urls', user => {
      user.increments('id').primary();
      user.string('username', 20).unique();
      user.string('password', 20)
    })
    .then(table => {
      console.log(`Created table: ${table}`);
    })
  }
});

db.knex.schema.hasTable('inventory').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('inventory', inventory => {
      inventory.increments('id').primary();
      inventory.string('name', 255);
      inventory.date('date');
      inventory.integer('amount');
      inventory.integer('user_id').unsigned();
      inventory.integer('category_id').unsigned();
      inventory.foreign('user_id').references('users.id');
      inventory.foreign('category_id').references('users.id');
    });
  }
});


db.knex.schema.hasTable('categories').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('categories', category => {
      category.increments('id').primary();
      category.string('name', 255);
    });
  }
});

db.knex.schema.hasTable('users_categories').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('users_categories', table => {
      table.increments().primary();
      table.integer('user_id').unsigned();
      table.integer('category_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.foreign('category_id').references('categories.id');
    });
  }
});

module.exports = db;
