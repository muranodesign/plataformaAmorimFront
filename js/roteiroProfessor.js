//Murano Design


var userID = usuarioId;
 var alunoID = getAlunoByUsuario(userID);
//------------------------------------------------------------------------------------------------------------------------

//Carrega os valores utilizados do BD

// var dataAlunos 					=	getData("Alunos", null);

var dataRoteiro 				=	getData("Roteiro", null);

if(usuario == "Aluno")
{
	var dataUsuario 				=	getData("Usuario/aluno", alunoID);
	var dataAlunoVariavel 			=	getData("AlunoVariavel/aluno", alunoID);
} else {
	var dataUsuario 				=	0;
	var dataAlunoVariavel 			=	0;
}

var dataObjetivo 				=	getData("Objetivo", null);
var dataAtividade 				=	getData("Atividade", null);
var dataProducaoAluno 			=	getData("ProducaoAluno", null);
var dataPlanejamentoRoteiro 	=	getData("PlanejamentoRoteiro/aluno" , alunoID);  

if(dataPlanejamentoRoteiro.constructor !== Array){

var aux = dataPlanejamentoRoteiro;
dataPlanejamentoRoteiro = new Array(1);
dataPlanejamentoRoteiro[0] = aux;


}


if(dataAlunoVariavel.constructor !== Array){

var aux = dataAlunoVariavel;
dataAlunoVariavel = new Array(1);
dataAlunoVariavel[0] = aux;


}

var dataRecursoAprendizagem 	=	getData("RecursoAprendizagem", null);

//------------------------------------------------------------------------------------------------------------------------

//Get Usuario Efetivado


var alunoVariavelID = getAlunoVariavelByAluno();
var AnoEstudoID;


// var PlanoEstudoSessionID = 95;
var dataPlanoEstudo = getData("PlanoEstudo", null);
var PlanoEstudoSessionID = getUltimoPE(alunoID);
//var PlanoEstudoSessionID = getData("PlanoEstudo/aluno", alunoID);

if(PlanoEstudoSessionID.constructor !== Array){

var aux = PlanoEstudoSessionID;
PlanoEstudoSessionID = new Array(1);
PlanoEstudoSessionID[0] = aux;


}


if(PlanoEstudoSessionID[0] !=undefined){
PlanoEstudoSessionID = PlanoEstudoSessionID[0].idplanoEstudo;
}
// if(PlanoEstudoSessionID.constructor !== Array){

// var aux = PlanoEstudoSessionID;
// PlanoEstudoSessionID = new Array(1);
// PlanoEstudoSessionID[0] = aux;


// }

var PortifolioVariavel = 0;
var roteiroAcionado = 0;


//------------------------------------------------------------------------------------------------------------------------

//Carrega variaveis padrao

var IdObjetivo = new Array();
var IdRoteiro = new Array();

//------------------------------------------------------------------------------------------------------------------------

//Carrega a funçao de Load do JQuery

$(document).ready(function(){

	LoadRoteiro();
	VerificaObjetivosCompletos();

	var ContentAno;
	var dataAnoEstudo  =   getData("AnoEstudo", null); 
	
	for(var b=0;b<dataAnoEstudo.length; b++)
	{	
	   ContentAno += "<option value='"+dataAnoEstudo[b].idanoEstudo+"'>"+(dataAnoEstudo[b].ano)+"º</option>";
	}
	$('#anoEstudo').append(ContentAno);
					 

	if(PlanoEstudoSessionID == 0 && usuario == "Aluno")
	{
		mensagemF("Primeiro, precisa criar um Plano de Estudo","OK","bt_ok","alerta","redirect();");
	}


	GerarUpload($("#foto"), $("#Arquivo_Foto_Aluno"), $("#Dados_Foto_Aluno"));



	//setTimeout(function() {LoadAtividade();}, 1100);
});


function redirect()
{
	window.location = 'planoDeEstudo.html';
}

//-----------------------------------------------------------------------------------------------------------------------------------------------

