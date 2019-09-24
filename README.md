Alternate Programming Assignment for SWE 681 taught by Dr. Wheeler<br>
M. Andrew Williams<br>
Created: 13 September 2019

INTRODUCTION:
--------------------
This is a non-sercure MongoDB, Express.js, Angular 8, Node.js prototype application designed, built, and deployed to cloud services over a period of 3 days.  This applciation is best viewed on desktop with mobile device awareness that will gradually become more friendly.<br><br>
<marquee>**Still under construction, security features covered during SWE 681 will be implemented as the course progresses.**</marquee>

SUMMARY:
--------------------

-This application is being built as an alternate programming assignment culminating 6 months of material and the various ways of developing a secure modern day application.  
Project requirements here:

1. CRUD operations currently working.<br>
	a. Able to create new account.<br>
	b. All user bicycles displayed at my_bicycles.<br>
	c. All bicycles displayed at bicycles_list.<br>
	c. Able to update bicycle(s).<br>
	d. Able to add bicycle.
2. Routing.
	a. Root route redirects to'/' to display login screen.
	b. Route '/dashboard' user's home screen. (Successful registration redirects to the dashboard)
	c. Route '/my_bicycles' displays user's bicycles.
	d. Route '/bicycles' displays all available bicycles including user.
	e. When logged in '/' redirects to User's dashboard.
3. Backend validations.
	a. All bicycles must have a title of at least 2 characters
	b. Upon creating a bicycle, an image must be provided.
	c. Reviews must have the name of the reviewer, a star rating, and content
	d. A reviewer's name must be at least 3 characters
	e. A review star rating must be between 1 and 5 stars
	f. The description of a bicycle must be at least 2 characters
	g. Error messages inform the user if a bicycle is not meeting requirements.
	h. Error messages are custom-writtin (not mongoose default messages)

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

5.  Express.js, Nginx, and PM2 were used for server deployment, routing, and execution with data and template client-side service requests handled with Angular 8 and its routing dependency.

6.  The application is deployed on a Azure cloud services including Ubuntu 18.04 configuration and management.

This web application may be viewed at: http://mawfia.eastus.cloudapp.azure.com/

Current Maintainer:
 * M. Andrew Williams

This is an alternate programming assignment proposed to and appproved by Dr. Wheeler.
