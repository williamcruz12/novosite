
        // Cart functionality
        let cart = [];
        let cartTotal = 0;
        
        // Toggle cart dropdown
        document.getElementById('cartButton').addEventListener('click', function() {
            const dropdown = document.getElementById('cartDropdown');
            dropdown.classList.toggle('hidden');
        });
        
        // Close cart when clicking outside
        document.addEventListener('click', function(event) {
            const cartButton = document.getElementById('cartButton');
            const cartDropdown = document.getElementById('cartDropdown');
            
            if (!cartButton.contains(event.target) && !cartDropdown.contains(event.target)) {
                cartDropdown.classList.add('hidden');
            }
        });
        
        // Add to cart function
        function addToCart(name, price, image) {
            // Add item to cart
            cart.push({ name, price, image });
            cartTotal += price;
            
            // Update cart count
            document.getElementById('cartCount').textContent = cart.length;
            document.getElementById('cartCount').classList.add('cart-notification');
            
            // Update cart total
            document.getElementById('cartTotal').textContent = 'R$ ' + cartTotal.toFixed(2).replace('.', ',');
            
            // Update cart items list
            const cartItems = document.getElementById('cartItems');
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="text-gray-500 text-sm">Seu carrinho está vazio</p>';
            } else {
                cart.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'flex items-center py-2 border-b border-gray-200';
                    itemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="w-10 h-10 object-cover rounded-md mr-3">
                        <div class="flex-grow">
                            <p class="text-sm font-medium text-gray-800">${item.name}</p>
                            <p class="text-xs text-gray-500">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                        </div>
                        <button onclick="removeFromCart('${item.name}', ${item.price})" class="text-red-500 hover:text-red-700">
                            <i class="fas fa-trash-alt text-sm"></i>
                        </button>
                    `;
                    cartItems.appendChild(itemElement);
                });
            }
            
            // Show notification
            const notification = document.getElementById('cartNotification');
            notification.classList.remove('hidden');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 3000);
            
            // Remove animation class after animation ends
            setTimeout(() => {
                document.getElementById('cartCount').classList.remove('cart-notification');
            }, 500);
        }
        
        // Remove from cart function
        function removeFromCart(name, price) {
            const index = cart.findIndex(item => item.name === name);
            if (index !== -1) {
                cart.splice(index, 1);
                cartTotal -= price;
                
                // Update cart count
                document.getElementById('cartCount').textContent = cart.length;
                
                // Update cart total
                document.getElementById('cartTotal').textContent = 'R$ ' + cartTotal.toFixed(2).replace('.', ',');
                
                // Update cart items list
                const cartItems = document.getElementById('cartItems');
                cartItems.innerHTML = '';
                
                if (cart.length === 0) {
                    cartItems.innerHTML = '<p class="text-gray-500 text-sm">Seu carrinho está vazio</p>';
                } else {
                    cart.forEach(item => {
                        const itemElement = document.createElement('div');
                        itemElement.className = 'flex items-center py-2 border-b border-gray-200';
                        itemElement.innerHTML = `
                            <img src="${item.image}" alt="${item.name}" class="w-10 h-10 object-cover rounded-md mr-3">
                            <div class="flex-grow">
                                <p class="text-sm font-medium text-gray-800">${item.name}</p>
                                <p class="text-xs text-gray-500">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                            </div>
                            <button onclick="removeFromCart('${item.name}', ${item.price})" class="text-red-500 hover:text-red-700">
                                <i class="fas fa-trash-alt text-sm"></i>
                            </button>
                        `;
                        cartItems.appendChild(itemElement);
                    });
                }
            }
        }




        