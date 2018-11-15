
/*w3schools.com javascript how to make a pop up modal modified by victor juwa*/

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementsByClassName("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Name and Password from the register-form
var panther = document.getElementById('panther');
var pw = document.getElementById('pw');

//var notification =document.getElementById('notification').innerHTML = "";

function store() {
    localStorage.setItem('panther', panther.value);
    localStorage.setItem('pw', pw.value);
    console.log(panther.value,pw.value);
}


function check() {

 
    var regU = localStorage.getItem('panther');
    var regUp = localStorage.getItem('pw');


    var authuser = document.getElementById('panther2');
    var authuserPw = document.getElementById('userPw');

    if(authuser.value !== regU || authuserPw.value !== regUp) {
        console.log(authuser.value,regU,authuserPw.value,regUp)
        alert('ERROR');
        window.location.href = "login.html";
    }else {
        var url = window.location.pathname;
         localStorage.setItem('loggedin',true);
          alert('You are loged in.');
         var filename = url.substring(url.lastIndexOf('/')+1)

        var url = window.location.pathname;
        var filename = url.substring(url.lastIndexOf('/')+1);
        //alert(filename);
        window.location.href = url ;
    }
}




function toggle(id) {
        var state = document.getElementById(id).style.display;
            if (state == 'block') {
                document.getElementById(id).style.display = 'none';
            } else {
                document.getElementById(id).style.display = 'block';
            }
}
let Basket = []; localStorage.setItem('Basket',Basket);
document.getElementById('product-listing').addEventListener('click', function(e){
    let allclassOfElement = document.getElementsByClassName('addItem');
    let item = e.target.className;
   // alert(item);
    if(item.lastIndexOf('addItem') ){       
            localStorage.setItem('basket', e.dataset);
            let itemToBuy = {
                id: e.target.getAttribute('data-id'),
                name:  e.target.getAttribute('data-name'),  
                product :  e.target.getAttribute('data-product'),
                description : e.target.getAttribute('data-productDecription'), 
                price :   e.target.getAttribute('data-price'), 
            }
            Basket.push(itemToBuy);
            add_to_cart(Basket);
            console.log(Basket);
    }
  

})
function add_to_cart(basket){
    //console.log(basket)
     return localStorage.setItem('Basket',basket);
     
     
}

function get_cart(){
    return localStorage.getItem('Basket');
}

function clear_cart(){
    localStorage.clear();
}

function process_user_order(){
   
   let productlist = get_cart();


   //get relative items that are similar
   
   productlist.forEach((item)=>{
     console.log(item.id);
   });

   previewOrder();

}



function previewOrder(){
    var btn = document.getElementById("myModal");
    btn.style.display ='block';
    btn.style.visibility ='visible';
    // /btn.removeClass('modal');

  }