let cart = [];

// Função para adicionar ao carrinho com ingredientes removidos
function addToCart(productName, sizeClass, breadClass, ingredientClass) {
  const size = document.querySelector(`input[name=${sizeClass}]:checked`).value;
  const bread = document.querySelector(`input[name=${breadClass}]:checked`).value;

  // Capturar ingredientes removidos
  const ingredientCheckboxes = document.getElementsByClassName(ingredientClass);
  const removedIngredients = [];
  for (let checkbox of ingredientCheckboxes) {
    if (checkbox.checked) {
      removedIngredients.push(checkbox.value);
    }
  }
  
  let price = 0;
  if (size === 'single') {
    price = (productName === 'CHAMA Clássico') ? 25 : 29;
  } else {
    price = (productName === 'CHAMA Clássico') ? 33 : 37;
  }

  // Adicionar ao carrinho
  cart.push({
    productName: productName,
    size: size === 'single' ? 'Simples' : 'Duplo',
    bread: bread === 'brioche' ? 'Brioche' : 'Parmesão',
    price: price,
    removedIngredients: removedIngredients
  });
  
  displayCart();
}

// Função para exibir o carrinho
function displayCart() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = ""; // Limpa o carrinho antes de atualizar

  let total = 0;
  cart.forEach((item, index) => {
    let removed = item.removedIngredients.length > 0 ? ` (Remover: ${item.removedIngredients.join(', ')})` : '';
    cartElement.innerHTML += `<p>${item.productName} (${item.size}) - Pão: ${item.bread}${removed} - R$${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remover</button></p>`;
    total += item.price;
  });
  
  // Adiciona taxa de entrega
  total += 5.00;

  cartElement.innerHTML += `<h3>Total com entrega: R$${total.toFixed(2)}</h3>`;
}

// Função para remover do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

// Função para finalizar o pedido e formatar a comanda
function finalizeOrder() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const customerName = document.getElementById("customer-name").value;
  if (!customerName) {
    alert("Por favor, insira seu nome.");
    return;
  }

  // Gerar a comanda para a cozinha
  const comandaElement = document.getElementById("comanda");
  comandaElement.innerHTML = ""; // Limpa a comanda antes de atualizar

  let orderText = `🍔 *Comanda de Pedido - Chama Burguer* 🍔\n\nCliente: ${customerName}\n\n`;
  let total = 0;

  cart.forEach((item, index) => {
    let removed = item.removedIngredients.length > 0 ? `Remover: ${item.removedIngredients.join(', ')}` : 'Nenhuma alteração';
    
    orderText += `🍔 *Hambúrguer:* ${item.productName}\n`;
    orderText += `Tamanho: ${item.size}\n`;
    orderText += `Pão: ${item.bread}\n`;
    orderText += `${removed}\n`;
    orderText += `Preço: R$${item.price.toFixed(2)}\n`;
    orderText += `---\n`;

    total += item.price;
  });

  // Adicionar a taxa de entrega
  total += 5.00;
  orderText += `*Total com entrega: R$${total.toFixed(2)}*\n\n`;
  orderText += `*Obrigado por seu pedido!* 😊`;

  // Exibir a comanda formatada na página
  comandaElement.innerHTML = `<pre>${orderText}</pre>`;

  // Enviar pedido via WhatsApp
  const whatsappNumber = 48991490613; // Coloque aqui o número do WhatsApp do restaurante
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
  window.open(whatsappLink, '_blank');
}
