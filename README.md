# Assignment 2 - Web API.

Name: Huayu Qin

## Features.



 + Feature 1 - Add more than five APIs: new Actor, ActorDetails, Upcoming, toprated API, movieCredits, including a parameterised URL.
 + Feature 2 -  Mongo integration. Storing API data  information in database.

 + Feature 3 -  Coherent API design and modelling supporting full manipulation of resources.
 + Feature 4 -  Using Nested Document for movie-reviews to associated users and user reviews and update object referencing to support the favourite movies function.
 + Feature 5 - Using Mongoose to perform custom validation for token.
 + Feature 6 -  Basic Authentication and protected routes for movie API.
 + Feature 7 - Use express middleware to take Error handing in the router.
 + Feature 8 - React integration. 
 + Feature 9 - Custom API Documentations with Swagger.
 + Feature 10 - User can create a list to store movies.
 + Feature 11 - Authentic user can add movie to the watchlist  
 + Feature 12 - Authentic user can see the details of movies in the watchlist. 
 + Feature 13 - Authentic user can not add the same movie to the watchlist twice.
 + Feature 14 - User can get the reviews of the specific movie.
 + Feature 15 - User can check the similar movies via the specific movie
 + Feature 16 - User can add a movie with a random ID in database.
 + Feature 17 - User can delete  the specific movie store in database
 + Feature 18 - User can get the upcoming, toprated movies and details.
 + Feature 19 - User can get the popular actors with personal details.
 + Feature 20 - customized password validation for register.

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 

Describe getting/installing the software, perhaps:

```bat
git clone https://github.com/Huayu-Qin/wad_api_assignment2.git
```

followed by installation

```bat
git install
```

then follow below

```bat
npm install
```

```bat
npm start
```

and configure swagger 

```bat
npm install swagger-UI
```

```
git install swagger-ui express
```

```
git install swagger-jsdocs
```



## API Configuration

configuration that needs to take place before running the API. 

`.env`file

```javascript
NODE_ENV=development
PORT=8080
HOST=localhost
TMDB_KEY=mytmdbkey
mongoDB=mongodb+srv://admin:mypassword@cluster0.sjydx.mongodb.net/databasename?retryWrites=true&w=majority
SEED_DB=true
SECRET=JWTToken
```

## API Design

overview of my web API design: 

|              Name               |                  GET                   |                POST                 |      PUT      |               DELETE               |
| :-----------------------------: | :------------------------------------: | :---------------------------------: | :-----------: | :--------------------------------: |
|           /api/movies           |          Get a list of movies          |                 N/A                 |      N/A      |                N/A                 |
|      /api/movies/{movieid}      |          Get a specific movie          |           Update a movie            |      N/A      |      Delete a specific movie       |
|  /api/movies/{movieid}/reviews  |          Get reviews of movie          |         Upload a new review         |      N/A      |                N/A                 |
|  /api/movies/{movieid}/similar  |  Get similar movies of specific movie  |                 N/A                 |      N/A      |                N/A                 |
|           /api/users            |          Get a list of users           |   Register or authenticate a user   |      N/A      |                N/A                 |
|       /api/users/{userid}       |                  N/A                   |                 N/A                 | Update a user |                N/A                 |
| /api/user/{username}/favourites |       Get favourite movies list        |      add a movie to favourites      |      N/A      |                N/A                 |
| /api/user/{username}/watchlists |          Get movie watchlist           |      add a movie to watchlist       |      N/A      |                N/A                 |
|           /api/actors           |      Get a list of popular actors      |     add a actor with random ID      |      N/A      |                N/A                 |
|        /api/actorDetails        |     Get details of specific actor      |                 N/A                 |      N/A      |                N/A                 |
|          /api/upcoming          |     Get a list of upcoming movies      |                 N/A                 |      N/A      |                N/A                 |
|   /api/upcoming/{upcomingid}    |     Get a specific upcoming movie      | add a specific movie with random ID |      N/A      | Delete the specific upcoming movie |
|          /api/topRated          | Get a list of specific toprated movies |                 N/A                 |      N/A      |                N/A                 |
|   /api/toprated/{topratedid}    |     Get a specific toprated movie      |        add a specific movie         |      N/A      |                N/A                 |
|               ...               |                  ...                   |                 ...                 |      ...      |                ...                 |

Link of swagger: https://wad-api-production.herokuapp.com/#/Movies/get_api_movies

Longer waiting time for data response because the remote server is slow to load

local:http://localhost:8080/ Basic complete function of API


## Security and Authentication
Only authenticated users with correct information can access the protected route.

- protected routes:

  /api/movies

  /api/upcoming

- The password have the limit format in registerion

## Integrating with React App

Add below part in the bottom of the `package.json` in MoviesApp

