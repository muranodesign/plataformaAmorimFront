﻿$(document).ready(function(){var b="";$.ajax({type:"GET",crossDomain:!0,url:path+"Usuario",success:function(a){b=[[]];for(var c=0;c<a.length;c++)$(".presenca_opcao").append('<div class="celulaGrande"><div class="infoG alterar" id="'+a[c].idusuario+'">'+a[c].login+'</div><div class="infoValueM inputNovaSenha" id="_'+a[c].idusuario+'" ></div></div>'),b[c]=[],b[c][0]=a[c],b[c][1]=0}}),$("body").delegate(".alterar","click",function(){var a=$(this).attr("id");return $(".inputNovaSenha").html(""),$("#_"+a).html('<input id="novaSenha" maxlength="6" type="text"/><input type="button" class="btnSubmit" id="btnSubmit" name="btnSubmit" idUsuario="'+a+'"/>'),!1}),$("body").delegate(".btnSubmit","click",function(){var a=$(this).attr("idUsuario"),b=$("#novaSenha").val();return""==b?mensagem("Senha inv\xe1lida!!","OK","bt_ok","erro"):(console.log("id="+a+"&senha="+b),$.ajax({type:"POST",async:!1,crossDomain:!0,data:"id="+a+"&senha="+b,url:path+"Logar/AlterarSenhaFull/",success:function(){mensagem("Senha alterada com sucesso!","OK","bt_ok","sucesso"),$(".inputNovaSenha").html("")},error:function(){mensagem("Erro ao alterar Senha!","OK","bt_ok","erro")}}),!1)}),$("#pesquisaUsuario").keyup(function(){texto=$("#pesquisaUsuario").val();var a=!1;$(".presenca_opcao").html("");for(var c=0;c<b.length;c++)0==b[c][0].login.toLowerCase().search(texto.toLowerCase())&&(a=!0,$(".presenca_opcao").append('<div class="celulaGrande"><div class="infoG alterar" id="'+b[c][0].idusuario+'">'+b[c][0].login+'</div><div class="infoValueM inputNovaSenha" id="_'+b[c][0].idusuario+'"></div></div>'));0==a&&$(".presenca_opcao").append("Nenhum Usu\xe1rio encontrado!!")})});