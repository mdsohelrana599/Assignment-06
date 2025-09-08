const categorieList = document.getElementById("category-list");
const cardContaner = document.getElementById("card-contaner")

const lodeCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories)
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCategory = (categories) => { categories.forEach(cat => {
    categorieList.innerHTML += `
        <li id="${cat.id}" class="hover:bg-[#15803D] hover:text-white  px-3 py-1 rounded-md cursor-pointer">${cat.category_name}</li>
        `;
  });

  categorieList.addEventListener('click', (e) =>{
    const allLi = document.querySelectorAll('li')
    allLi.forEach(li =>{
        li.classList.remove('bg-[#15803D]')
    })

    if(e.target.localName === 'li'){
        e.target.classList.add('bg-[#15803D]');
        loadTreeCategory(e.target.id)
        
    }
  });
};

const loadTreeCategory = (categoryid) => {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryid}`)
    .then(res => res.json())
    .then(data =>{
        showCardCategory(data.plants)
    })
    .catch(err => {
        console.log(err);
    })
}
const showCardCategory = (plants) =>{
    console.log(plants)
    cardContaner.innerHTML= ""
    plants.forEach(plant =>{
       cardContaner.innerHTML += `
       <div class="rounded-lg h bg-base-100 hover:shadow-sm p-3 ">
                    <div>
                        <img src="${plant.image}" alt="Tree" class=" w-full h-[150px]" />
                    </div>
                    <div>
                        <h2 class="text-xl font-bold mt-2">${plant.name}</h2>
                        <p class="text-[#5C5C5C] text-sm my-2">${plant.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="badge px-4 py-3 rounded-full bg-[#DCFCE7] text-[#5C5C5C]">${plant.category}</span>
                            <p> ৳<span id="cart-total">${plant.price}</span></p>
                        </div>
                        <button class="btn bg-[#15803D] hover:bg-[#0c5427] text-white w-full rounded-full mt-2">Add to
                            Cart</button>
                    </div>
                </div>

       `
    })
}

lodeCategory();
loadTreeCategory('1');
