//Calcula a porcentagem da ocorrência, 3 casas decimais.
var calcOccurrence = function(val, scope){
		return parseFloat(val * 100 / scope.allProjects).toFixed(3);
}

//habilita botão
var enabledButton = function(id){
	$('#'+id).removeClass('disabled');
}

//desabilita botão
var disabledButton = function(id){
	$('#'+id).addClass('disabled');
}