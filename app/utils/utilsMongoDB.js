/*
	Módulo com funções utilitárias para conexão e acesso MongoDB.
*/
var mongoClient = require('mongodb').MongoClient;
var host = 'mongodb://127.0.0.1:27017/';

var utils = require('./utilsTools');

var dbName = 'JAVALI';
var nameCollectionApi = "javaliApiGroup";
var nameCollectionLibrary = "javaliApi";
var nameCollectionTopApis = "javaliTopApis";
var nameCollectionLibraryProccessed= "javaliLibraries";

var dbUrl = host + dbName;
var db = null;
var collection = null;

module.exports = {
  connectMongoDB: function (callback) {
	  	if(!db){
	  		utils.logInfo("Estabelecendo conexão com MongoDB... ");
				mongoClient.connect(dbUrl, function (err, dbMongo) {
					if(err) {
				  		utils.logError("Erro ao conectar em " + dbUrl);
					}
					else{
						utils.logInfo("Conectado em " + dbUrl);
						db = dbMongo;
						callback();	
					}
				});
			}
			else{
				 callback();	
			}
	},
	getDB: function(){
		return db;
	},
	getCollectionLibrary: function(){
		return db.collection(nameCollectionLibrary);
	},
	getCollectionLibraryProccessed: function(){
		return db.collection(nameCollectionLibraryProccessed);
	},
	getCollectionApi: function(){
		return db.collection(nameCollectionApi);
	},
	getCollectionTopApis: function(){
		return db.collection(nameCollectionTopApis);
	},
	// Query para eliminar imports quem contém .* ao final da consulta.
	filterNotAsterisk: function(){
			return {'$not': /\.\*$/}
	},
	//Query para selecionar strings que começam com a subtring(library) informada.
	filterContainsLibrary: function(library){
		return eval("/^" + library + "\\./");
	},

	filterContainsString: function(key){
		return eval("/\\." + key + "\\./");
	},

	// Query para ordenar registros por quantidade de projetos, arquivos e ordem alfabética.
	filterOrder: function(){
		return {"value.OccurrenceProject": -1,
			"value.OccurrenceFile": -1,
			"_id": 1
		}
	},

	// Query para ordenar registros pelo indice
	filterOrderByIndex: function(){
		return {"index": 1}
	}
}
