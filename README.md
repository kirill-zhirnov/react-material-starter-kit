# How to start?

- Copy `.env-example` to `.env`.
- `yarn install`
- Go to `boundless-api-client` and `yarn link`
- Go to `boundless-checkout-react` and `yarn link`
- Come back to the checkout wrapper folder and:
- `yarn link boundless-api-client`
- `yarn link boundless-checkout-react`
- `yarn dev`
- `yarn dev-webpack`
- You might also need to modify cartId at `./src/client/pages/checkoutIndex.tsx`

# React MaterialUI Starter kit (Typescript, Express, Redux, PM2)

This is a starter kit - a boilerplate for a quick start to the development.

## Server-side includes:

- Node.js/TypeScript
- PM2 (cluster mode)
- Expres.js
- Redis (as session storage)
- Docker (starts Redis)
- Server-side rendering for the React

## Client-side includes:

- React
- MaterialUI
- Scss
- bootstrap (for utils, mixins & layouts)

## Dev tools :

- Webpack
- Gulp (loads lang from backend at build time)
- Eslint
- Stylelint
- Github linters (for pull-requests in the master branch)

---

## Server-side Routing

The system looks for server-side routes first, if nothing is found the system looks for React route.

### Server-side routes

Server-side routes are specified in the `./src/server/serverMapping.ts`. 
There multiple ways to specify a route.

1. Specify URL prefix and Controller class:

```
'/api/i18n': {
	controller: ApiI18nController,
},
```

The class `ApiI18nController` should have action-methods:

`actionLoad()` - handles request URL `/api/i18/load`

Request method might also be specified - specify method in a controller class method's name:

- `postActionLoad()` - suits only for request `POST /api/i18/load`,
- `getActionLoad()` - `GET /api/i18/load`,
- `deleteActionLoad()` - `DELETE /api/i18/load`,
- etc.

2. Specify class and method name:

```
'/api/user/login': {
	controller: ApiUserController,
	action: 'login',
	method: ['post']
},
```

Request to `/api/user/login` will be handled by the ApiUserController
class, `login()` method.

The key `method` isn't required.

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