function getElementObjetivoId(IDobjetivo)
{

	var Encontrado = false;
    var ConteudoRetornado = "";



    	for(var a=0; a< dataPlanejamentoRoteiro.length; a++)    	{

	    	if(dataPlanejamentoRoteiro[a].objetivo.idobjetivo == IDobjetivo)
	    	{

	    		if(dataPlanejamentoRoteiro[a].status == 0)
				
	    		{
		//			console.log(dataPlanejamentoRoteiro[a].status);
    				ConteudoRetornado="<div class='titulo_infos_roteiro_caixa_branco' onclick='trocarObjetivoStatusBefore(this,"+IDobjetivo+","+PlanoEstudoSessionID+","+dataPlanejamentoRoteiro[a].idplanejamentoRoteiro+");'>"+dataPlanejamentoRoteiro[a].objetivo.numero+"</div>";
	    		}

	    		else if(dataPlanejamentoRoteiro[a].status == 1)
	    		{
								//	console.log(dataPlanejamentoRoteiro[a].status);
	    			ConteudoRetornado="<div class='titulo_infos_roteiro_caixa_laranja' onclick='trocarObjetivoStatusBefore(this,"+IDobjetivo+","+PlanoEstudoSessionID+","+dataPlanejamentoRoteiro[a].idplanejamentoRoteiro+");'>"+dataPlanejamentoRoteiro[a].objetivo.numero+"</div>";
	    		}

	    		else if(dataPlanejamentoRoteiro[a].status == 2)
	    		{
								//	console.log(dataPlanejamentoRoteiro[a].status);
	    			ConteudoRetornado="<div class='titulo_infos_roteiro_caixa_verde' onclick='trocarObjetivoStatusBefore(this,"+IDobjetivo+","+PlanoEstudoSessionID+","+dataPlanejamentoRoteiro[a].idplanejamentoRoteiro+");'>"+dataPlanejamentoRoteiro[a].objetivo.numero+"</div>";
	    		}

	    		else if(dataPlanejamentoRoteiro[a].status == 3)
	    		{
							//		console.log(dataPlanejamentoRoteiro[a].status);
	    			ConteudoRetornado="<div class='titulo_infos_roteiro_caixa_verde_tk' >"+dataPlanejamentoRoteiro[a].objetivo.numero+"</div>";
	    		}
alert("achou!");
	    		Encontrado = true;

	    	}
			alert("acabo!");

    	}


	if(!Encontrado)
	{
		return "<div class='titulo_infos_roteiro_caixa_branco' onclick='trocarObjetivoStatusBefore(this,"+IDobjetivo+","+PlanoEstudoSessionID+",1);'></div>";
	}

	return ConteudoRetornado;

}




//-----------------------------------------------------------------------------------------------------------------------------------------------


function VerificaObjetivosCompletos()
{

	var NaoEncontrado;

	

	for(var a=0; a < $('.roteiro_nome_tabela_selecionado').length+1; a++)
	{

		NaoEncontrado = false;


		if($(document.getElementsByClassName('roteiro_nome_tabela_selecionado')[a]).find('td').length > 0)
		{
			
			for(var b=1; b < $(document.getElementsByClassName('roteiro_nome_tabela_selecionado')[a]).find('td').length+1; b++)
			{
				if($(document.getElementsByClassName('roteiro_nome_tabela_selecionado')[a]).find('td:nth-child('+b+')').hasClass('td_roteiro_verde') || $(document.getElementsByClassName('roteiro_nome_tabela_selecionado')[a]).find('td:nth-child('+b+')').hasClass('td_roteiro_laranja') || $(document.getElementsByClassName('roteiro_nome_tabela_selecionado')[a]).find('td:nth-child('+b+')').hasClass('td_roteiro_branco'))
				{
					NaoEncontrado = true;
				}
			}
		}

		// console.log(NaoEncontrado);

		if(!NaoEncontrado)
		{
			//Roteiro_Id_
			SubstituirObjetivos($(document.getElementsByClassName('roteiro_nome_tabela_selecionado')[a]).find('td').parent());
		}
	}

}


//-----------------------------------------------------------------------------------------------------------------------------------------------


function SubstituirObjetivos(Classe)
{
	$(Classe).empty();
	$(Classe).attr("Cmpl","true");
  if($(Classe).closest( ".roteiro_nome_tabela_selecionado" ).attr("id") != undefined)
  { 
  	var PortifolioExistenteUpload 	= verificaProducaoExistente(1, ($(Classe).closest( ".roteiro_nome_tabela_selecionado" ).attr("id")).substring(11));
  	var FichasExistenteUpload 		= verificaProducaoExistente(2, ($(Classe).closest( ".roteiro_nome_tabela_selecionado" ).attr("id")).substring(11));
   
   	if(PortifolioExistenteUpload == "" && FichasExistenteUpload == "")
    {
    	$(Classe).append('<td id="producaoTD" style="color:white;font-style:italic;">Roteiro Completo e Corrigido</td>');
    } else if(PortifolioExistenteUpload != "" && FichasExistenteUpload != "") {
    	$(Classe).append('<td id="producaoTD">'+PortifolioExistenteUpload+' | '+FichasExistenteUpload+'</td>');
    } else {
    	$(Classe).append('<td id="producaoTD">'+PortifolioExistenteUpload+' '+FichasExistenteUpload+'</td>');
    }
  }
  
}



