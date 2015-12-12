

//Criar uma gráfico de barras conforme a lista de imports presente no scopo Angular.
var createChart = function(scope){

	removeChart(); //Limpa o gráfico existente.
	
	var list = scope.imports;

	if(list.length > 0){
		createAreaChart();
		var allProjects = scope.allProjects;
		var labelDefault = "Ocurrence project";
		var yKeyDefault = "ocurrence";
		var	xKeyDefault = "import";
		var listGraph = [];
		var listLabel = [];
		var listYkeys = [];
		var ocurrence = 0;

		for (i in list){

				var registry = list[i];

				//Calcula a porcentagem da ocorrência, 3 casa decimais.
				ocurrence = parseFloat(registry.value.OccurrenceProject * 100 / scope.allProjects).toFixed(3);

				var data = {};
				data.import = registry._id;
				data.ocurrence = ocurrence;

				listGraph.push(data);
				listLabel.push(labelDefault);
		}	
		var angleX = 55;
		var paddingX = 90;
		if(list.length <= 5){
			angleX = 0;
			paddingX = 40;
		}
		//Cria o gráfico.
		var graphBar = Morris.Bar({
			element: 'morris-bar-chart',
			data: listGraph,
			xkey: [xKeyDefault],
			ykeys:  [yKeyDefault],
			labels: listLabel,
			resize: true,
			postUnits: "%",
			xLabelAngle: angleX,
			padding: paddingX,
		});

		enabledButton('saveChart');
	}

	else{
      if(scope.msg != null){
          showMsg();
      }
	}
}

//Cria um gráfico default, com as 5 top API's
var createChartTopDefault = function(scope){
	scope.imports = scope.listTopDefault;
	createChart(scope);
}

//Cria um gráfico default com as APIs informadas na lista (java.util.List, java.util.ArrayList)
var createChartCustomizeDefault = function(scope){
	scope.imports = scope.listCustomizeDefault;
	createChart(scope);
}

//Remove o gráfico exibido e/ou mensagens.
var removeChart = function(){
	$("#panel-default-chart").addClass('remove');
	$("#msg").addClass('remove');
	$("#morris-bar-chart").empty(); //Limpa área do gráfico.
	disabledButton('saveChart');
}

var createAreaChart = function(){
	$("#panel-default-chart").removeClass('remove');
};

//Exibe mensagem no espaço do gráfico.
var showMsg = function(msg){
	$("#msg").removeClass('remove');
}

var saveChart = function(){
	xepOnline.Formatter.Format('area-graph',{ cssStyle:[{width: '120%'}], render:'download'});
}