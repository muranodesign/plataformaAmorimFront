function OrdenarPor(a){$("#Conteudo_Coluna3_Agenda_Evento_Content").find(".Conteudo_Coluna3_Agenda_Evento").sort(function(b,c){return b.getElementsByClassName(a)[0].innerHTML.substring(8,10)+b.getElementsByClassName(a)[0].innerHTML.substring(5,7)+b.getElementsByClassName(a)[0].innerHTML.substring(0,2)>c.getElementsByClassName(a)[0].innerHTML.substring(8,10)+c.getElementsByClassName(a)[0].innerHTML.substring(5,7)+c.getElementsByClassName(a)[0].innerHTML.substring(0,2)}).appendTo($("#Conteudo_Coluna3_Agenda_Evento_Content"))}function ordenaPorRoteiro(a){for(var d,f,b=[],c=[],g=0;g<a.length;g++){for(d=0,h=0;h<c.length;h++);if(0==d&&(c[c.length]=new Array(2),c[c.length-1][0]=b.length,c[c.length-1][1]=a[g].objetivo.roteiro.nome,b[b.length]=a[g]),1==d){for(var h=b.length;h>aux+1;h--)b[h-1]=b[h];b[aux]=a[g];for(var h=f;h<c.length;h++)c[h][0]=c[h][0]+1}}return b}$(document).ready(function(){var a,b;$.ajax({type:"GET",crossDomain:!0,url:path+"CalendarioEventos/"}).then(function(c){a=c.length,b="";for(var d=0;d<a;d++)d<5?(b+='<div class="Conteudo_Coluna3_Agenda_Evento">',b+='<div class="Conteudo_Coluna3_Agenda_Evento_Titulo">'+c[d].dataInicio.substring(8,10)+"/"+c[d].dataInicio.substring(5,7)+"/"+c[d].dataInicio.substring(0,4)+"</div>",b+='<div class="Conteudo_Coluna3_Agenda_Evento_Conteudo">'+c[d].evento+"</div>",b+="</div>"):(b+='<div class="Conteudo_Coluna3_Agenda_Evento AgendaNulo">',b+='<div class="Conteudo_Coluna3_Agenda_Evento_Titulo">'+c[d].dataInicio.substring(8,10)+"/"+c[d].dataInicio.substring(5,7)+"/"+c[d].dataInicio.substring(0,4)+"</div>",b+='<div class="Conteudo_Coluna3_Agenda_Evento_Conteudo">'+c[d].evento+"</div>",b+="</div>");$("#Conteudo_Coluna3_Agenda_Evento_Content").append(b),OrdenarPor("Conteudo_Coluna3_Agenda_Evento_Titulo"),$(".Conteudo_Coluna3_Agenda_Evento").css("display","none");for(var e=0;e<5;e++)void 0!=document.getElementsByClassName("Conteudo_Coluna3_Agenda_Evento")[e]&&(document.getElementsByClassName("Conteudo_Coluna3_Agenda_Evento")[e].style.display="block")})}),$(document).ready(function(){var a,b,c;$.ajax({type:"GET",crossDomain:!0,url:path+"Mensagens"}).then(function(d){a=d.length,b='<table class="mensagensTabela">',c=0;for(var e=a-1;e>(a>=3?a-4:-1);e--)c++,c%2!=0?(b+="<tr>",b+='<td class="dataMsg" onClick="window.location=\'#\';" style="background-color:rgb(247, 242, 222); line-height: 13px;""><h4>'+d[e].usuario.login+"</h4>"+d[e].mensagem.substring(0,50)+(d[e].mensagem.length<50?"</td>":"...</td>"),b+="</tr>"):c%2==0&&(b+="<tr>",b+='<td class="dataMsg" onClick="window.location=\'#\';" style="background-color:rgb(241, 229, 192); line-height: 13px;""><h4>'+d[e].usuario.login+"</h4>"+d[e].mensagem.substring(0,50)+(d[e].mensagem.length<50?"</td>":"...</td>"),b+="</tr>");b+="</table>",$(".Mensagens_Conteudo").append(b),void 0!=document.getElementsByClassName("dataMsg")[1]})}),$(document).ready(function(){var a,b;$.ajax({type:"GET",crossDomain:!0,url:path+"PlanejamentoRoteiro"}).then(function(c){a=c.length,b="";for(var d="",e="",f="",g=0;g<a;g++)planejamentos=ordenaPorRoteiro(c),d=c[g].objetivo.roteiro.nome,f=d,f==d&&e!=f&&""!=e?(b+="</tr>",b+="</table>",b+="</div>",b+='<div class="Objetivos_Semana_Conteudo_Tarefas">',b+="<table>",b+='<tr><td class="Objetivos_Semana_Conteudo_Tarefas_Texto">'+c[g].objetivo.roteiro.nome+"</td>",b+="</tr>",b+='<tr class="tabela_colorida_roteiro_Area_Aluno">',b+='<td class="td_roteiro_laranja">'+c[g].objetivo.numero+"</td>"):e!=d?(b+='<div class="Objetivos_Semana_Conteudo_Tarefas">',b+="<table>",b+='<tr><td class="Objetivos_Semana_Conteudo_Tarefas_Texto">'+c[g].objetivo.roteiro.nome+"</td>",b+="</tr>",b+='<tr class="tabela_colorida_roteiro_Area_Aluno">',b+='<td class="td_roteiro_laranja">'+c[g].objetivo.numero+"</td>"):e==d&&(b+='<td class="td_roteiro_laranja">'+c[g].objetivo.numero+"</td>"),e=d;$(".Objetivos_Semana_Conteudo_Tarefas_Content").append(b),void 0!=document.getElementsByClassName("Objetivos_Semana_Conteudo_Tarefas_Texto")[1]&&ordenaPorRoteiro(c)})}),$(document).ready(function(){var a,b,c=0;$.ajax({type:"GET",crossDomain:!0,url:path+"ProducaoAluno"}).then(function(d){a=d.length,b="",b+='<div class="example"><div><ul class="SlidePort">';for(var e=0;e<a;e++)b+="<li>",b+='<div class="portfolio_secao verde">',b+='<div class="roteiro">',b+='<img src="data:image/png;base64,'+d[e].conteudo+'" width="170px" height="126px"/>',b+="</div>",b+='<div class="nome_roteiro">',b+=d[e].roteiro.nome,b+="</div>",b+="</div>",b+="</li>",c+=225;b+="</ul></div></div>",$("#bullets").append('<div class="Objetivos_Semana_Cabecalho_Nome">Portf\xf3lio</div>'),$("#bullets").append(b),$("#bullets").microfiche({bullets:!1}),document.getElementsByClassName("SlidePort")[0].style.width=c+"px",document.getElementsByClassName("microfiche-film")[0].style.width=c+"px"})}),$(document).ready(function(){$.ajax({type:"GET",crossDomain:!0,url:path+"Objetivo"}).then(function(a){nobjetivosfeitos=3,nobjetivos=a.length;var b=[{value:nobjetivosfeitos,color:"#F7464A"},{value:nobjetivos-nobjetivosfeitos,color:"#000"}],c=document.getElementById("chart-area").getContext("2d");window.myDoughnut=new Chart(c).Doughnut(b,{responsive:!0})})}),$(document).ready(function(){$.ajax({type:"GET",crossDomain:!0,url:path+"Roteiro"}).then(function(a){nroteiros=a.length,nroteirosfeitos=1;var b=[{value:nroteirosfeitos,color:"#F7464A"},{value:nroteiros-nroteirosfeitos,color:"#000"}],c=document.getElementById("chart-area2").getContext("2d");window.myDoughnut=new Chart(c).Doughnut(b,{responsive:!0})})});