//-----------------------------------------------------------------------------------------------------------------------------------------------

function verificaProducaoExistente(Numero, IDRoteiroLocal)
{
	var Encontrado = false;

	if(Numero==1)
	{

		for(var a=0;a< dataProducaoAluno.length; a++)
		{
			if(dataProducaoAluno[a].roteiro.idroteiro == IDRoteiroLocal &&
				dataProducaoAluno[a].aluno.idAluno == alunoID &&
				dataProducaoAluno[a].tipo.idtipoProducaoAluno == 5)
			{
				Encontrado = true;
			}
		}
		
		if(!Encontrado){return '<a style="text-align:right;color:white" onclick="showUpload(1,'+IDRoteiroLocal+');" href="#">Portifolio</a>';}

	} else if(Numero==2) {
		for(var a=0;a< dataProducaoAluno.length; a++)
		{
			if(dataProducaoAluno[a].roteiro.idroteiro == IDRoteiroLocal &&
				dataProducaoAluno[a].aluno.idAluno == alunoID &&
				dataProducaoAluno[a].tipo.idtipoProducaoAluno == 4)
			{
				Encontrado = true;
			}
		}
		
		if(!Encontrado){return '<a style="text-align:right;color:white" onclick="showUpload(2,'+IDRoteiroLocal+');" href="#">Fichas de Finalização</a>';}
	}


	return "";
}


//-----------------------------------------------------------------------------------------------------------------------------------------------

		
function LoadRoteiro(){
	$('.total').html("");
	var Limite;
	var HtmlContent;
		var opAno = $("#anoEstudo").val();
  		if(opAno!="Selecione"){
			var dataRoteiroAno  =   getData("Roteiro/RoteiroAno/"+opAno); 
			Limite = dataRoteiroAno.length;	
		}
			
       	HtmlContent = "";
		
		/*var opId = combo.selectedIndex;
		var opAno = combo.options[opId].value;*/
		
        if(Limite!=0){
			for(var a = 0; a < Limite; a++)
        	{	
					  
				HtmlContent = "";		
				HtmlContent += "<div class='Content_Roteiro_Aluno_"+dataRoteiroAno[a].idroteiro+"'>";	
				HtmlContent += "<div id='Roteiro_Id_"+dataRoteiroAno[a].idroteiro+"' class='roteiro_nome_tabela_selecionado'>"
				HtmlContent += "<div class='roteiro_nome_tabela_texto' onclick='ApareceObj("+dataRoteiroAno[a].idroteiro+")'>";
				HtmlContent += dataRoteiroAno[a].nome;
				HtmlContent += "</div>";
			   /* HtmlContent += "<div class='tabela_colorida_roteiro ocultar'>";
				HtmlContent += "<table>";
				HtmlContent += "<tr class='QuadObj_"+dataRoteiro[a].idroteiro+"'>";
				HtmlContent += "</tr>";
				HtmlContent += "</table>";
				HtmlContent += "</div>";*/
				HtmlContent += "</div>";
	
				$('.total').append(HtmlContent);
				HtmlContent = "";
	
					//Here Objectives
						HtmlContent +=_getObjetivos(dataRoteiroAno[a].idroteiro);
	
					//end
	
				HtmlContent += "</div>";
				HtmlContent += "<div class='box_rigth box_"+dataRoteiroAno[a].idroteiro+"'>";	
				HtmlContent += "<div class='td_titulo_recurso'>Recursos de aprendizagem</div>";
				HtmlContent += "<table class='tb_right'>";
				HtmlContent += getRecursosDeRoteiro(dataRoteiroAno[a].idroteiro);
				HtmlContent += "</table>";
				HtmlContent += "</div>" ;
				HtmlContent += "<div style='clear: both;''> </div>"						
				
				$('.total').append(HtmlContent);
			}
        }


        htmlPopUpContent = '<div class="blackPainel">'+
	        					'<div id="JanelaUploadPortifolio">'+
									'<div class="Titulo_janela_upload">'+
										'Upload de Portifolios'+
										'<div class="close_upload_producao">'+
										'</div>'+
									'</div>'+
									'<div id="foto">'+
									'</div>'+
									'<div id="LegendaUpload">Aguardando Arquivo</div>'+
									'<form id="Cadastro_Producao_Aluno">'+
										'<input type="hidden" id="id" name="id" />'+
										'<input type="hidden" id="action" name="action" value="create" />'+
										'<input type="hidden" id="Dados_Foto_Aluno" />'+
	                        			'<input type="file" id="Arquivo_Foto_Aluno" name="arquivo1" />'+
										'<div class="campoConfirmaUpload">'+
											'<input class="btn_submit" onclick="SalvarPortifolio()" type="button" value="" />'+
										'</div>'+
									'</form>'+
								'</div>'+
							'</div>';

        $('.total').append(htmlPopUpContent);

        $("#Arquivo_Foto_Aluno").change(function(e){
        	$("#LegendaUpload").html("Arquivo Carregado");
        });


		$('.close_upload_producao').click(function(){
			$('.blackPainel').hide();
			$('#Dados_Foto_Aluno').val('');
            $('#Arquivo_Foto_Aluno').val('');
            $('#foto').css("background-image","url(img/foto.png)");
            $("#LegendaUpload").html("Aguardando Arquivo");
		});
	

        LoadAtividade();

}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SalvarPortifolio()
{

	var dataSalvaPortifolio = new Date();

  if(Arquivo != "" &&
    Arquivo != undefined)
  {
  	$.ajax({
      url: path+"ProducaoAluno/",
      type: "POST",
      crossDomain: true,
      dataType: 'json',
      data: "action=create&anoLetivo=8&texto="+$('#Roteiro_Id_'+roteiroAcionado+' .roteiro_nome_tabela_texto').html()+"&data="+dataSalvaPortifolio.getUTCFullYear()+"-"+(dataSalvaPortifolio.getUTCMonth()+1)+"-"+dataSalvaPortifolio.getUTCDate()+"&aluno="+getAlunoByUsuario(usuarioId)+"&tipo="+PortifolioVariavel+"&categoria=3&roteiro="+roteiroAcionado,
          
          success: function(d) {
              addFileTo(d);
              // console.log("Finalizado");
              $('.blackPainel').hide();
          },error: function() {
              alert("Não modificado, verifique os campos3.");
          }
      }); 
  } else {
    alert("por favor, adicione um arquivo")
  }

}



