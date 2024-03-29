
//Murano Design


//------------------------------------------------------------------------------------------------------------------------

//Carregas as variaveis padrao

	var HtmlContent;
	var contador;
	var conf;
//------------------------------------------------------------------------------------------------------------------------

//Carrega os valores utilizados do BD

	var dataAlunoVariavel;
	var dataPlanejamentoRoteiro;
	var dataObjetivo 			=	getData("Objetivo", null);
	var dataCalendarioEventos 	=	getData("Calendario", null);
	
	var dataGrupo;
	//var dataGrupo 				=	getData("Grupo", null); 


//------------------------------------------------------------------------------------------------------------------------

//Get Usuario Efetivado

	var userID = usuarioId;
	var IDProfessor = getAlunoByUsuario(userID);
	//var alunoID = getAlunoByUsuario();

//------------------------------------------------------------------------------------------------------------------------

//Carrega a funçao de Load do JQuery

$(document).ready(function () {

	CarregaServicoCalendarioEventos();
	CarregaServicoMural();

	if (verificaTutor(IDProfessor) == 1) {	
		dataGrupo = getData('ProfessorFuncionario/ProfessorGrupo', IDProfessor)
		CarregaServicoGrupo();
		$("#graficoTutor").show();
	}else{
		$("#pesquisaAlunos").show();
        carregaAnoEstudo();
    	carregaPeriodo("aluno");
    	carregaAlunos("todos");
	}

	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
    {
    	window.setTimeout(function () {
    		$(".mCSB_container")[1].style.left = 0;
    	}, 2000);
    }

});

//------------------------------------------------------------------------------------------------------------------------

//Carrega a tabela CalendarioEventos

function CarregaServicoCalendarioEventos()
{
	HtmlContent = "";
	var dataCalendario 	=	getData("Calendario/Evento", 46);

	for(var a = 0; a < dataCalendario.length; a++)
	{			
		if (a<5){
		HtmlContent += '<div class="Conteudo_Coluna3_Agenda_Evento">';

		HtmlContent += '<div class="Conteudo_Coluna3_Agenda_Evento_Conteudo">'+ dataCalendario[a].evento;
		HtmlContent += '<div class="Conteudo_Coluna3_Agenda_Evento_Titulo">' + 
		dataCalendario[a].dataInicio.substring(8, 10)+"/"+ dataCalendario[a].dataInicio.substring(5, 7)+"/"+ dataCalendario[a].dataInicio.substring(0, 4)+
		'</div>';
		HtmlContent +='<div class="Conteudo_Coluna3_Agenda_Evento_Hora">'+
			dataCalendario[a].hora+
		'</div>';
				
		if(dataCalendario[a].imagem != "" && dataCalendario[a].imagem != null && dataCalendario[a].imagem != undefined){HtmlContent +='<br /><img src="'+dataCalendario[a].imagem+'" width="80%" style="margin-left: 14px;"/>';}
		HtmlContent+='</div>';

		HtmlContent += "</div>";
		}
		else{

		 HtmlContent += '<div class="Conteudo_Coluna3_Agenda_Evento AgendaNulo">';

		HtmlContent += '<div class="Conteudo_Coluna3_Agenda_Evento_Titulo">' + 
		dataCalendario[a].dataInicio.substring(8, 10)+"/"+ dataCalendario[a].dataInicio.substring(5, 7)+"/"+ dataCalendario[a].dataInicio.substring(0, 4)+ '</div>';


		HtmlContent += '<div class="Conteudo_Coluna3_Agenda_Evento_Conteudo">'+ dataCalendario[a].evento;
		if(dataCalendario[a].imagem != "" && dataCalendario[a].imagem != null && dataCalendario[a].imagem != undefined){HtmlContent +='<br />'+dataCalendario[a].imagem;}
		HtmlContent+='</div>';

		HtmlContent += "</div>";

		}
	}
	
	$('#Light_Eventos_Tabela').append(HtmlContent);
	OrdenarPor("Conteudo_Coluna3_Agenda_Evento_Titulo");
	$(".Conteudo_Coluna3_Agenda_Evento").css("display","none");
	for(var l = 0; l < 5; l++)
	{
		if (document.getElementsByClassName("Conteudo_Coluna3_Agenda_Evento")[l]!=undefined)
		{
			document.getElementsByClassName("Conteudo_Coluna3_Agenda_Evento")[l].style.display="block";
		}

	}
}


