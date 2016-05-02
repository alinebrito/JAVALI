var utilsDB = require('./utils/utilsMongoDB');
var utils = require('./utils/utilsTools');
var config = require('./config');

var size = 5; //quantidade de regitros retornados.

// Retorna as 5 top interfaces, a partir do limit.
// Registros são ordenados pelo índice, e 
// @limit: próxima posição a ser lida no ranking.
var findTopApi = function(res, limit){
	 	utilsDB.connectMongoDB(function(){
		utilsDB.getCollectionTopApis().find({})
		.sort(utilsDB.filterOrderByIndex())
		.skip(limit)
		.limit(size) //retorna 5 regitros
		.toArray(function(err, resp){
			if(err){
				utils.logError(err);
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
				utils.logError(err);
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
var findListApiByLibrary = function(res, list, s){
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
		.skip(s)
		.limit(size)
		.toArray(function(err, resp){
			if(err){
				utils.logError(err);
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
		
	var result = []; //resultado retornadado.
	var resultProcessed = []; //Bibliotecas encontradas na tabela processada.
	var resultNotProcessed = []; //Bibliotecas encontradas na tabela de dados brutos.
	
	utilsDB.connectMongoDB(function(){
		utilsDB.getCollectionLibraryProccessed().find({"_id": {$in: list} })
		.sort(utilsDB.filterOrder())
		.toArray(function(err, r){
			//Se todos os regitros foram encontrados na coleção processada,
			//retorna os resultados.
			if(r.length === list.length ){
				res.json(r);//retorna resultado.
			}

			//Caso contrário, busca a biblioteca entre os dados brutos.
			else{
					//identifica bibliotecas que possuem resultado processado.
					for(var i=0; i<r.length; i++){
						resultProcessed.push(r[i]._id)
						result.push(r[i]);
					}

					//identifica bibliotecas que não possuem resultado processado.
					for(var i=0; i<list.length; i++){
							if(!(resultProcessed.indexOf(list[i]) > -1)){
								resultNotProcessed.push(list[i]);
							}
					}

					//Consulta as bibliotecas não processadas na base de dados brutos.
					resultNotProcessed.forEach(function(library, index){
						utilsDB.connectMongoDB(function(){
							utilsDB.getCollectionLibrary().aggregate([
					     { $match: {"Import" : utilsDB.filterContainsLibrary(library) } },
					     { $group: { _id: "$Project"}}
								]).toArray(function(err, resp){
								if(err){
									utils.logError(err);
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
		});
	});
}

// Retorna todas as API's e respectivas informações sobre popularidade, desde que a API pertença
// a uma da libraries contidas na lista recebida como parâmetro, e possua a chave
// recebida. Registros ordenados  por quantidade de 	projetos, arquivos e ordem alfabética. 
// @list: Exemplo: ["java.util", "org.apache"]
var findListApiByLibraryAndString = function(res, list, s, key){
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
		query["$and"].push({ '_id': utilsDB.filterContainsString(key)})

		//Executa a query.
		utilsDB.getCollectionApi().find(query)
		.sort(utilsDB.filterOrder())
		.skip(s)
		.limit(size)
		.toArray(function(err, resp){
			if(err){
				utils.logError(err);
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
var findListLibraryByString = function(res, list, key){
	var result = [];
	list.forEach(function(library, index){
		utilsDB.connectMongoDB(function(){
			utilsDB.getCollectionLibrary().aggregate([
			{ $match: { $and: [ { "Import" : utilsDB.filterContainsLibrary(library) }, { "Import" : utilsDB.filterContainsString(key)}]} },
	     { $group: { _id: "$Project"}}
				]).toArray(function(err, resp){
				if(err){
					utils.logError(err);
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

	app.post('/api/findTopApi',  function(req, res) {
		if(req.body.limit != null){
			findTopApi(res, Number(req.body.limit));
		}
	});

	app.post('/api/findListApi',  function(req, res) {
		if(req.body.listFilter != null){
			var list = utils.formartList(req.body.listFilter);
			findListApi(res, list);
		}
	});

	app.post('/api/findListApiByLibrary', function(req, res) {
		if(req.body.listFilter != null){
			var list = utils.formartList(req.body.listFilter);
			var limit = Number(req.body.limit)
		  var limitQuery = 0;
		  if(limit != null){
		  	limitQuery = limit;
		  }
			findListApiByLibrary(res, list, limitQuery);
		}
	});

	app.post('/library/findListLibrary', function(req, res) {
		if(req.body.listFilter != null){
			var list = utils.formartList(req.body.listFilter);
			findListLibrary(res, list);
		}
	});

	app.post('/api/findListApiByLibraryAndString',  function(req, res) {
		if(req.body.listFilter != null){
			var list = utils.formartList(req.body.listFilter);
			var key = req.body.contains;
			var limit = Number(req.body.limit)
		  var limitQuery = 0;
		  if(limit != null){
		  	limitQuery = limit;
		  }
			findListApiByLibraryAndString(res, list, limitQuery, key);
		}
	});

		app.post('/library/findListLibraryByString', function(req, res) {
		if(req.body.listFilter != null){
			var list = utils.formartList(req.body.listFilter);
			var key = req.body.contains;
			findListLibraryByString(res, list, key);
		}
	});
	
	app.post('/javali/info', function(req, res) {
		 res.json(config.info());
	});

	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});
	
};
