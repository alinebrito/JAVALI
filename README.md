# JAVALI
Discover and compare Java Libraries and Interfaces

Everyday, libraries/frameworks are updated, created or removed, and so their APIs. Such changes may impact stakeholders such as API providers and clients. In this context, it is important for API providers to know strategic information like API change impact on clients and popularity over competitors. On the client side, it is interesting to compare APIs in order to select the most recommended in the market. To address these challenges, we propose JAVALI, a tool that allows to compare and to categorize Java APIs. Our database is composed of around 260K Java projects and 131M APIs. Our web interface provides features to view and export the results.

##Dataset

Data were collected through the [Boa Language and Infrastructure](http://boa.cs.iastate.edu/) . We database contains: 
* 263.425 Java projects;
* 16.386.193 Java files;
* 131.147.733 Java imports;
* 4.780.469 imports distincts;
* 3.803.539 imports belong to a single project.

We use the GitHub database's of Boa Project . We use projects with valid Java files and at least one import.

##Installation 

* Install [Node.js](https://nodejs.org/en/).

* Install [MongoDB](https://www.mongodb.org/).

* Download project JAVALI and install Node.js modules.

  ```
  cd JAVALI/
  npm install
  ```
* Download the [file input Boa](http://boa.cs.iastate.edu/boa/?q=boa/job/public/15965), to create the database.
* Execute the [scrips](https://github.com/alinebrito/JAVALI/tree/master/scripts/create_database), to create database outputBOA.

   ```
  node create_collection_outputBOA_api.js
  sh create_collection_outputBOA_api_group.sh
  ```
* Start the application server.

   ```
  node server.js
  ```
* Using your browser, access the url below to open the tool JAVALI.

   ```
  http://localhost:8080/
  ```
