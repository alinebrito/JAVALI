var utilsDB = require('./utils/utilsMongoDB');
var utils = require('./utils/utilsTools');
var config = require('./config');

// Retorna os  "limit" top imports que são API's, ou seja, não contém .* ao final.
// Registros são ordenados por quantidade de projetos, arquivos e ordem alfabética.
// @limit: quantidade de registros retornados, ou seja, tamanho do ranking.
var findTopApi = function(res, limit){
	utilsDB.connectMongoDB(function(){
		utilsDB.getCollectionApi().find({ '_id': utilsDB.filterNotAsterisk()})
		.sort(utilsDB.filterOrder())
		.limit(limit)
		.toArray(function(err, resp){
			if(err){
				utils.logError("ERRO:" + err);
			}
			else{
				res.json(resp);
			}  
		});
	});
};

// Busca cada API contida na lista recebida como parâmetro. Retorna as informações sobre popularidade
// para as API's encontradas. Registros são ordenados por quantidade de projetos, arquivos e ordem alfabética.
// @list: lista de API's que serão buscadas. Exemplo: ["java.util.ArrayList", "java.util.List"]
var findListApi = function(res, list){
	utilsDB.connectMongoDB(function(){
		utilsDB.getCollectionApi().find({"_id": {$in: list} })
		.sort(utilsDB.filterOrder())
		.toArray(function(err, resp){
			if(err){
				utils.logError("ERRO:" + err);
			}
			else{
				res.json(resp);
			}  
		});
	});
};

// Retorna todas as API's e respectivas informações sobre popularidade, desde que a API pertença
// a uma da libraries contidas na lista recebida como parâmetro. Registros ordenados  por quantidade 
// de 	projetos, arquivos e ordem alfabética. 
// @list: Exemplo: ["java.util", "org.apache"]
var findListApiByLibrary = function(res, list, cols){
	utilsDB.connectMongoDB(function(){
		//Adiciona uma expressão para cada import recebido.
		var or = {}
		or["$or"]=[];
		list.forEach(function(val, i){
			or["$or"].push({"_id": utilsDB.filterContainsLibrary(val)});
		});
		//Contrói a query para retornar todos os imports da lista, desde que não terminem com *.
		var query = {}
		query["$and"]=[];
		query["$and"].push(or)
		query["$and"].push({ '_id': utilsDB.filterNotAsterisk()})
		//Executa a query.
		utilsDB.getCollectionApi().find(query)
		.sort(utilsDB.filterOrder())
		.limit(cols)
		.toArray(function(err, resp){
			if(err){
				utils.logError("ERRO:" + err);
			}
			else{
				res.json(resp);
			}  
		});
	});
}

// Para cada library presente na lista, recupera a quantidade de projetos distintos que a utiliza.
// Ou seja, busca projetos onde pelo menos um import começa com a  substring informada.
//
// Exemplo: Para a library "java.util", teremos 3 projetos que a utiliza (A, B, D);
//			Projeto A: java.util.List, java.util.ArrayList
//			Projeto B: java.util.List
//			Projeto C: org.apache.*
//			Projeto D: java.util.*.
var findListLibrary = function(res, list){
	
	var result = [];

	list.forEach(function(library, index){
		utilsDB.connectMongoDB(function(){
			utilsDB.getCollectionLibrary().aggregate([
	     { $match: {"Import" : utilsDB.filterContainsLibrary(library) } },
	     { $group: { _id: "$Project"}}
				]).toArray(function(err, resp){
				if(err){
					utils.logError("ERRO:" + err);
				}
				else{
					//Formata registro.
					var registry = {};
					registry._id = library;
					registry['value'] = {"OccurrenceProject": Number(resp.length)};

					//Insere registro na lista.
					result.push(registry);

					//Após consultar todas as libraries da lista ordena registros.
					if(result.length === list.length){
						result = utils.sortByOccurrenceProject(result); //ordena registros.
						res.json(result);//retorna resultado.
					}
				}  
			});
		});
	});
}

module.exports = function(app) {

	app.post('/import/top/api',  function(req, res) {
		findTopApi(res, Number(req.body.limit));
	});

	app.post('/import/list/api',  function(req, res) {
		var list = utils.formartList(req.body.listFilter);
		findListApi(res, list);
	});

	app.post('/import/list/api/byLibrary',  function(req, res) {
		var list = utils.formartList(req.body.listFilter);
		var cols = Number(req.body.columns);
		findListApiByLibrary(res, list, cols);
	});

	app.post('/import/list/library', function(req, res) {
		var list = utils.formartList(req.body.listFilter);
		findListLibrary(res, list);
	});

	app.post('/javali/info', function(req, res) {
		 res.json(config.info());
	});

	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});
	
};
