# Blog 🚀
Node Blog API

## USED TOOLS

Swagger and Document are available
Jest and Supertest for end-to-end testing.
Bcryptjs for hashing the password for more security.
Hasura for Graphql API

## HOW TO RUN IT?

### PREINSTALL

for installing all dependencies open the terminal in that directory and run :
npm install

### RUN IT
open the terminal in that directory and run:
npm start

## TEST

open the terminal in that directory and run:
npm test

## Endpoints

### USER SIGNUP

POST /api/auth/signup

#### parameters

{
    "name": "Your name",
    "email": "A valid email address",
    "password": "A password with 7-12 characters",
}
 #### result

{
    "success": true,
    "message": "Signup completed successfully, now you can login with it.",
    "response": {
        "id": "Generated id by database",
        "name": "Your name",
        "email": "Your email address",
    }
}

### USER LOGIN

POST /api/auth/login

#### parameters

{
    "email": "Your signedup email address",
    "password": "Your password",
}
 #### result

{
    "success": true,
    "message": "User successfully loged in.",
    "response": {
        "token": "Generated token",
    }
}

### CREATE POST

POST /api/post/

#### parameters

Headers:{
    Authorization:"token that given while logining"
}
{
    "title": "Your post title",
    "body": "Your post body",
}
#### result

{
    "success": true,
    "message": "Post successfully created.",
    "response": {
        "id": "Generated id by database",
        "title": "Your post title",
        "body": "Your post body"
    }
}

### GET USER POSTs

GET /api/post/

#### parameters

Headers:{
    Authorization:"token that given while logining"
}

 #### result

{
    "success": true,
    "message": "User posts successfully returned.",
    "response": [
        {
            "id": "Post id",
            "title": "Post title",
            "body": "Post body",
        }
    ]
}

### GET POST BY ID

GET /api/post/:id

#### parameters

Headers:{
    Authorization:"token that given while logining"
}

 #### result

{
    "success": true,
    "message": "User posts successfully returned.",
    "response":
        {
            "id": "Post id",
            "title": "Post title",
            "body": "Post body",
        }
}

### UPDATE POST

PUT /api/post/:id

#### parameters

Headers:{
    Authorization:"token that given while logining"
}
{
    "title": "Your updated title",
    "body": "Your updated body",
}
#### result

{
    "success": true,
    "message": "Post successfully updated.",
    "response": {
        "id": "Generated id by database",
        "title": "Your updated title",
        "body": "Your updated body"
    }
}

### DELETE POST BY ID

DELETE /api/post/:id

#### parameters

Headers:{
    Authorization:"token that given while logining"
}

 #### result

{
    "success": true,
    "message": "Post successfully deleted.",
    "response": null
}

### SwaggerUI

GET /api-docs

#### result

Going to the SwaggerUI page.

## Some other Info

## .env file

you should rename .env.example to .env and complete it.
You should put your secret for the JSON web token too.