# JAVALI
Discover and compare Java Libraries and Interfaces

Everyday, libraries are updated, created or removed, and so their APIs. Such changes may impact stakeholders such as APIs providers and clients. In this context, it is important for APIs providers to know about strategic information like APIs change impact on clients and popularity over competitors. On the client side, it is interesting to compare APIs in order to select the most recommended in the market. To address these challenges, we propose JAVALI, a tool to analyze the popularity of Java APIs. Our database is composed of around 260K Java projects and 131M APIs. Our Web interface provides features to view and to export the results. We also report usage examples of JAVALI to solve real world API issues.

##Dataset

Data were collected through the [Boa Language and Infrastructure](http://boa.cs.iastate.edu/) . We database contains: 
* 263.425 Java projects;
* 16.386.193 Java files;
* 131.147.733 Java imports;
* 4.780.469 distinct imports.

We use Boa Language and Infrastructure (GitHub dataset). We analyze projects with at least one valid Java file and one import. 

##Installation 

* Install [Node.js](https://nodejs.org/en/).

* Install [MongoDB](https://www.mongodb.org/).

* Download project JAVALI and install Node.js modules.

  ```
  cd JAVALI/
  npm install
  ```
* Download the [file input Boa](http://boa.cs.iastate.edu/boa/index.php?q=boa/job/public/35521), to create the database.

* Execute the [scripts](https://github.com/alinebrito/JAVALI/tree/master/scripts/create_database), to create database outputBOA.

   ```
  node create_collection_JavaliApi.js
  mongo < create_collection_JavaliApiGroup.js
  mongo < create_top_1k_apis.js
  mongo < 1_find_libraries_top_2000.js
  mongo < 2_calc_libraries.js
  mongo < 3_merge_pendentes.js
  ```
* Remove collections javaliLibraries_CALC and test2 javaliLibraries_top_0_and_2000.

* Start the application server.

   ```
  node server.js
  ```
* Using your browser, access the url below to open the tool JAVALI.

   ```
  http://localhost:8080/
  ```