function CarregaServicoMural()
{
	HtmlContent = "";
	var dataCalendarioM 	=	getData("Calendario/Evento", 44);
	console.log(dataCalendarioM);
	
	for(var a=0; a< dataCalendarioM.length; a++)
	{
		var dataM = dataCalendarioM[a].dataInicio.substring(8, 10)+"/"+ dataCalendarioM[a].dataInicio.substring(5, 7)+"/"+ dataCalendarioM[a].dataInicio.substring(0, 4);
			
		HtmlContent+='<tr>'+
					'<td class="dataMsg" onclick="window.location=\'#\';" style="background-color:rgb(247, 242, 222); line-height: 13px;">'+
						'<span>'+
						'<h2 style="color:rgb(218,93,48); margin-top:0px;float:left;">'+dataCalendarioM[a].evento+'</h2>'+
						'</span>'+
						'<p style="clear: both;margin-bottom: 10px;"></p>'+
						'<span>'+
						'<h3 style="margin-bottom:0px;font-weight: 100;">'+dataCalendarioM[a].descricao+'</h3>'+
						'</span>'+
					'</td>'+
					'<td style="background-color:rgb(247, 242, 222); line-height: 13px;">'+
					'<span>'+
					'<h2 class="dataMural">'+dataM+'</h2>'+	
					'</span>'+
					'<span>'+				
					'<h2 class="horaMural">'+dataCalendarioM[a].hora+'</h2>'+
					'</span>'+
					'</td>'+
				'</tr>';
	}

	$('#Light_MuralTabela').html(HtmlContent);
}


//------------------------------------------------------------------------------------------------------------------------

