Alternate Programming Assignment for SWE 681 Taught by Dr. Wheeler<br>
M. Andrew Williams<br>
Created: 13 September 2019

INTRODUCTION:
--------------------
This is a non-sercure MongoDB, Express.js, Angular 6, Node.js prototype application designed, built, and deployed to cloud services over a period of 3 days.  This applciation may also be viewed from mobile devices.<br>
**Still under construction, security features covered during SWE 681 will be implemented as the course progresses.**

SUMMARY:
--------------------

-This application was built as an alternate programming assignment culminating 6 months of material including HTML, CSS, JavaScript, Typescript,
Angular 6, Express, Node, Mongo and the various ways of using these technologies to develop a modern day application.  As the
third belt exam we were given 48 hours to start and finsh an application including testing and deployment with the following requirements:

1. CRUD operations all working.
	a. Able to create new account.
	b. All bicycles displayed upon logging into the website.
	c. User may choose to read the reviews of a particular movie
	d. Able to add bicycle.
	e. Able to delete own bicycles.
2. Routing.
	a. Root route redirects to'/' to display home screen.
	b. Route '/dashboard' user's home screen. (Successful registration redirects to the dashboard)
	c. Route '/my_bicycles' displays user's bicycles.
	d. Route '/bicycles' displays all available bicycles including user.
3. Backend validations.
	a. All bicycles must have a title of at least 3 characters
	b. Upon creating a bicycle, an image must be provided.
	c. Reviews must have the name of the reviewer, a star rating, and content
	d. A reviewer's name must be at least 3 characters
	e. A review star rating must be between 1 and 5 stars
	f. The content of a review must be at least 3 characters
	g. Error messages inform the user if a movie or review is not meeting requirements.
	h. Error messages are custom-writtin (not mongoose default messages)
4. HTML and CSS reflect the wirefram to at lesat 75% accuracy.
5. You must be able to deploy your work to Amazon EC2 and provide the IP address or subdomain/domain name to where your work has been deployed.

![Image of Yaktocat](http://mawfia.com/documents/bicycle1.png)
![Image of Yaktocat](http://mawfia.com/documents/bicycle2.png)
![Image of Yaktocat](http://mawfia.com/documents/bicycle3.png)

HOW TO USE:
---------------------
This is a prototypte bicycle marketplace application that allows you to read, write, or delete bicycles.  View wireframes above for 'how to use'.  You may login using test@test.com, password !QAZzaq1 or create your own account.


TECHNOLOGY USED:
-----------------
1.  Node, Express, and Mongo were used for all backend and data storage logic.

2.  Node Package Manager was used to manage all module and library dependencies.

3.  Mongoose was used for back-end data validation and Angular were used for front-end form validation.

4.  SHA256 was used as a salt/hash algorithm to obsfuscate each user's password stored in Mongodb.

5.  Express.js, Nginx, and PM2 were used for server deployment, routing, and execution with data and template client-side service requests handled with Angular 6 and its routing dependency.

6.  The application is deployed on a Azure cloud services including Ubuntu 18.04 configuration and management.

This web application may be viewed at: http://mawfia.eastus.cloudapp.azure.com/

Current Maintainer:
 * M. Andrew Williams

This is an alternate programming assignment proposed to and appproved by Dr. Wheeler.
