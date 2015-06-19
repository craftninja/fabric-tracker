# README

This is a project using Express, PostgreSQL, Bookshelf and Knex. Implemented functionality only extends to "Read" (index view, no show view) of the CRUD cycle. Feel free to fork and clone and implement functionality for Create, rest of read (show page), Update, and Delete.

This app is ready to deploy to Heroku. Please read rest of README to understand how this app came together and was deployed.

### Get this party started

1. Fork, clone, npm install
1. Create database in PostgreSQL
  * `$ psql -d postgres`
  * `=# CREATE DATABASE fabric_tracker;`
1. Copy `.env.example` to `.env` and add your connection string (probably just `postgres://localhost/fabric_tracker`)
1. Migrate the database
  * `$ knex migrate:latest`
1. Start the server
  * `$ DEBUG=fabric-app:* npm start`
  * [http://localhost:3000/](http://localhost:3000/)
1. Add a fabric to your database to see it displayed
  * `=# \c fabric_tracker`
  * `=# INSERT INTO fabrics(name, content, width_in_inches, yardage, domestic) VALUES ('Kona Cotton Cerise', 'cotton', 44, 15, true);`

### In the beginning, there was nothing.

This README was created AFTER a Demo. Please pardon any memory lapses. I am expremely fastidious with commits, please check diffs to be absolutely certain how the functionality of this app ACTUALLY progressed. Have fun!

### CHEKKITOUT on the webbernet

[https://fast-ridge-7561.herokuapp.com/fabrics](https://fast-ridge-7561.herokuapp.com/fabrics)

#### Generate app

1. `$ express fabric-tracker`
1. cd into directory, git init and commit entire repo as is.

#### Add some required node modules

1. To `package.json` dependencies:
  * `"bookshelf": "~0.8.1",`
  * `"knex": "~0.8.6",`
  * `"pg": "~4.4.0",`
1. `$ npm install`
1. Create new file `.gitignore` and add new directory `node_modules` to be ignored.
  * If you ever have your server error out, you will get a debug log. Add this to your `.gitignore` if you ever see it, no one needs to see your dirty laundry.
  * Commit ONLY this new `.gitignore` file
1. Start server: `$ DEBUG=fabric-app:* npm start`
1. Commit dependencies

#### Connect to the PostgreSQL database
1. Add `.env` file to root of app with the following content:
  * `process.env.PG_CONNECTION_STRING = 'postgres://localhost/fabric_tracker';`
  * This file should automatically be ignored by git. IF NOT, add it immediately to your `.gitignore file` and commit. OR BETTER YET, add `.env` to your global gitignore [LMGTFY](http://lmgtfy.com/?q=global+gitignore).
1. Add `.env.example` file with the following content:
  * process.env.PG_CONNECTION_STRING = 'your connection string here';
  * This file is for anyone who forks and clones your project... they will copy `.env.example` to `.env` and replace example environmental variables with their actual variables.
1. Load `.env` in your app
  * In the top of your `app.js`, add `require('./.env')`
1. Add Bookshelf module `bookshelf.js` in new folder `db` with the following content:

  ```
  var pg = require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING
  });

  var bookshelf = require('bookshelf')(pg)

  module.exports = bookshelf;
  ```

1. Require bookshelf in app `var bookshelf = require('./db/bookshelf');`
1. Restart server - should be an error:
  * `Knex:Error Pool2 - error: database "fabric_tracker" does not exist`
1. Open PostgreSQL CLI and create database
  * Open a new terminal tab... leave this terminal tab open for future sql queries
  * `$ psql -d postgres`
  * `=# CREATE DATABASE fabric_tracker;`
1. Restart server and refresh browser.
1. Commit all the things (making sure that your `.env` file is still not being tracked by Git)

#### Create migration and migrate

1. `$ knex init`
  * If knex is not installed, run `$ npm install knex -g` to install CLI
  * This will create a `knexfile.js` in root of app. Require `.env` and alter export contents to only use PostgreSQL:

  ```
  require('./.env')

  module.exports = {

    development: {
      client: 'pg',
      connection: process.env.PG_CONNECTION_STRING
    }

  };
  ```

1. Create a migration template from the command line (this will use the file we just created with `$ knex init`):
  * `$ knex migrate:make createFabric`
  * Add the following to the `exports.up` code block to create the table:

    ```
    return knex.schema.createTable('fabrics', function (table) {
      table.increments();
      table.string('name');
      table.string('content');
      table.integer('width_in_inches');
      table.float('yardage');
      table.boolean('domestic');
      table.timestamps();
    })
    ```

  * And add this to the `exports.down` to drop the table in rollbacks:

    ```
    return knex.schema.dropTable('fabrics');
    ```

1. Migrate any existing migrations (just the one created above in this case):
  * `$ knex migrate:latest`
  * Verify that the table has been created in PostgreSQL CLI:
    * `=# \c fabric_tracker`
    * `=# SELECT * FROM fabrics;`
    * You should see an empty table
  * IF you ever need to rollback, `$ knex migrate:rollback`
1. Commit

#### User can visit `/fabrics`

1. Add '/fabric' link to root page `views/index.jade`
  * `a(href='/fabrics') Check out my awesome fabric inventory`
1. Stop and restart the server, and refresh browser. Click link. Note what your error message looks like when you do not have a route. Look at the server logs, and note the 404 for `GET /fabrics`
1. In `app.js`:
  * Change `var users = require('./routes/users');` to `var fabrics = require('./routes/fabrics');`
  * Change `app.use('/users', users);` to `app.use('/fabrics', fabrics);`
1. In `routes` folder, change filename `users.js` to `fabrics.js`
1. In `fabrics.js`, only route should be changed to:

  ```
  router.get('/', function(req, res, next) {
    res.render('fabrics/index');
  });
  ```

1. Stop and restart your server, and visit [http://localhost:3000/](http://localhost:3000/). Click link. Note what your error message looks like when you do not have a view. Look at the server logs, and note the 500 for `GET /fabrics`.
1. Add view for fabric index:
  * Create file `views/fabrics/index.jade`

    ```
    extends ../layout

    block content

      h1(class='page-header') Fabric inventory

      table(class='table')
        thead
          th Name
          th Fiber Content
          th Width (inches)
          th Yardage Avail
          th Domestic?
        tbody
          tr
            td
            td
            td
            td
            td

    ```

1. Stop and restart your server, and visit [http://localhost:3000/](http://localhost:3000/). Click link. Page is loading! Check server logs to see what that looks like as well.
1. Commit

#### Bootstrap intermission

1. Go to [http://getbootstrap.com/getting-started/#download](http://getbootstrap.com/getting-started/#download) and click on "Download Bootstrap" (zip file)
1. Unzip, and rename file to just `bootstrap`
1. Move this directory to `/public`
1. Restart server and open [http://localhost:3000/](http://localhost:3000/)
1. Require bootstrap in `/views/layout/jade`, contents of head should be:

  ```
  title= title
  link(rel='stylesheet', href='/bootstrap/css/bootstrap.min.css')
  link(rel='stylesheet', href='/stylesheets/style.css')
  script(src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js')
  script(src='/bootstrap/js/bootstrap.min.js')
  ```

1. Refresh index... you should see the font change. Bootstrap is now loading!
1. Commit all bootstrap files, then commit the rest of the diffs

#### User can see fabrics in database listed on fabric index

1. Add one fabric to database through PostgreSQL CLI:
  * `INSERT INTO fabrics(name, content, width_in_inches, yardage, domestic) VALUES ('Kona Cotton Cerise', 'cotton', 44, 15, true);`
1. Change fabric index to loop through fabrics:

  ```
  tbody
    each fabric in fabrics
      tr
        td= fabric.name
        td= fabric.content
        td= fabric.width_in_inches
        td= fabric.yardage
        td= fabric.domestic ? "Domestic" : "Imported"
  ```

1. Pass fabrics from `routes/fabrics.js` file to view (`fabrics` does not yet reference anything...)

  ```
  res.render('fabrics/index', {fabrics: fabrics});
  ```

1. Add model 'models/fabric.js' with the following content:

  ```
  var bookshelf = require('../bookshelf');

  var Fabric = bookshelf.Model.extend({
      tableName: 'fabrics'
  });

  module.exports = Fabric;
  ```

1. Require model in the `routes/fabric.js` file:
  * `var Fabric = require('../models/fabric');`
1. Add Fabric query to route, saving result to `fabrics`:

  ```
  router.get('/', function(req, res, next) {
    Fabric.collection().fetch().then(function(fabrics) {
      res.render('fabrics/index', {fabrics: fabrics.toJSON()});
    });
  });
  ```

1. Stop and restart your server, and visit [http://localhost:3000/fabrics](http://localhost:3000/fabrics).
1. Commit

#### Get this deployed!

Heroku uses a special environmental variable for their psql database. We will need to get our environmental variables using the same name, and only load the `.env` file if we are in the local environment.

1. Create a new Heroku App, and add the add-on Heroku Postgres (and wait for it to properly save). Go to the settings page and reveal config variables. You should see an environmental variable pointing to a Heroku PostgreSQL connection string. You will need to rename your `PG_CONNECTION_STRING` to this variable name, likely `DATABASE_URL`.
1. Search your entire app for `PG_CONNECTION_STRING` and replace with `DATABASE_URL`.
1. There are two places in your app where you are requiring your `.env` file. We will not have a `.env` file in production, so how can we stop this code from executing in production?
  * `process.env.DATABASE_URL || require('./.env')`
1. Commit and push to Heroku.
1. Migrate your database at Heroku
  * `heroku run knex migrate:latest`
1. Want to add something to your Heroku database?
  * `$ heroku pg:psql`
  * `=> INSERT INTO fabrics(name, content, width_in_inches, yardage, domestic) VALUES ('Kona Cotton Cerise', 'cotton', 44, 15, true);`
