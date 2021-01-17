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

