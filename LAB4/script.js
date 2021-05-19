var products;

fetch('products.json').then(function(response) {
    return response.json();
  }).then(function(json) {
    products = json;
    item_list(products);
  }).catch(function(err) {
    console.log('error');
  });
  
  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight){
      item_list(products);
    }
  
  }

  
  function item_list(products) {
    
    const category = document.querySelector('#category');
    const serch_item = document.querySelector('#search');
    const serch_result = document.querySelector('.result');
    const main = document.querySelector('main');
  
  
    let recent_category = category.value;
    let recent_item = '';

    let products_category_list;
    let products_list;
  
  
    products_list = products;
    update_item();
  
    products_category_list = [];
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

          for(let i = 0; i < products.length ; i++) {

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
  
        for(let i = 0; i < products_category_list.length ; i++) {
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
          fetchBlob(products_list[i]);
        }
      }
    }

    function fetchBlob(product) {
      
      let url = 'image_list/' + product.img;
    
      fetch(url).then(function(response) {
          return response.blob();
      }).then(function(blob) {
     
        let objectURL = URL.createObjectURL(blob);
   
        each_item(objectURL, product);
      });
    }
  
   
    function each_item(objectURL, product) {

      const div = document.createElement('div');
      const h3 = document.createElement('h3');
      const h4 = document.createElement('h4');
      const image = document.createElement('img');
      const button = document.createElement('btn');
      button.classList.add('btn');
      button.textContent= '+ more';
  
 
      div.setAttribute('class', product.tag);
  
  
      h3.textContent = product.name;
      h4.textContent = product.won + "원";
  
      image.src = objectURL;
      image.alt = product.name;
      image.classList.add("productimage");
  

      main.appendChild(div);
     
      function more(){
        div.appendChild(h3);
        div.appendChild(h4);
      }
      div.appendChild(image);
      div.appendChild(button);
      button.onclick = more;
  
    }
  }
  