$(document).ready(function(){$(".mensagem_item").click(function(){$(".mensagem_item:nth-child(odd)").css("background-color","#E5E4DD"),$(".mensagem_item:nth-child(even)").css("background-color","#F2F2EE"),$(".mensagem_item").removeAttr("id"),$(this).css("background-color","cornsilk").attr("id","selecionado"),$("#selecionado .mensagem_status_nao_lido").removeClass("mensagem_status_nao_lido").addClass("mensagem_status_lido");{var a=$("#selecionado .Remetente_mensagens").text(),b=$("#selecionado .Data_mensagens").text();$("#selecionado .Assunto_mensagens").text()}$("#Remetente_mensagem").text(a),$("#Data_mensagem").text(b),$("#Mensagem p").text(msg)}),$("#bt_Excluir").click(function(){$("#selecionado").remove(),$(".mensagem_item:nth-child(odd)").css("background-color","#E5E4DD"),$(".mensagem_item:nth-child(even)").css("background-color","#F2F2EE")})});