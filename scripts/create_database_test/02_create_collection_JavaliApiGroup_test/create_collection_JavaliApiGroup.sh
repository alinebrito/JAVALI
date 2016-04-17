##
#	Cria a coleção javaliApiGroup, onde os registros de popularidade são agrupados. Database para testes.
#
#	Exemplo da estrutura criada:
# {
# 		"_id" : "java.util.List",
# 		"value" : {
# 			"OccurrenceFile" : 1.0000000000000000,
# 			"OccurrenceProject" : 1.0000000000000000
# 		}
# }
#
#	Onde:
#		_id: nome da API;
#		value.OccurrenceFile: quantidade de vezes que a api foi importada.
#		value.OccurrenceProject: quantidade de projetos distintos onde a API foi encontrada.
#	
#	Para executar utilize: sh importsByProjectAndFile.sh
#

mongo < create_collection_JavaliApiGroup.js
