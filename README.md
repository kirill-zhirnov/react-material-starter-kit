# How to start development?

- `yarn dev` - Starts PM2 workers.

- `yarn dev-webpack` - Starts webpack watchers.

- `yarn lint` - Lint the code 

# How to deploy to Heroku

- Create app in the web

- Install Redis extension.
	
- Connect folder to the app: `heroku git:remote -a <APP Name>`

- Setup variables: `heroku config:set API_BACKEND_PREFIX=https://api COOKIE_SECRET=secret I18N_LANG=ru` - see
all variables in `.env` file.
	
- Deploy the app again (if automatic isn't unabled)

- `heroku open` - opens browser

- `heroku logs --tail` - logs

- `heroku ps:exec` Connect via SSH.