


// // document.addEventListener('DOMContentLoaded', () => {
// //     loadTopProduct()
    
// // })


// window.onload = function(){
//     loadTopProduct()
    
// }
// const topProductBody = document.querySelector('#topProduct');

// const theTopProducts = () => {
//     $.get({
//         url: '/product/top',
//         statusCode: {
//             200: function (response) {
                
                
//             },
//             400: function (response) {
//                 console.log(response)
//             }
//         }
//     })
// }
// const loadTopProduct = () => {

//     $.get({
//         url: '/product/top',
//         statusCode: {
//             200: function (response) {
//                 topProductBody.innerHTML = ''
//                 let elementSize = response.length
//                 for (let i = 0; i < elementSize; i++) {
//                     const element = response[i]
//                     topProductBody.innerHTML += `
//                     <div class="item card-item" >
//                         <div class="card" style="width: 16rem;">
//                             <img src="/img/product1.png" class="card-img-top" alt="">
//                             <div class="card-body">
//                                 <h5 class="card-title">${element.name}</h5>
//                                 <p class="card-text">${element.description}</p>
//                                 <div class="card-price">
//                                     <p class="card-price-num">${element.price}</p><span> VND</span>
//                                 </div>
//                             </div>
//                             <div class="card__overlay">
//                                 <a href="/product/detail/${element._id}" class="card__overlay-detail">
//                                     <i class="fa fa-arrow-circle-right"></i>Xem chi tiết
//                                 </a>
//                                 <button class="card__overlay-cart">
//                                     <i class="fa fa-shopping-cart"></i>Cho vào giỏ
//                                 </button>
//                             </div>
//                         </div>
//                     </div>`
//                 }
//             },
//             400: function (response) {
//                 console.log(response)
//             }
//         }
//     })
// }

