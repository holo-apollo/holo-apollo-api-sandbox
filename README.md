# Craft Art Marketplace

## Developers guide

### Setting up development environment

There are three ways to set up local development environment:

1. Install all services locally and adjust app settings.

2. Bring up database services in Docker and run processes locally (recommended during active
   development).

3. Bring up all services in Docker.


#### Running all services locally

This way has no real advantages, so take it at your own if you want.
You'll need to create Postgres database, run Redis server and Elasticsearch server.

Then follow the steps from the next section, skipping Docker-related ones.


#### Running DBs in Docker and processes locally

This way has the advantage of quickly bringing up static services like storages (Postgres database,
Redis and Elasticsearch) and ability to debug dynamic services (web server, Celery worker, webpack)
while making changes locally.

- Install Docker and Docker-compose and add current user to `docker` group:

  [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

- Bring up storage services:

  ```
  make db_up
  ```

  This will pull services images and run them in background. Pulling images may take a while.
  To check services status, run:

  ```
  make db_status
  ```

  To stop the services:

  ```
  make db_stop
  ```

- Add `.env` file to project root to configure some environment variables. Use `.env.local.example`
  as a basis.

- Create virtual environment for the project and activate it (with Python 3.6):

  [https://virtualenvwrapper.readthedocs.io/en/latest/install.html](https://virtualenvwrapper.readthedocs.io/en/latest/install.html)

- Install requirements:

  ```
  pip install -r requirements.txt
  ```

- Make sure to have `node` and `yarn` installed locally with versions specified in `package.json` file

- Install frontend requirements:

  ```
  yarn
  ```

  It will also build dev and prod frontend bundles.

  If you work on frontend and want to run webpack in watch mode, run:

  ```
  yarn start
  ```

- Apply migrations:

  ```
  ./manage.py migrate
  ```

- Run Django development server:

  ```
  ./manage.py runserver
  ```

- Run Celery worker if you need:

  ```
  celery worker --app=config.celery.app
  ```

Site should now be available at [http://localhost:8000](http://localhost:8000).


#### Running all services in Docker

This way is useful if you don't plan to heavily debug and find bugs in the code but rather check
functionality locally.

- Install Docker and Docker-compose and add current user to `docker` group:

  [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

- Bring up all services in Docker:

  ```
  make all_up
  ```

  It will create storage services in the same way as in previous section, and also build web, worker
  and client containers with mapping to local folders.

- Apply migrations:

  ```
  ./manage.py migrate
  ```

Site should now be available at [http://localhost:8000](http://localhost:8000).


### Development

API docs are available at [http://localhost:8000/api/docs](http://localhost:8000/api/docs).

Note that API docs show available operations for current user which may vary depending on user's
permissions.


#### Internationalization (i18n)

*Backend i18n flow:*

- Mark all user-facing strings in Python code with `gettext()` and in templates with `trans` or `blocktrans` tags

- Grab messages:

  ```
  ./manage.py makemessages -a
  ```

- Translate messages in `.po` files for each language (locale) located at `locale` folder

- Compile messages:

  ```
  ./manage.py compilemessages
  ```

- Commit the results

[Django docs](https://docs.djangoproject.com/en/2.1/topics/i18n/translation/)

*Frontend i18n flow:*

- Mark all user-facing strings in React code using [react-intl](https://github.com/yahoo/react-intl/wiki#getting-started) means

- Build the bundle. You should see messages collected to `.json` files for each module in `frontend/i18n/messages` folder

- Merge messages to single file:

  ```
  yarn build-langs
  ```

- Copy new strings for translation from `frontend/i18n/locale/data.json` to each language file and translate them there

- Merge messages again to put translations to single `data.json` file

- Commit the result

This process should perhaps be partially automated.
