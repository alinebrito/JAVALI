##
#	Cria a coleção outputBOA_api_group, onde os registros de popularidade são agrupados.
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
#		value.OccurrenceFile: quantidade de arquivos onde a API foi encontrada.
#		value.OccurrenceFile: quantidade de projetos distintos onde a API foi encontrada.
#	
#	Para executar utilize: sh importsByProjectAndFile.sh
#

mongo < importsByProjectAndFile.js