```javascript
 "proxy": "http://localhost:8080"
```

change the way that the API is accessed in `tmdb-api.js`.

~~~Javascript
export const getMovies = () => {
  return fetch(
    `/api/movies`, {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }, method: 'get',
  }).then(res => res.json());
};

export const getUpcomingMovies = () => {
  return fetch(
    `/api/upcoming`, {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }, method: 'get',
  }).then(res => res.json());
};

export const getPeoples = () => {
  return fetch(
    `/api/actors`, {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }, method: 'get',
  }).then(res => res.json());
};

export const getPeople = id => {
  return fetch(
    `/api/actorDetails/${id}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }, method: 'get',
  }).then(res => res.json());
};

export const getTopRatedMovies = () => {
  return fetch(
    `/api/topRated`, {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }, method: 'get',
  }).then(res => res.json());
};
~~~

## Extra features

- Web form.
- Dynamic and interactive UI.

## Independent learning.

- swagger UI

I build the swagger documentation in the heroku and it can also access from local. I use swagger.json to develop it.

# Assignment 2 - Agile Software Practice.

Name: Huayu Qin

## Target Web API.



+ Get /api/movies - returns an array of movie objects.
+ Get /api/movies/:id - returns detailed information on a specific movie.
+ Get /api/movies/:id/reviews - return reviews on a specific movie.
+ Get /api/movies/:id/similar - return the similar movies on a specific movie.
+ Post /api/movies - add a new movie to the database.
+ Delete /api/movies/id - delete a specific movie from the database.
+ Get /api/users - return an array of movie objects.
+ Post /api/users -  register or authenticate user format and create a new user
+ Put /api/users/:id - update the information of specific user.
+ Get /api/users/:username/favourites - return the favourite lits of the specific user.
+ Post /api/users/:username/favourites - add a specific movie to favourite
+ Get /api/users/:username/watchlists - return the watchlist lits of the specific user.
+ Post /api/users/:username/watchlists - add a specific movie to watchlist
+ Get /api/actors - return an array of popular actors objects.
+ Get /api/actors/:id - returns detailed information on a specific actor.
+ Get /api/actorsDetails - return an array of personal information objects.
+ Get /api/actorsDetails/:id - return the personal information on a specific actor.
+ Get /api/topRated - return an array of topRated Movies objects.
+ Post /api/topRated - Based on scoring, add a new movie to the database.
+ Get /api/upcoming - return an array of upcoming Movie objects .
+ Post /api/upcoming -  add a new upcoming movie to the database.

## Error/Exception Testing.

#### /api/movies/

+ Get /api/movies - with the authorized,test movie lists when the token is valid or invalid.

+ Get /api/movies/:id - test the specific movie and details with the valid and invalid id.

+ Get /api/movies/:id/reviews - test the specific reviews of a vaild id.

+ Delete /api/movies/:id - test the delete of a movie with a valid id.

#### /api/users/

+ Get /api/users - test users list when authentic.

+ Post /api/users - test the registration： 

+ test the registration of the user with a invalid password or username.

+ test the registration of the user with a correct format of password.

+ test the registration of the user with  the correct .username and the  wrong password. 

+ test the registration of the valid username and password.

+ Get /api/users/:id/favourites - test  users favourites list with vaild user.

+ Post /api/users/:id/favourites - test adding a movie with valid and invalid id in authentic.

+ test the registration of the valid username and password

+ Get /api/users/:id/watchlists - test  users watchlists list with vaild user.

+ Post /api/users/:id/watchlists - test adding a movie with valid and invalid id in authentic.

#### /api/upcoming/

+ Get /api/upcoming - test the movie lists with invalid idwhen authentic.

+ Get /api/upcoming/:id - test the specific movie with invalid idwhen authentic.

#### /api/topRated/

+ Get /api/topRated - test the movie lists with invalid idwhen authentic.

+ Get /api/topRated/:id - test the specific movie with invalid idwhen authentic.

#### /api/actors/

+ Get /api/actors - test the actors lists with valid and invalid id when authentic.

+ Get /api/actors/:id - test the specific actor with valid and invalid id when authentic.

#### /api/actorDetails/

+ Get /api/actorDetails - test the actorDetails lists with valid and invalid id when authentic.

+ Get /api/actors/:id - test the specific actorDetail with valid and invalid id when authentic.

## Continuous Delivery/Deployment.

the URLs for the staging and production deployments of  web API

+ https://dashboard.heroku.com/apps/wad-api - Staging deployment
+ https://dashboard.heroku.com/apps/wad-api-production - Production

 Screenshots from the overview page for the two Heroku apps 

+ Staging app overview 

![][development]

+ Production app overview 
+ ![][production]





[stagingapp]: ./img/stagingapp.png
[development]: ./img/development.png
[production]: ./img/production.png

