const booksContainer = document.getElementById("booksContainer");
const accessoriesContainer = document.getElementById("accessoriesContainer");
const featuredProducts = document.getElementById("featuredProducts");

const getData = async () => {
  try {
    const response = await fetch("./products.json");
    if (!response.ok) {
      console.error("Fel från servern: " + response.status);
    }
    const products = await response.json();

    renderProducts(products);
    renderFeaturedProducts(products);
  } catch (error) {
    console.error("Fel: ", error);
  }
};

function renderFeaturedProducts(products) {
  products.forEach((product) => {
    if (
      product.badge === "Populär" ||
      product.badge === "Rea" ||
      product.badge === "Nyhet"
    ) {
      const article = document.createElement("article");
      article.classList.add("product-card");

      const title = document.createElement("h3");
      title.textContent = `${product.title} - ${product.author}`;

      const description = document.createElement("p");
      description.textContent = product.description;

      const price = document.createElement("p");
      price.textContent = product.price;

      const image = document.createElement("img");
      image.src = product.url;
      image.alt = product.imageAlt;

      const badge = document.createElement("span");
      badge.classList.add("badge");
      badge.textContent = product.badge;

      const button = document.createElement("button");
      button.textContent = product.cart;

      button.addEventListener("click", () => {
        alert(`${product.title} av ${product.author} är tillagd i varukorgen`);
        console.log(
          `${product.title} av ${product.author} är tillagd i varukorgen`,
        );
      });

      article.appendChild(title);
      article.appendChild(badge);
      article.appendChild(image);
      article.appendChild(description);
      article.appendChild(price);
      article.appendChild(button);

      featuredProducts.appendChild(article);
    }
  });
}

function renderProducts(products) {
  products.forEach((product) => {
    console.log("Produkt: ", product);

    const article = document.createElement("article");
    article.classList.add("product-card");

    const title = document.createElement("h3");
    title.textContent = product.title;

    const author = document.createElement("h3");
    author.textContent = product.author;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.textContent = product.price;

    const image = document.createElement("img");
    image.src = product.url;
    image.alt = product.imageAlt;

    const button = document.createElement("button");
    button.textContent = product.cart;

    button.addEventListener("click", () => {
      alert(`${product.title} av ${product.author} är tillagd i varukorgen`);
      console.log(
        `${product.title} av ${product.author} är tillagd i varukorgen`,
      );
    });

    article.appendChild(title);
    article.appendChild(author);
    article.appendChild(image);
    article.appendChild(description);
    article.appendChild(price);
    article.appendChild(button);

    if (product.badge) {
      const badge = document.createElement("span");
      badge.classList.add("badge");
      badge.textContent = product.badge;

      article.appendChild(badge);
    }

    if (product.category === "book" && booksContainer) {
      booksContainer.appendChild(article);
    } else if (product.category === "accessory" && accessoriesContainer) {
      accessoriesContainer.appendChild(article);
    }
  });
}

getData();
