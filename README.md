Alternate Programming Assignment for SWE 681 taught by Dr. Wheeler<br>
M. Andrew Williams<br>
Created: 11 September 2019<br>
Updated: 10 November 2019<br>
Scheduled Release Date: 3 December 2019<br>

INTRODUCTION:
--------------------
This is a MongoDB, Express.js, Angular 8, Node.js, Socket.io application.  This application is also best viewed on desktop with mobile device awareness that will gradually become more PWA friendly.<br><br>
<p><b>**Still under construction, security features covered during SWE 681 will be implemented as the course progresses.**</b></p>

UPDATES:
--------------------
As of 10 Nov the following features are fully functional in the staging environment:
<ul>
  <li>User account CRUD - CR 100%, (No current plan for update or delete).</li>
  <li>Bicycle listing CRUD - CRU 100%, (Delete is forthcoming).</li>
  <li>Bidding - user created bicycles can be in one of three states:</li>
    <ul>
      <li>Inactive - bicycle created by user that can be updated or deleted. Not viewable by other users or posted in active listing section.
      <ul>
        <li>Must have an image</li>
        <li>Must have a title</li>
        <li>Must have a description</li>
        <li>Must have city and state for location</li>
        <li>Must have minimum closing price (amount that must be matched in order to win auction)</li>
        <li>Must have a starting price (minimum amount in order to bid for bicycle)</li>
      </ul>
      </li>
      <li>Active - bicycle listed on main page with the following requirements:
        <ul>
          <li>Auction closing date is a future date and time of: 90 days or less.</li>
          <li>Minimum closing price is within pre-defined limits.</li>
          <li>Starting price is within pre-defined limits.</li>
          <li>Only title and description may be updated when in active status.</li>
<<<<<<< HEAD
          <li>All users may bid on bicycles EXCEPT their own listings.</li>
=======
          <li>All users may bid on bicycles <span style="color: red">EXCEPT</span> their own listings.</li>
>>>>>>> 2dfb9a78caa8a015c68c3a88eb2415328af1b30a
          <li>All logged in users can see updates to active listings in real-time.</li>
          <b><li>Active listings revert to "<i>inactive</i>" status if minimum closing price is not matched or exceed by closing date and time of auction.</li></b>
        </ul>
      </li>
      <li>Accession - bicycle listing ended and auction bidding matches or exceeds the minimum closing price. Bicycles in this status are only viewable to the winner.</li>
    </ul>
</ul>

The following security features are being added in the development environment and will be in staging by 28 November:
<ol>
<li>All routes (canonical URLS and endpoints) are only accessible by authorization and authentication.</li>
<li>NoSQL Injection countermeasures</li>
<li>Buffer overflow countermeasures</li>
<li>Event Logging and automated monitoring</li>
<li>CORS prevention</li>
<li>CSRF/XSRF countermeasures</li>
<li>XSS countermeasures</li>
<li>Session Fixation countermeasures</li>
<li>Stronger Salt/Hash algorithm (if time allows)</li>
</ol>

<b>All above features will be available in the production environment application by the scheduled release date.  Code will also be made public at this time.</b>

SUMMARY:
--------------------

-This application is being built as an alternate programming assignment culminating 6 months of material and the various ways of developing a secure modern day application.  
Project requirements here:

![Image of Yaktocat](http://mawfia.com/documents/bicycle1.png)
![Image of Yaktocat](http://mawfia.com/documents/bicycle2.png)
![Image of Yaktocat](http://mawfia.com/documents/bicycle3.png)

HOW TO USE:
---------------------
Production environment contains a prototype application allowing users to create, view, update, auction, or bid on bicycle listings.  Wireframes depict 'how to use' and will eventually be updated to show bidding procedures.  Login with "test@test.com", password "!QAZzaq1" or create your own account.


Production environment application may be viewed at: http://mawfia.eastus.cloudapp.azure.com/

Current Maintainer:
 * M. Andrew Williams

This is an alternate programming assignment proposed to and approved by Dr. Wheeler.
