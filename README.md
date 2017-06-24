NorBotChallenge

## Installing

* Install MongoDB (www.mongodb.com)
* Start MongoDB

See https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

    mongod.exe --dbpath c:\mongodb\data

* Install Node.js (www.nodejs.org)
* Clone this repository to local machine

      cd C:\GIT\
      git clone https://github.com/NorbotNorway/NorBotChallenge.git

* Get all the required NPM modules

      npm install

* Start the backend server

      node server.js (for one time start)

      or

      npm run start (for automatic retart during development)

* Browse to http://localhost:3000

-----

See https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
and
https://www.terlici.com/2014/08/25/best-practices-express-structure.html

## Development plan (suggestion)

Main components:
1. Team registration
2. Robot registration/weigh-in at the event
2. Live schedule and results
3. Live Folkrace lap counter


### 1 Team Registration
User stories:
* As a contestant, I want to register my team
 * Team name
 * Name, email and phone number for every team member (at least one)
 * Robot name and type/class (at least one)
* As an event organizer, I want to view the list of registrations
* As an event organizer, I want to edit the registrations
* As a contestant, I want to update my team
 * Trigger email with link to edit upon registration?
* As an event organizer, I want to login to get access to the list view.

### 2 Robot registration/check-in at the event
* As a contestant, I want to register my robot and get an identifier (QR-code, RFID-card, etc) for the weigh-in.
 * One per robot or one per team?
* As a contestant, I want to identify myself to the event organizer at weigh-in using my identifier.
* As an organizer, I want to approve the robot at weigh-in by scanning the identifier.