function addFileTo(ID)
{

    var formData = new FormData($('#Cadastro_Producao_Aluno')[0]);
    formData.append("arquivo", Arquivo);
    // console.log(formData);

    $.ajax({
    url: path+"ProducaoAluno/upload/producaoAluno/arquivo/"+ID,
    type: "POST",
    mimeType:"multipart/form-data",
    contentType: false,
    cache: false,
    processData:false,
    data: formData,
        
        success: function(d) {
            //alert("Arquivo Salvo.");


            $('#Dados_Foto_Aluno').val('');
            $('#Arquivo_Foto_Aluno').val('');
            $('#foto').css("background-image","url(img/foto.png)");
            $("#LegendaUpload").html("Aguardando Arquivo");

            dataProducaoAluno 			=	getData("ProducaoAluno", null);


            var PortifolioExistenteUpload 	= verificaProducaoExistente(1, roteiroAcionado);
		  	var FichasExistenteUpload 		= verificaProducaoExistente(2, roteiroAcionado);
		   
		   	if(PortifolioExistenteUpload == "" && FichasExistenteUpload == "")
		    {
		    	$('.QuadObj_'+roteiroAcionado+' #producaoTD').html('<font style="color:white;font-style: italic;">Roteiro Completo e Corrigido</font>');
		    } else if(PortifolioExistenteUpload != "" && FichasExistenteUpload != "") {
		    	$('.QuadObj_'+roteiroAcionado+' #producaoTD').html(PortifolioExistenteUpload+' | '+FichasExistenteUpload);
		    } else {
		    	$('.QuadObj_'+roteiroAcionado+' #producaoTD').html(PortifolioExistenteUpload+' '+FichasExistenteUpload);
		    }


            //Roteiro_Id_
            // console.log($('#Roteiro_Id_'+roteiroAcionado).find('td').parent());
			//SubstituirObjetivos($('#Roteiro_Id_'+roteiroAcionado).find('td').parent());

            //mensagem("Arquivo Salvo!","OK","bt_ok","sucesso");

        },error: function() {
            alert("Não modificado, verifique os campos.");
        }
    }); 
}


//-----------------------------------------------------------------------------------------------------------------------------------------------