//Carrega a tabela Grupo

	function CarregaServicoGrupo()
	{

		var HTMLContente="";

		LimiteAluno = 0;
		
		for(var a=0; a< dataGrupo.length; a++)
		{
				
					dataAlunoVariavel = getData('AlunoVariavel/grupo',dataGrupo[a].idgrupo);
					console.log(dataAlunoVariavel);
					for(var b=0; b< dataAlunoVariavel.length; b++)
					{

						var LimiteTT =0;
						var LimiteAnterior = 0;
						var LimiteProximo = 0;

						$.ajax({
							url:path+"PlanejamentoRoteiro/ListarTotal/"+dataAlunoVariavel[b].aluno.idAluno ,
							type:"GET",
							async:false,
							success: function(data){
								LimiteTT = data;
							}
						});
						
						$.ajax({
							url: path+"PlanejamentoRoteiro/HashAtribuicao/"+dataAlunoVariavel[b].aluno.idAluno,
							type:"GET",
							async:false,
							success: function(data){
								LimiteAnterior = data.LimiteAnterior;
								LimiteProximo =  data.LimiteProximo;
							}
						})

						var completos = 0;
						var completosAnterior = 0;
						var completosProximo = 0;
						var SerieAtualCorrigidoCont = 0;
						var SerieAnteriorCorrigidoCont = 0;
						var SerieProximaCorrigidoCont = 0;
						var completoshash2 = 0;
						var completosAnteriorhash2 = 0;
						var completosProximohash2 = 0;
						var completoshash3 = 0;
						var completosAnteriorhash3 = 0;
						var completosProximohash3 = 0;
						
						$.ajax({
							url: path+"PlanejamentoRoteiro/HashStatus2/"+dataAlunoVariavel[b].aluno.idAluno,
							type:"GET",
							async:false,
							success: function(data){						
								completoshash2 = data.completos;
								completosAnteriorhash2 = data.completosAnterior;
								completosProximohash2 = data.completosProximo;
								
							}
						})
						
						$.ajax({
							url: path+"PlanejamentoRoteiro/HashStatus3/"+dataAlunoVariavel[b].aluno.idAluno,
							type:"GET",
							async:false,
							success: function(data){			
								completoshash3 = data.completos;
								SerieAtualCorrigidoCont = data.completos;	
								completosAnteriorhash3 = data.completosAnterior;
								SerieAnteriorCorrigidoCont = data.completosAnterior;	
								completosProximohash3 = data.completosProximo;
								SerieProximaCorrigidoCont =data.completosProximo;
							}
						})
						
						completos = completoshash2 + completoshash3;
		
	
						LimiteAluno++;
						SerieAtual = 0;
						SerieAtualCorrigido = 0;

						if(LimiteAnterior != 0)
						{
							SerieAnterior = ((completosAnterior/LimiteAnterior) * 100);
							if (SerieAnteriorCorrigidoCont != 0){
								SerieAnteriorCorrigido = (SerieAnteriorCorrigidoCont/completosAnterior) * 100;
							}else{
								SerieAnteriorCorrigido = 0;
							}
						}

						if(LimiteTT != 0)
						{
							SerieAtual = (completos/LimiteTT) * 100;
							if(SerieAtualCorrigidoCont != 0){
								SerieAtualCorrigido = (SerieAtualCorrigidoCont/completos) * 100;
							}else{
								SerieAtualCorrigido = 0;
							}
						}

						if(LimiteProximo != 0)
						{
							SerieProxima = (completosProximo/LimiteProximo) * 100;
							if (SerieProximaCorrigidoCont != 0){
								SerieProximaCorrigido = (SerieProximaCorrigidoCont/completosProximo) * 100;
							}else{
								SerieProximaCorrigido = 0;
							}
						}



						HTMLContente+='<div class="Grafico_Individual_Aluno">';
						HTMLContente+='<div class="Grafico_Individual_Aluno_Falta_Numero">'+presencaAluno(dataAlunoVariavel[b].aluno.idAluno)+'</div>';
						HTMLContente+='<div class="Grafico_Individual_Aluno_Escala">';
						
						if (LimiteAnterior == 0 && LimiteProximo == 0)
						{
							HTMLContente+='<div class="Porcentagem_Objetivos_Serie_Atual Porcentagem_Center" style="height:'+(SerieAtual)+'%;">';
							HTMLContente+='<div class="Porcentagem_Objetivos_Serie_Atual_Corrigido" style="height:'+(SerieAtualCorrigido)+'%;"></div>';
							HTMLContente+='</div>';
						}
						else if(LimiteProximo != 0)
						{
							HTMLContente+='<div class="Porcentagem_Objetivos_Serie_Atual Porcentagem_Left" style="height:'+(SerieAtual)+'%;">';
							HTMLContente+='<div class="Porcentagem_Objetivos_Serie_Atual_Corrigido" style="height:'+(SerieAtualCorrigido)+'%;"></div>';
							HTMLContente+='</div>';
							HTMLContente+='<div class="Porcentagem_Objetivos_Serie_Proxima Porcentagem_Right" style="height:'+(SerieProxima)+'%;">';
							HTMLContente+='<div class="Porcentagem_Objetivos_Serie_Proxima_Corrigido" style="height:'+(SerieProximaCorrigido)+'%;"></div>';
							HTMLContente+='</div>';
						}
						else if(LimiteAnterior != 0)
						{
							HTMLContente+='<div class="Porcentagem_Objetivos_Serie_Anterior Porcentagem_Left" style="height:'+(SerieAnterior)+'%;">';
							HTMLContente+='<div class="Porcentagem_Objetivos_Serie_Anterior_Corrigido" style="height:'+(SerieAnteriorCorrigido)+'%;"></div>';
							HTMLContente+='</div>';
							HTMLContente+='<div class="Porcentagem_Objetivos_Serie_Atual Porcentagem_Right" style="height:'+(SerieAtual)+'%;">';
							HTMLContente+='<div class="Porcentagem_Objetivos_Serie_Atual_Corrigido" style="height:'+(SerieAtualCorrigido)+'%;"></div>';
							HTMLContente+='</div>';
						}
						HTMLContente+='</div>';
						if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
							HTMLContente+='<a href="mRelatorioAluno.html?ID='+(base64_encode(""+dataAlunoVariavel[b].aluno.idAluno))+'"><div class="Grafico_Individual_Aluno_Foto_Hover" nomeAluno="'+dataAlunoVariavel[b].aluno.nome+'">';
						else
							HTMLContente+='<a href="relatorioAluno.html?ID='+(base64_encode(""+dataAlunoVariavel[b].aluno.idAluno))+'"><div class="Grafico_Individual_Aluno_Foto_Hover" nomeAluno="'+dataAlunoVariavel[b].aluno.nome+'">';
						HTMLContente+='<img src="'+dataAlunoVariavel[b].aluno.fotoAluno+'"></img>';
						HTMLContente+='</div></a></div>';

					}
			//	}
			//}
		}


		if(LimiteAluno < 22)
		{

			$('#Grade_Aluno_Grafico_Mask').css("width",""+(924)+"px");
			$('.Grafico_Individual_Aluno_Overflow').css("width",""+(924)+"px");
			$('.Grafico_Individual_Aluno_Overflow').html(HTMLContente);

		} else {
			$('#Grade_Aluno_Grafico_Mask').css("width",""+(LimiteAluno*42)+"px");
			$('.Grafico_Individual_Aluno_Overflow').css("width",""+(LimiteAluno*42)+"px");

			$('.Grafico_Individual_Aluno_Overflow').html(HTMLContente);
		}			
			$('body').append('<div class="aluno_foco"> </div>');
			//inicio implementação ouro fino
			$(".Grafico_Individual_Aluno_Foto_Hover").mouseover(function(event){
				var px = event.pageX;
				var py = event.pageY;
				$('.aluno_foco').html($(this).attr("nomeAluno"));
				var w = $('.aluno_foco').width();
				var h = $('.aluno_foco').height();
				//console.log(w);
				
				$('.aluno_foco').css("left",(px-w)+"px");
				$('.aluno_foco').css("top",(py+(h*2))+"px");
				$('.aluno_foco').show();
			})
			.mouseout(function(){
				$('.aluno_foco').hide();
			});
	}
