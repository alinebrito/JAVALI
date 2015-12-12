/**
 * Script para ler os registros do arquivo de entrada e inserir no banco de dados MongoDB,
 * collection 'outputBOA_api'.
 *
 * Estrutura do arquivo de entrada esperado:
 * 	API[nameProject][api] = occorrence
 *  Onde:
 *  	nameProject: nome do projeto.
 *  	api: nome da API.
 *  	occurrence: quantidade de vezes que a API apareceu no projeto.
 *  	
 *  Para executar utilize:
 *  	node create_collection_outputBOA_api.js
 *
 * Configuração inicial: 
 * 	path: diretório onde o arquivo encontra-se.
 *  nameFile: nome do arquivo de entrada. (disponível em: http://boa.cs.iastate.edu/boa/index.php?q=boa/job/public/15965)
 */

// -------
var path = "/home/aline/PROJETO_BOA/";
var nameFile = "boa-job15965-output.txt";
// -------

var file = path + "/" + nameFile;

// Dados para conexão com o MongoDB
var host = 'mongodb://127.0.0.1:27017/';
var dbName = 'outputBOA';
var dbUrl = host + dbName;
var db = null;
var collection = null;
var nameCollection = "outputBOA_api";

var lineReader = require('line-reader');
var MongoClient = require('mongodb').MongoClient;

var i =0;
var insertRegistry = function(registry, last){
	collection.insert([registry], function (err, result) {
		      if (err) {
		        	console.log("ERRO: " + err);
		      } 
		      else {
		        	//console.log("Inserindo registro: " + registry.Project + " - " + registry.Import);
		      }
		      if(last){ // Se último registro, encerra a conexão.  	
		      	console.log("Encerrando Conexão!");
		      	console.log("Parser concluído!");
		      	db.close();
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
	console.log("\nIniciando o processamento...");
	MongoClient.connect(dbUrl, function(err, dbMongo) {
		  if(err) {
		  	console.log("\nErro ao conectar em " + dbUrl);
		  }
		  else{
		  		db = dbMongo;
			  	collection = dbMongo.collection(nameCollection);
			  	console.log("\nConectado com " + dbUrl);
			  	console.log("\nIniciando parser do aquivo " + nameFile + "...\n");
			  	parserFile();
		  }

	});
}

initParser();










