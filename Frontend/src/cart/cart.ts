const Cart = document.getElementById('cart-shop')! as HTMLElement;

Cart.addEventListener('click', (e) =>{
    e.preventDefault()
    console.log('cart working');
    window.location.href ='cart.html'    
})