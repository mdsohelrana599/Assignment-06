const categorieList = document.getElementById("category-list");
const cardContaner = document.getElementById("card-contaner");
const cardList = document.getElementById("cart-list");


let addToCard = [];

const lodeCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCategory = (categories) => {
  categories.forEach((cat) => {
    categorieList.innerHTML += `
        <li id="${cat.id}" class="hover:bg-[#15803D] hover:text-white  px-3 py-1 rounded-md cursor-pointer">${cat.category_name}</li>
        `;
  });

  categorieList.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("bg-[#15803D]");
    });

    if (e.target.localName === "li") {
      e.target.classList.add("bg-[#15803D]");
      loadTreeCategory(e.target.id);
    }
  });
};

const loadTreeCategory = (categoryid) => {
  fetch(`https://openapi.programming-hero.com/api/category/${categoryid}`)
    .then((res) => res.json())
    .then((data) => {
      showCardCategory(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};
const showCardCategory = (plants) => {
  cardContaner.innerHTML = "";
  plants.forEach((plant) => {
    cardContaner.innerHTML += `
       <div class="rounded-lg h bg-base-100 hover:shadow-sm p-3 ">
                    <div>
                        <img src="${plant.image}" alt="Tree" class=" w-full h-[150px]" />
                    </div>
                    <div id="${plant.id}">
                        <h2 class="text-xl font-bold mt-2">${plant.name}</h2>
                        <p class="text-[#5C5C5C] text-sm my-2">${plant.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="badge px-4 py-3 rounded-full bg-[#DCFCE7] text-[#5C5C5C]">${plant.category}</span>
                            <p> ৳<span id="cart-total">${plant.price}</span></p>
                        </div>
                        <button class="btn bg-[#15803D] hover:bg-[#0c5427] text-white w-full rounded-full mt-2">Add to Cart</button>
                    </div>
                </div>

       `;
  });
};

cardContaner.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    hendlAddToCard(e);
  }
});

const hendlAddToCard = (e) => {
  const name = e.target.parentNode.children[0].innerText;
  const id = e.target.parentNode.id;
  const price = e.target.parentNode.price;

  addToCard.push({
    name,
    id,
    price,
  });

  showAddCard(addToCard);
  
};

const showAddCard = (addToCard) => {
  cardList.innerHTML = "";
  addToCard.forEach((addToCards) => {
    cardList.innerHTML += `
        
        <div 
                    class="space-y-2 bg-[#F0FDF4] hover:bg-[#DCFCE7] mt-3 px-3 flex justify-between rounded-lg items-center">
                    <div>
                        <h2 class="font-bold">${addToCards.name}</h2>
                        <p class="text-[#5C5C5C] mt-1"> ৳<span>${addToCards.price}</span> * <span id="addCard-Cound">${addToCards.id}</span> </p>
                    </div>
                    <button onclick="hendlDeleteCard('${addToCards.id}')" class"btn"><i class="fa-solid fa-xmark  hover:text-[#e55555]"></i></button>
                </div>
        
        `;
  });

  
};

const hendlDeleteCard = (addToCardId) => {
  const filtercard = addToCard.filter(
    (addToCards) => addToCards.id !== addToCardId
  );
  addToCard = filtercard;
  showAddCard(addToCard);
};

lodeCategory();
loadTreeCategory("1");
