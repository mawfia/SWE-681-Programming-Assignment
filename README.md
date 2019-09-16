Alternate Programming Assignment<br>
M. Andrew Williams<br>
Created: 13 September 2019

INTRODUCTION:
--------------------
This is a MongoDB, Express.js, Angular 6, Node.js prototype designed, built, and deployed to cloud services over a period of 2 days.

INTRO:
--------------------

-This application was built as an alternate programming assignment culminating 6 months of material including HTML, CSS, JavaScript, Typescript,
Angular 6, Express, Node, Mongo and the various ways of using these technologies to develop a modern day application.  As the
third belt exam we were given 48 hours to start and finsh an application including testing and deployment with the following requirements:

1. CRUD operations all working.
	a. Able to create new movies.
	b. All movies displayed upon visiting the website.
	c. User may choose to read the reviews of a particular movie
	d. Able to add reviews for each movie
	e. Able to delete each movie.
2. Routing.
	a. Root route redirects to'/movies' to display all the movies.
	b. Route 'movies/new' displays the form to create a new movie. (Successful create and cancel redirect to the root route)
	c. Route '/movies/:id' displays the reviews of a particular movie and the delete button.
	d. Route '/movies/:id/review' displays the form to add a new review for a particular movie.
3. Backend validations.
	a. All movies must have a title of at least 3 characters
	b. Upon creating a movie, a review must be provided.
	c. Reviews must have the name of the reviewer, a star rating, and content
	d. A reviewer's name must be at least 3 characters
	e. A review star rating must be between 1 and 5 stars
	f. The content of a review must be at least 3 characters
	g. Error messages inform the user if a movie or review is not meeting requirements.
	h. Error messages are custom-writtin (not mongoose default messages)
4. HTML and CSS reflect the wirefram to at lesat 75% accuracy.
5. You must be able to deploy your work to Amazon EC2 and provide the IP address or subdomain/domain name to where your work has been deployed.

![Image of Yaktocat](http://mawfia.com/documents/bicycle1.png)


HOW TO USE:
---------------------
This is a sample movie review page that allows you to read, write, or delete reviews.  Buttons are labelled according to their action.


TECHNOLOGY USED:
-----------------
1.  Node, Express, and Mongo were used for all backend and data storage logic.

2.  Node Package Manager was used to manage all module and library dependencies.

3.  Mongoose was used for back-end data validation and Angular were used for front-end form validation.

4.  SHA256 was used as a salt/hash algorithm to obsfuscate each user's password stored in Mongodb.

5.  Express.js, Nginx, and PM2 were used for server deployment, routing, and execution with data and template client-side service requests handled with Angular 6 and its routing dependency.

6.  The application is deployed on a Azure cloud services including Ubuntu configuration and management.

This web application may be viewed at: http://mawfia.eastus.cloudapp.azure.com/

Current Maintainer:
 * M. Andrew Williams

This is an alternate programming assignment proposed to and appproved by Dr. Wheeler.
