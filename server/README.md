# The App Backend
I use `nodejs` for the backend, and I deployed it in [render.com](render.com). For free ofcourse.

## The code structure
### index.js
The main file that calls the routes, connect with the db, and initiate the packages to be used by the app()
### routes/index.js
The main file of the route that communicates with the other files in the same directories
### routes/auth.js
contains all the routes used in the program `POST`, `GET`, and in the future `PATCH` to modify the password of the username.
### controller/auth.js
contains the callback function that `routes/auth.js` use
### utiles/index.js
contains the utility function and they are `encrypt` and `decrypt`
### db/users.js
contains function that communicates with the db

## Usage
to use this app the only this you need to change is the `.env.example`. Add your informations as described in the files and move the name of the file from `.env.example` to `.env`.
