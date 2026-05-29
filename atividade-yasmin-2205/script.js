var totalCarrinho = 0;
var jaAdicionados = {};
var subtotal = 0;
var descontoPercent = 0;

// Cupons 
var cuponsValidos = {
  "YASMIN10": 10,
  "YASMIN15": 15,
  "YASMIN60": 60,
};


function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function atualizarTotal() {
  var valorDesconto = subtotal * (descontoPercent / 100);
  var total = subtotal - valorDesconto;

  document.getElementById("subtotal-preco").textContent = formatarMoeda(subtotal);
  document.getElementById("desconto-valor").textContent = "- " + formatarMoeda(valorDesconto);
  document.getElementById("total-preco").textContent = formatarMoeda(total);
}

function adicionarCarrinho(idBotao, nomeCurso, preco) {

  if (jaAdicionados[idBotao]) {
    return;
  }

  jaAdicionados[idBotao] = true;
  totalCarrinho = totalCarrinho + 1;

  document.getElementById("contador-carrinho").textContent = totalCarrinho;

  var botao = document.getElementById(idBotao);
  botao.textContent = "✔ Adicionado!";
  botao.classList.add("adicionado");


  var mensagem = document.getElementById("mensagem-global");
  mensagem.textContent = '"' + nomeCurso + '" foi adicionado ao carrinho!';
  mensagem.classList.remove("oculto");
  setTimeout(function () {
    mensagem.classList.add("oculto");
  }, 3000);


  document.getElementById("carrinho-vazio").style.display = "none";
  document.getElementById("carrinho-total").style.display = "flex";
  document.getElementById("desconto-area").style.display = "flex";

  var lista = document.getElementById("lista-carrinho");
  var item = document.createElement("li");
  item.classList.add("item-carrinho");
  item.innerHTML = "<p>" + nomeCurso + "</p><span>" + preco + "</span>";
  lista.appendChild(item);


  var valorLimpo = preco.replace("R$ ", "").replace(".", "").replace(",", ".");
  subtotal = subtotal + parseFloat(valorLimpo);

  atualizarTotal();
}


function aplicarDesconto() {
  var inputCupom = document.getElementById("input-cupom");
  var msgCupom = document.getElementById("msg-cupom");
  var linhaDes = document.getElementById("linha-desconto");
  var codigo = inputCupom.value.trim().toUpperCase();


  if (subtotal === 0) {
    msgCupom.textContent = "Adicione um curso antes de usar o cupom.";
    msgCupom.className = "msg-cupom erro";
    return;
  }


  if (codigo === "") {
    msgCupom.textContent = "Digite um código de cupom.";
    msgCupom.className = "msg-cupom erro";
    return;
  }


  if (!cuponsValidos[codigo]) {
    msgCupom.textContent = "Cupom inválido. Tente: YASMIN10, YASMIN20 ou PROMO15.";
    msgCupom.className = "msg-cupom erro";
    return;
  }

  descontoPercent = cuponsValidos[codigo];

  linhaDes.style.display = "block";
  inputCupom.disabled = true;
  document.querySelector(".desconto-area button").disabled = true;

  msgCupom.textContent = "✔ Cupom aplicado! " + descontoPercent + "% de desconto.";
  msgCupom.className = "msg-cupom sucesso";

  atualizarTotal();
}