function showUpload(Numero, ID)
{
	if(Numero == 1)
	{
		$('.blackPainel').css("display","block");
		PortifolioVariavel = 5;

	} else if(Numero == 2)
	{
		$('.blackPainel').css("display","block");
		PortifolioVariavel = 4;
	}

  roteiroAcionado = ID;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------
function LoadAtividade(){

	var Limite;
	var HtmlContent;
	var idativ = 0;


        Limite = dataAtividade.length;
       	HtmlContent = "";

        for(var a = 0; a < Limite; a++)
        {
        	HtmlContent = "";
    		
    		HtmlContent += "<div class='conteudo_do_roteiro ativ_"+dataAtividade[a].idatividade+"'>";
			HtmlContent += "<table class='TbAtiv'>";
		
			HtmlContent += "<tr>";
			HtmlContent += "<td class='td_ativ'>"+dataAtividade[a].descricao;
			//console.log(dataAtividade[a].descricao);
			
			if(dataAtividade[a].paginaLivro == "")
			{
				HtmlContent += ";</td>"
			}
			else
			{
				HtmlContent += ", p. "+dataAtividade[a].paginaLivro+";</td>";
			}

			HtmlContent += "</tr>";
			HtmlContent += "</table>";
			HtmlContent += "</div>";
			if(dataAtividade[a].objetivo != null){
				$('.Obj_'+dataAtividade[a].objetivo.idobjetivo).append(HtmlContent);
			}          	
        	
        }

}
		 
//-----------------------------------------------------------------------------------------------------------------------------------------------


function getRecursosDeRoteiro(ID)
{
	var Retorno = "";

	for(var a=0; a< dataRecursoAprendizagem.length; a++)
	{
		// console.log(dataRecursoAprendizagem[a].roteiro.idroteiro, ID, dataRecursoAprendizagem[a].roteiro.idroteiro == ID);
		if(dataRecursoAprendizagem[a].roteiro.idroteiro == ID)
		{

			switch (dataRecursoAprendizagem[a].tipoRecursoAprendizagem.idtipoRecursoAprendizagem)
			{
				case 1:imagem ="ic_livro2_peq.png";break;
				case 2:imagem ="ic_video_peq";break;
				case 3:imagem ="ic_audio_peq";break;
				case 4:imagem ="ic_pgweb_peq";break;
				case 5:imagem ="ic_jogo_peq";break;
				case 6:imagem ="ic_foto_peq";break;
			}	


			Retorno += "<tr>";
      		Retorno += "<td class='titulo_recurso'>";
      		Retorno += "<img src='img/"+imagem+".png' width='15' height='auto' alt='"+dataRecursoAprendizagem[a].descricaoRecurso+"'/><a href='"+dataRecursoAprendizagem[a].link+"'>"+dataRecursoAprendizagem[a].nomeRecurso+"</a>";
      		Retorno += "</td>";
      		Retorno += "</tr>";
		}
	}

	return Retorno;
}


//-----------------------------------------------------------------------------------------------------------------------------------------------


function ApareceObj(idRoteiro)
{
	if (!($('.Content_Roteiro_Aluno_'+ idRoteiro + ' .ObjLeft').length > 0))
    {
        $.ajax({
            url: path+"Objetivo/ObjetivoRoteiro/"+idRoteiro,
            type: "GET",
            async:false,
            crossDomain: true,
            beforeSend: function() {
                loading('inicial');
            },
            success: function(dataObjetivoByRoteiro)
            {
                var RetornoHtml = '';
                for (var a = 0; a < dataObjetivoByRoteiro.length; a++)
                {
                    RetornoHtml +=  '<div class="ObjLeft Obj_'+dataObjetivoByRoteiro[a].idobjetivo+'">'+
                                                '<div class="titulo_infos_roteiro">'+
                                                    '<div class="td_roteiro_numero_tabela">'+
                                                        dataObjetivoByRoteiro[a].numero+
                                                    '</div>'+
                                                    '<div class="td_titulo_tabela">'+
                                                        '<a onclick="ApareceAtiv('+dataObjetivoByRoteiro[a].idobjetivo+')">'+
                                                            dataObjetivoByRoteiro[a].nome+
                                                        '</a>'+
                                                        '<div class="titulo_infos_roteiro_botoes">'+
                                                            '<div id="ObjStatus_'+dataObjetivoByRoteiro[a].idobjetivo+'" class="titulo_infos_roteiro_estrela">'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>';
                }
                RetornoHtml +=  '<div class="box_rigth box_'+idRoteiro+'">'+  
                                    '<div class="td_titulo_recurso">Recursos de aprendizagem</div>'+
                                    '<table class="tb_right">'+
                                        getRecursosDeRoteiro(idRoteiro)+
                                    '</table>'+
                                '</div>'+
                                '<div style="clear:both;"></div>';

                $('.Content_Roteiro_Aluno_'+idRoteiro).append(RetornoHtml);
            },
            complete: function() {
                loading('final');
            }
        });
    }
    $('.Content_Roteiro_Aluno_'+ idRoteiro + ' .ObjLeft').toggle();
    $('.Content_Roteiro_Aluno_'+ idRoteiro + ' .box_rigth').toggle();

}


function ApareceAtiv(idObjetivo)
{
	if (!($('.Obj_' + idObjetivo + ' .conteudo_do_roteiro').length > 0))
    {
        $.ajax({
            url: path + 'Atividade/atividadeObjetivo/' + idObjetivo,
            async: false,
            crossDomain: true,
            type: 'GET',
            beforeSend: function() {
                loading('inicial');
            },
            success: function(dataAtividade) {
                for(var a = 0; a < dataAtividade.length; a++)
                {
                    var paginaAtividade;
                    var HtmlContent = '';

                    if(dataAtividade[a].paginaLivro == "")
                    {
                        paginaAtividade = "";
                    }
                    else
                    {
                        paginaAtividade = ", p. " + dataAtividade[a].paginaLivro;
                    }

                    HtmlContent +=  "<div class='conteudo_do_roteiro ativ_"+dataAtividade[a].idatividade+"'>" +
                                        "<table class='TbAtiv'>" +
                                            "<tr>" +
                                                "<td class='td_ativ'>" +
                                                    dataAtividade[a].descricao+
                                                    paginaAtividade +
                                                "</td>" +
                                            "</tr>" +
                                        "</table>" +
                                    "</div>";    
                    $('.Obj_'+idObjetivo).append(HtmlContent);
                    
                }
            },
            complete: function() {
                loading('final');
            }
        });
    }
    $('.Obj_' + idObjetivo + ' .conteudo_do_roteiro').toggle();

}

function trocarObjetivoStatusBefore(Objeto, IDobjetivo, IDplanoEstudo, IDplanejamentoRoteiro)
{

	if(Objeto.className == "titulo_infos_roteiro_caixa_verde")
	{

		alert("P");
		//mensagemF("Deseja realmente Desfazer o Objetivo Completo e torná-lo Planejado?","OK","bt_ok","erro","trocarObjetivoStatus("+Objeto+", "+IDobjetivo+", "+IDplanoEstudo+", "+IDplanejamentoRoteiro+");");
	
	} else {

		trocarObjetivoStatus(Objeto, IDobjetivo, IDplanoEstudo, IDplanejamentoRoteiro)

	}



}

function trocarObjetivoStatus(Objeto, IDobjetivo, IDplanoEstudo, IDplanejamentoRoteiro)
{

	var corVariavel;
	var create = false;
	var statusVariavel;

	var data = new Date();
	var dataAtual = (data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDate());

	if(Objeto.className == "titulo_infos_roteiro_caixa_branco")
	{
	
	 corVariavel = "laranja";
	 statusVariavel = 1;
	 create = true;
	
	} 

	else if(Objeto.className == "titulo_infos_roteiro_caixa_laranja")
	{
	
	 corVariavel = "verde";
	 statusVariavel = 2;
	
	} 

	else if(Objeto.className == "titulo_infos_roteiro_caixa_verde")
	{

	 corVariavel = "laranja";
	 statusVariavel = 1;
	
	} 
	 
	
	if(Objeto.className != "titulo_infos_roteiro_caixa_verde_tk")
	{

		if(create)
		{

			$.ajax({
			    url: path+"PlanejamentoRoteiro/",
			    type: "POST",
			    crossDomain: true,
			    dataType: 'json',
			    data: "id=1&action=create&status="+statusVariavel+"&dataStatusPlanejado="+dataAtual+"&objetivo="+IDobjetivo+"&planoEstudo="+PlanoEstudoSessionID+"&idAluno="+alunoID,
			    success: function(d) {
				document.getElementById('td_roteiro_squr_'+IDobjetivo).className = "td_roteiro_"+corVariavel;
			    	Objeto.className = "titulo_infos_roteiro_caixa_"+corVariavel;
			    	reSetObjetivo(IDobjetivo);
			    	
			    	
			    },error: function(a, b , c) {
				
			    	alert("id=1&action=create&status="+statusVariavel+"&dataStatusPlanejado="+dataAtual+"&objetivo="+IDobjetivo+"&planoEstudo="+PlanoEstudoSessionID+"&idAluno="+alunoID);
			    }
		   	});  



		} else {

			$.ajax({
			    url: path+"PlanejamentoRoteiro/",
			    type: "POST",
			    crossDomain: true,
			    dataType: 'json',
			    data: "id="+IDplanejamentoRoteiro+"&action=update&"+(statusVariavel == 1 ? "dataStatusPlanejado="+dataAtual+"&":"dataStatusEntregue="+dataAtual+"&")+"status="+statusVariavel+"&objetivo="+IDobjetivo+"&planoEstudo="+PlanoEstudoSessionID+"&idAluno="+alunoID,
			    success: function(d) {
				document.getElementById('td_roteiro_squr_'+IDobjetivo).className = "td_roteiro_"+corVariavel;
					Objeto.className = "titulo_infos_roteiro_caixa_"+corVariavel;
					VerificaObjetivosCompletos();
			    },error: function() {
			    	alert("Não modificado, verifique os campos.6.");
			    }
		   	});  

		}

	}
	

}

function setObjetivoStatus(objeto, Id, objetivoId, planoEstudoId, RoteiroId)
{

 var corVariavel;
 var statusVariavel;
	if(objeto.className != "td_roteiro_branco" && objeto.className != "td_roteiro_verde_tk"){
		if(objeto.className == "td_roteiro_branco"){

			corVariavel = "laranja";
			statusVariavel = 1;

		} 
		else if(objeto.className == "td_roteiro_laranja"){

			corVariavel = "verde";
			statusVariavel = 2;

		} 
		else if(objeto.className == "td_roteiro_verde"){

			corVariavel = "laranja";
			statusVariavel = 1;

		} 


	   $.ajax({
	    url: path+"PlanejamentoRoteiro/",
	    type: "POST",
	    crossDomain: true,
	    dataType: 'json',
	    data: "id="+Id+"&action=update&status="+statusVariavel+"&objetivo="+objetivoId+"&planoEstudo="+PlanoEstudoSessionID+"&idAluno="+alunoID,
	    success: function(d) {
	  		
	  		objeto.className = "td_roteiro_"+corVariavel;
	   		document.getElementById('td_objetivo_squr_'+objetivoId).className = "titulo_infos_roteiro_caixa_"+corVariavel;
	   		VerificaObjetivosCompletos();
	    },error: function() {
	     alert("Não modificado, verifique os campos.2");
	    }
	   });  



	} else {

	    ApareceObj(RoteiroId);
	    		
	}
   

}

/*MOD*/

function _getObjetivos(Identificador)
{

	var RetornoHtml = "";
	var Cor = "";
	var IDplanejamentoRoteiro; 
	var IDplanoEstudo;
	var contadorLocal = 0;


        for(var a = 0; a < dataObjetivo.length; a++){
        	
        	
        	if (dataObjetivo[a].ativo > 0 && Identificador == dataObjetivo[a].roteiro.idroteiro)
        	{
				    	var Encontrado = false;
					//	console.log(dataPlanejamentoRoteiro.length);
						//	console.log(" dataPlanejamentoRoteiro:" +dataPlanejamentoRoteiro.length +"  /  dataObjetivo " +  dataObjetivo.length);
				    	for(var b=0; b<dataPlanejamentoRoteiro.length; b++)
				    	{
					
				    		// if(dataObjetivo[a].idobjetivo == dataPlanejamentoRoteiro[b].objetivo.idobjetivo && dataPlanejamentoRoteiro[b].planoEstudo.idplanoEstudo == PlanoEstudoSessionID)
					//		console.log(dataObjetivo[a].idobjetivo+ "  --  "+ dataPlanejamentoRoteiro[b].objetivo.idobjetivo);
							if(dataObjetivo[a].idobjetivo == dataPlanejamentoRoteiro[b].objetivo.idobjetivo)
				    		{
				    			if(dataPlanejamentoRoteiro[b].status == "0")
				    			{
				    				Cor = "branco";

				    			} else if(dataPlanejamentoRoteiro[b].status == "1")
				    			{
				    				Cor = "laranja";

				    			} else if(dataPlanejamentoRoteiro[b].status == "2")
				    			{
				    				Cor = "verde";

				    			}  else if(dataPlanejamentoRoteiro[b].status == "3")
				    			{
				    				Cor = "verde_tk";

				    			} 

				    			IDplanejamentoRoteiro = dataPlanejamentoRoteiro[b].idplanejamentoRoteiro;
				    			IDplanoEstudo = dataPlanejamentoRoteiro[b].planoEstudo.idplanoEstudo;

				    			Encontrado = true;
				    		}

				    	}

				    	if(!Encontrado)
				    		{ Cor = "branco";}


        		RetornoHtml +='<div class="ObjLeft Obj_'+dataObjetivo[a].idobjetivo+'">'+
        							'<div class="titulo_infos_roteiro">'+
        								'<div class="td_roteiro_numero_tabela">'+
        									dataObjetivo[a].numero+
        								'</div>'+
	        							'<div class="td_titulo_tabela">'+
	        								'<a onclick="ApareceAtiv('+dataObjetivo[a].idobjetivo+')">'+
	        									dataObjetivo[a].nome+
	        								'</a>'+
	        								'<div class="titulo_infos_roteiro_botoes">'+
	        									'<div id="ObjStatus_'+dataObjetivo[a].idobjetivo+'" class="titulo_infos_roteiro_estrela ocultar">'+
	        										'<div onclick="trocarObjetivoStatus(this,'+dataObjetivo[a].idobjetivo+','+(PlanoEstudoSessionID)+','+IDplanejamentoRoteiro+');" class="titulo_infos_roteiro_caixa_'+Cor+'" id="td_objetivo_squr_'+dataObjetivo[a].idobjetivo+'" >'+
	        										//data[a].idobjetivo +
	        										'</div>'+
	        									'</div>'+
	        								'</div>'+
	        							'</div>'+
        							'</div>'+
        						'</div>';	


        		$('.QuadObj_'+dataObjetivo[a].roteiro.idroteiro).append('<td onclick="setObjetivoStatus(this,'+IDplanejamentoRoteiro+','+dataObjetivo[a].idobjetivo+','+IDplanoEstudo+','+dataObjetivo[a].roteiro.idroteiro+');" class="td_roteiro_'+Cor+'" id="td_roteiro_squr_'+dataObjetivo[a].idobjetivo+'">'+dataObjetivo[a].numero+'</td>');
        		/*contadorLocal++;
        		if(contadorLocal % 14 ==0)
        		{
        			
        		}*/
        	}
        }

    return RetornoHtml;

}


 function getUltimoPE(ID)
 {
	 var max= 0;


	 for(var a=0; a< dataPlanoEstudo.length; a++)
	 {
		 if(dataPlanoEstudo[a].aluno.idAluno == ID)
		 {
			 max = (max < dataPlanoEstudo[a].idplanoEstudo ? dataPlanoEstudo[a].idplanoEstudo:max);
		 }
	 }

	 return max;
 }

//------------------------------------------------------------------------------------------------------------------------

//Pegar Aluno pelo usuario

// function getAlunoByUsuario()
// {
	// for(var a=0; a<dataUsuario.length;a++)
	// {
		// if(usuario == "Aluno" && dataUsuario[a].aluno != null)
		// {
			// if(dataUsuario[a].idusuario == userID)
			// {
				// return dataUsuario[a].aluno.idAluno;
			// }
		// } else if(usuario == "Professor" && dataUsuario[a].professor != null){
			// if(dataUsuario[a].idusuario == userID)
			// {
				// return dataUsuario[a].professor.idprofessorFuncionario;
			// }
		// }
	// }
// }

//------------------------------------------------------------------------------------------------------------------------

//Pegar AlunoVariavel pelo Aluno

function getAlunoVariavelByAluno()
{
	for(var a=0; a<dataAlunoVariavel.length;a++)
	{
		if(usuario == "Aluno")
		{
			if(dataAlunoVariavel[a].aluno.idAluno == alunoID)
			{
				AnoEstudoID = dataAlunoVariavel[a].anoEstudo.idanoEstudo;
				return dataAlunoVariavel[a].aluno.idAluno;
			}
		} else if(usuario == "Professor"){
			/*if(dataAlunos[a].idusuario == alunoID)
			{*/
				return 0;
			//}
		}
	}
}

function reSetObjetivo(IDObjetivo)
{
	var IDRoteiro = (($('#td_roteiro_squr_'+IDObjetivo).parent().attr("class")).substring(8));
	var IDplanejRoteiro;

	$.ajax({
    type: "GET",
    async: false,
	crossDomain: true,
	url: path+"PlanejamentoRoteiro/aluno/" + alunoID			        
    }).then(function(data) {

    	for(var a=0; a< data.length; a++)
    	{
    		if(data[a].objetivo.idobjetivo == IDObjetivo)
    		{

    			IDplanejRoteiro = data[a].idplanejamentoRoteiro;


    		}
    	}

    });


	$('#td_roteiro_squr_'+IDObjetivo).attr('onclick', 'setObjetivoStatus(this,'+IDplanejRoteiro+','+IDObjetivo+',1,'+IDRoteiro+')');
	
	$('#td_objetivo_squr_'+IDObjetivo).attr('onclick', 'trocarObjetivoStatus(this,'+IDObjetivo+','+PlanoEstudoSessionID+','+IDplanejRoteiro+')');

}

function teste () {
    for (a = 0; a < dataObjetivo.length; a++)
    {
        if ((dataObjetivo[a]).ativo > 0)
            console.log('encontrado'); 
    }
    console.log('fim');
}