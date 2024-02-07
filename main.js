
async function getData(page){
  const response =await fetch(`https://dummyjson.com/products?limit=10&skip=${ (parseInt(page)-1) * 10 }`);
  const data = await response.json();
  return data;
}
async function displayData(page){
  
  const data = await getData(page);
  const products = data.products;
  const setOfProducts = products.map( (e) =>{
    return `
    <div class="card col-4 p-3" >
    <img src="${e.thumbnail}" class="card-img-top"  >
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">${e.title}</h5>
      <p class="card-text flex-grow-1 ">${e.description}</p>
      <a href="#" class="btn btn-primary">View more</a>
    </div>
    </div>
    `;
  }).join('');
  console.log(setOfProducts);

  document.querySelector('.products .container .row ').innerHTML = setOfProducts;
  return data;
}
async function selectPage(page){
  const data = await displayData(page);
  numberOfPages = data.total/data.limit;

  let elements ;

  if(page == 1){
    elements=`
    <li class="page-item disabled"  >
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
     </li>
   `;
  }else {
    elements=`
    <li class="page-item " onclick=selectPage(parseInt(${page})-1)  >
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
     </li>
   `;
  }

  for(let i=1;i<=numberOfPages ;i++){
    if(page == i )
      elements += `<li class="page-item active" onclick=selectPage(${i})><a class="page-link" href="#">${i}</a></li>`;
    else 
      elements += `<li class="page-item" onclick=selectPage(${i})><a class="page-link" href="#">${i}</a></li>`;

  }

  
  if(page == numberOfPages){
  elements+= ` 
  <li class="page-item disabled" >
    <a  class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>
  `;
  }else {
  elements+= ` 
  <li class="page-item" onclick=selectPage(parseInt(${page})+1) >
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>
  `;
  }

  document.querySelector('nav .pagination').innerHTML=elements;
  
  console.log(elements);
}
selectPage(1);