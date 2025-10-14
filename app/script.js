document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://fakestoreapi.com/products';
    const productSection = document.getElementById('product-section');
    const addProductSection = document.getElementById('new-product-section');
    const newProductForm = document.getElementById('new-product-card-form');
    const addProduct = document.getElementById('add-product');
    const cancelNewProduct = document.getElementById('cancel-new-product-button');
    let editingIndex = null;


    // Function for checking the valid url's
    function isValidImageUrl(url) {
        try {
            const urlObj = new URL(url);
            return ['http:', 'https:'].includes(urlObj.protocol);
        } catch {
            return false;
        }
    }

    // Getting products from the API
    async function getProducts() {
        // Waiting for the response from the API
        try {
            // Getting the products from the API
            const response = await fetch(API_URL);
            // Throwing error in case of no response
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const productsArray = await response.json();
            return productsArray;
            // Catching the error in case of error generation
        } catch (error) {
            console.error(error.message);
        }
    }


    // Displaying products gotten from the API
    async function displayProducts() {
        const products = await getProducts();
 
        // Checking if the array gotten from the API contains some products
        if (products.length == 0) {
            const alert = document.createElement('div');
            alert.className = 'alert alert-info';
            alert.textContent = 'Aucun produit à afficher.';
            col.appendChild(alert);
            productSection.appendChild(col);
            return;
        }
        
        // Adding a row to the section displaying the articles
        productSection.classList.add('row');

        // Loop for displaying the products in bootstrap cards
        products.forEach((product, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-3 mb-4';
        
            const card = document.createElement('div');
            card.className = 'card h-100';
        
            const img = document.createElement('img');
            img.className = 'card-img-top p-3';
            img.style.height = '300px';
            img.style.objectFit = 'contain';
            img.alt = product.title;

            // Checking the validity of the product's picture
            if (isValidImageUrl(product.image)) {
                img.src = product.image;
            } else {
                img.src = 'https://placehold.co/300?text=Image+non+valide';
            }
            img.onerror = function() {
                this.src = 'https://placehold.co/300?text=Image+non+valide';
            };
        
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body d-flex flex-column';
        
            const title = document.createElement('h3');
            title.className = 'card-title';
            title.textContent = product.title;
        
            const description = document.createElement('p');
            description.className = 'card-text text-truncate';
            description.textContent = product.description;
        
            const footer = document.createElement('div');
            footer.className = 'mt-auto d-flex justify-content-between align-items-center';
        
            const price = document.createElement('p');
            price.className = 'fw-bold mb-0';
            price.textContent = `${product.price} €`;
        
            const btnGroup = document.createElement('div');
        
            const editBtn = document.createElement('button');
            editBtn.className = 'btn btn-sm btn-warning me-2';
            editBtn.textContent = 'Modifier';
            editBtn.addEventListener('click', () => displayProducts(index));
        
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-sm btn-danger';
            deleteBtn.textContent = 'Supprimer';
            deleteBtn.addEventListener('click', () => deleteProduct(index));
        
            btnGroup.appendChild(editBtn);
            btnGroup.appendChild(deleteBtn);
            footer.appendChild(price);
            footer.appendChild(btnGroup);
            cardBody.appendChild(title);
            cardBody.appendChild(description);
            cardBody.appendChild(footer);
            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);
            productSection.appendChild(col);
        });
    }

    // Modal for creating a new product
    function addNewProduct() {

        // Function for displaying the modal
        addProduct.onclick = function() {
            addProductSection.style.display = "block";
        }

        // Function for cancelling the creation and deleting the fields
        cancelNewProduct.onclick = function() {
            document.getElementById('new-product-name').value = "";
            document.getElementById('new-product-price').value = "";
            document.getElementById('new-product-description').value = "";
            document.getElementById('new-product-url').value = "";
            addProductSection.style.display = "none";
        }

        // Function for closing the modal when clicking anywhere
        window.onclick = function(event) {
            if (event.target == addProductSection) {
                addProductSection.style.display = "none";
            }
        }
    }


    newProductForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById('new-product-name').value.trim();
        const price = parseFloat(document.getElementById('new-product-price').value);
        const description = document.getElementById('new-product-description').value.trim();
        const image = document.getElementById('new-product-url').value.trim();
    
        if (!title || !description || !image) {
            showMessage('⚠️ Veuillez remplir tous les champs.', 'warning');
            return;
        }
 
        if (price <= 0 || isNaN(price)) {
            showMessage('⚠️ Le prix doit être supérieur à 0.', 'warning');
            return;
        }
 
        if (!isValidImageUrl(image)) {
            showMessage('⚠️ L\'URL de l\'image n\'est pas valide.', 'warning');
            return;
        }
 
        if (title.length > 100) {
            showMessage('⚠️ Le titre est trop long (max 100 caractères).', 'warning');
            return;
        }
    
        if (description.length > 400) {
            showMessage('⚠️ La description est trop longue (max 400 caractères).', 'warning');
            return;
        }

        const newProduct = {
            title: title,
            price: price,
            description: description,
            image: image
        };
 
        if (editingIndex !== null) {
            products[editingIndex] = newProduct;
            showMessage('✅ Produit modifié avec succès !', 'success');
            editingIndex = null;
            newProductForm.querySelector('button[type="submit"]').textContent = 'Ajouter';
        } else {
            // Must add an operation in case of success
        }
 
        newProductForm.reset();
    });
    productAdded = 

    addNewProduct();
    
    displayProducts();
});
