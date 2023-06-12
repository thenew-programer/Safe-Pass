
# App Backend

This is the backend for the **Safepass** app built with Node.js and Express.js. It is designed to be deployed on Vercel, a cloud platform for static websites and serverless functions.

## Prerequisites
- Node.js (version 18x)
- npm (npm version 9x)
- Vercel CLI

## Getting Started
To run the backend, follow these steps.
1. Clone the repository:
```
get clone https://github.com/thenew-programer/safe-pass-backend.git
```
2. Install dependencies
```
npm install
```
3. Create a `.env` file at the root of the project and configure the following variables:
```
DATABASE_URL=value

USERS_DATABASE_URL=value

DATA_ENCRYPTION_KEY=value

USERS_HASHING_KEY=value
```
- `DATA_ENCRYPTION_KEY`: Used for storing passwords (mysql)
- `USERS_DATABASE_URL`: Used for storing users info (mongodb)
- `DATA_ENCRYPTION_KEY`: Used to encrypt users passwords (32 char long)

- `USERS_HASHING_KEY`: Used to hash users account password
Note: Make sure to not commit your `.env` file to version control.

4. Start the developement server:
```
npm run dev
```

This will start the backend server on `http://localhost:3001`.

## Deployment
To deploy the backend on Vercel, follow these steps:

1. Install the Vercel ClI:
```
npm install -g vercel
```
2. Login to your Vercel account:
```
vercel login
```
3. Configure your project settings: 
```
vercel
```
This will gide you through the process of linking your project to Vercel.

4. Deploy your app:
```
vercel --prod
```
This will deploy the backend to Vercel and provide you with a unique URL.
## API Documentation

1. **Password Count**
- Description: return the number of passwords you have in your account
- Method: GET
- Path: /showpasswordcount
- Request: No parameters
- Response: number of password as a string. Cast to number before use.

2. **Add a password**
- Description: add a password to user database
- Method: POST
- Path: /addPass
- Request: 
    
    - body: website, email, password

3. **List password**
- Description: show all the password a user has in the account
- Method: GET
- Path: /showpasswords
- Request: No parameters
- Response: array of objects containing passwords.

4. **Download password** (csv)
- Description: download all the passwords in a csv file.
- Method: GET
- Path: /downloadPass
- Request: No parameters
- Response: attachement of type csv

5. **Update password**
- Description: update a password
- Method: PATCH
- Path: /updatePass
- Request: 

    - body: website, email, oldPass, newPass

6. **Remove a password**
- Description: remove a password
- Method: DELETE
- Path: /removePass
- Request: 

    - data: website, email

### Response Code
1. **200** : Ok
2. **400** : client error
3. **405** : not authenticated
4. **500** : server error
## Feedback

If you have any feedback, please reach out to us at youssefbouryal02@gmail.com

