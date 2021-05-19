var products;

fetch('products.json').then(function(response) {
    return response.json();
  }).then(function(json) {
    products = json;
    item_list(products, 0, 4);
  }).catch(function(err) {
    console.log('error');
  });
  
  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight){
      item_list(products, 0, products.length);
      //const main = document.querySelector('main');
      //main.innerHTML="hahaha";
    }
  
  }

  
  function item_list(products, start, end) {
    
    const category = document.querySelector('#category');


    const serch_item = document.querySelector('#search');
    const serch_result = document.querySelector('.result');
    const main = document.querySelector('main');
  
  
    let recent_category = category.value;
    let recent_item = '';

    let products_list = products;
    update_item();
  
    let products_category_list = [];
    products_list = [];
  
    serch_result.onclick = give_result;
  
    function give_result(e) {
 
      e.preventDefault();
  

      products_category_list = [];
      products_list = [];
 
      if(category.value === recent_category && serch_item.value === recent_item) {
        return;
      } else {
      
        recent_category = category.value;
        recent_item = serch_item.value;

        if(category.value === 'All') {
          products_category_list = products;
          search_product();

        } else {

          for(let i = start; i < end ; i++) {

            if(products[i].tag === category.value) {
              products_category_list.push(products[i]);
            }
          }

          search_product();
        }
      }
    }

    function search_product() {

      if(serch_item.value === '') {

        products_list = products_category_list;
        update_item();

      } else {
  
        for(let i = start; i < end ; i++) {
          if(products_category_list[i].name.indexOf(serch_item.value) !== -1) {
            products_list.push(products_category_list[i]);
          }
        }
  
        update_item();
      }
  
    }
  
    function update_item() {
   
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
  
     
      if(products_list.length === 0) {

        const h2 = document.createElement('h2');
        h2.textContent = 'Nothing!!';
        main.appendChild(h2);
      
      } else {

        
        for(let i = 0; i < products_list.length; i++) {
          each_item(products_list[i]);
        }

      }
    }
   
    function each_item(item) {

      const h3 = document.createElement('h3');
      h3.textContent = item.name;

      const h4 = document.createElement('h4');
      h4.textContent = item.won + "원";

      const image = document.createElement('img');
      image.src = 'image_list/' + item.img;
      image.alt = item.name;
      image.classList.add("productimage");

      const plus = document.createElement('btn');
      plus.classList.add('btn');
      plus.textContent= '+ more';
      plus.onclick = more;

      const div = document.createElement('div');
      div.setAttribute('class', item.tag);
      div.appendChild(image);
      div.appendChild(plus);

      main.appendChild(div);
     
      function more(){
        h3.style.textAlign='center';
        h4.style.textAlign='center';
        div.appendChild(h3);
        div.appendChild(h4);
      }
      
    }
  }
  