//------------------------------------------------------------------------------------------------------------------------

//Funcao pra ordenar as classes e afins pela sua ordem alfabetica

	function OrdenarPor(TString)
	{				

		$('#Conteudo_Coluna3_Agenda_Evento_Content').find('.Conteudo_Coluna3_Agenda_Evento').sort(function(x,b){
	        		return x.getElementsByClassName(TString)[0].innerHTML.substring(8, 10)+x.getElementsByClassName(TString)[0].innerHTML.substring(5, 7)+x.getElementsByClassName(TString)[0].innerHTML.substring(0, 2) > b.getElementsByClassName(TString)[0].innerHTML.substring(8, 10) + b.getElementsByClassName(TString)[0].innerHTML.substring(5, 7) + b.getElementsByClassName(TString)[0].innerHTML.substring(0, 2);
	       }).appendTo($('#Conteudo_Coluna3_Agenda_Evento_Content'));
	}


//-------------------------------------------------------------------------------------------------------------------------

//Retorno de planejamentos do aluno especifico

function carregaAlunos(todos){

	$("#nomeAluno").val('');
	
	var dataAlunoVariavel = getData("AlunoVariavel", null);	
	var HtmlContent = "";
	var anoEstudo = $("#PesqAnoEstudo").val();
	var periodo = $("#periodo").val();	
	
	for(var a=0;a<dataAlunoVariavel.length; a++)
	{

		HtmlContent += '<tr id="aluno" onClick="visualizar('+dataAlunoVariavel[a].aluno.idAluno+')">'+
							'<td class="alunoNome">'+dataAlunoVariavel[a].aluno.nome+'</td>'+
							'<td class="alunoAno">'+dataAlunoVariavel[a].anoEstudo.ano+'º Ano</td>'+
							'<td class="alunoPeriodo">'+dataAlunoVariavel[a].periodo.periodo+'</td>'+
						  '</tr>';
			
		
	}	
	$('#lista').html(HtmlContent);
}

function visualizar(idAluno){
	localStorage.setItem("alunoEdt",idAluno);
	location.href='relatorioAluno.html?ID='+base64_encode(""+idAluno);
	return false;
}