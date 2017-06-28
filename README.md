# NorBot Challenge

http://www.norbotchallenge.org

This is the website used during NorBot Challenge. It contains both the public-facing side, the internal admin system, and the tv-screen system.

## Technologies used

### Backend
- Node.JS + Express, for webserver
- MongoDB, for database

### Frontend
- Plain HTML / CSS
- Vue.JS (https://vuejs.org/), to make the UI intelligent
- Element.IO (http://element.eleme.io), to make the UI pretty
- Socket.IO (https://socket.io/), to add live-updates
- MomentJS (http://momentjs.com/), for parsing datetime

### Development tools
- npm, bower, nodemon


## Installing

* Install Node.js (www.nodejs.org)

* Install MongoDB Community Server

  See https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

** Setup MongoDB as a Service (recommended)

  mkdir C:\mongodb\data
  mkdir C:\mongodb\log

Create mongod.cfg (see path in URL below), and give it this content:

      systemLog:
          destination: file
          path: c:\mongodb\log\mongod.log
      storage:
          dbPath: c:\mongodb\data


Then run this to create the Windows Service

  sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe\" --service --config=\"C:\Program Files\MongoDB\Server\3.4\mongod.cfg\"" DisplayName= "MongoDB" start= "auto

** Start MongoDB manually (as an alternative to setting up as Service)

mongod.exe --dbpath c:\mongodb\data

* Clone this repository to local machine

      cd C:\GIT\
      git clone https://github.com/NorbotNorway/NorBotChallenge.git

* Get all the required NPM modules

      cd NorBotChallenge
      npm install

* Get all clientside libraries using Bower

      npm install -g bower
      bower install

* Start the backend server

      node app\server.js (for one time start)

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
3. Live schedule and results
4. Live Folkrace lap counter
5. Event information
6. Administration

- 'must be able to' - critical
- 'want to'         - should be implemented
- 'wish'            - nice-to-have functionality
- 'organizer'       - someone who works in NorBot/Teknisk Museum
- 'participant'     - someone who has buillt a robot and competes
- 'visitor'         - someone who just watches/visits Teknisk Museum for the day

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
* As a contestant, it would be nice if I could easily choose my team if it has already been registered, to avoid duplicate teams.
* As a contestant, I want to identify myself to the event organizer at weigh-in using my identifier.
* As an organizer, I want to approve the robot at weigh-in by scanning the identifier.
* As an organizer, I need to be able to edit and delete robots
* As a contestant, I want to update my registration details
* As a contestant, it would be nice if I could access "My page" to see info relevant for me
  * See list of my heats
  * Edit my robot details

### 3 Live schedule and results
* As a contestant, I want to see what the timetable for the day of the event looks like
* As an organizer, I need to be able to update the schedule

### 4 Live Folkrace (lap counter)
* As a participant I need to be able to see the finalresults
* As a participant I want to see the scores as they are given during the race
  * Either automatically increment/decrement scores using an automatic lap timer-system,
  * or manualy by judges during race
* As a participant I need to be able to see the 3 min counter
* As a participant I wish I could view the results live on my phone
* As an organizer I need to be able to quickly determine who won the heats and entire competition
* As an organizer I need to be able to start and stop the race

### 5 Event information
* As a participant I need to be able to find directions
  * Google Maps
  * Public transport information
* As a participant I need to know when the event starts and ends
* As a participant I need to be able to contact the organizers if I have a question
* As a participant I need to find the rules
* As a participant I need to know which competitions (folkrace, minisumo, linefollower, etc) there are
* As a participant/visitor I want to be able to easily find and like the NorBot facebook page

### 6 Administration
* As an organizer I need to be able to login as administrator
* As an organizer I wish I could send ad-hoc SMS's to one or more participants
