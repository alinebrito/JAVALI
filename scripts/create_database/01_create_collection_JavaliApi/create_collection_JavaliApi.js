/**
 * Script para ler os registros do arquivo de entrada e inserir no banco de dados MongoDB,
 * collection 'javaliApi'.
 *
 * Estrutura do arquivo de entrada esperado:
 * 	API[ project (string) ][ api (string) ]  = occorrence (int)
 *  Onde:
 *  	occurrence: quantidade de vezes que a API foi importada no projeto.
 *  	
 *  Para executar utilize:
 *  	node create_collection_JavaliApi.js
 *
 * Configuração inicial: 
 * 	path: diretório onde o arquivo encontra-se.
 *  nameFile: nome do arquivo de entrada. 
 *  
 *  Arquivo de entrada disponível em: http://boa.cs.iastate.edu/boa/index.php?q=boa/job/public/33067
 */

// -------
var path = "./";
var nameFile = "input_javali.txt";
// -------

var file = path + "/" + nameFile;

// Dados para conexão com o MongoDB
var host = 'mongodb://127.0.0.1:27017/';
var dbName = 'JAVALI';
var dbUrl = host + dbName;
var db = null;
var collection = null;
var nameCollection = "javaliApi";

var lineReader = require('line-reader');
var MongoClient = require('mongodb').MongoClient;

var insertRegistry = function(registry, last){
	collection.insert([registry], function (err, result) {
		      if (err) {
		        	console.log("ERROR: " + err);
		      } 
	       	else {
	        	console.log(registry.Project + " - " + registry.Import);
	       	}
		      if(last){ // Se último registro, encerra a conexão.  	
		      	console.log("\nSuccessfully created collection! \n");
		      	//db.close();
		      }
		 });
}

var parserFile = function(){

	//last == true se fim do arquivo.
	lineReader.eachLine(file, function(line, last) {
	    
		//Quebra a linha em um vetor (nameProject, import, occurrence)
		var data = line.replace("API[", "").replace("][", " ").replace("] = ", " ");
		data = data.split(" ");

		var registry = new Object();
		registry.Project =  data[0];

		if(data.length > 3){
			registry.Import = data[2];
			registry.Occurrence = Number(data[3]);
		}
		else{
			registry.Import = data[1];
			registry.Occurrence = Number(data[2]);
		}
		insertRegistry(registry,last);
	});
}


var initParser = function(){
	console.log("\nStarted process...");
	MongoClient.connect(dbUrl, function(err, dbMongo) {
		  if(err) {
		  	console.log("\nError connecting in " + dbUrl);
		  }
		  else{
		  		db = dbMongo;
			  	collection = dbMongo.collection(nameCollection);
			  	console.log("\nConnected to " + dbUrl);
			  	console.log("\nReading file " + nameFile + "...\n");
			  	parserFile();
		  }

	});
}

initParser();