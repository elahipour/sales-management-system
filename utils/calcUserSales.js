function calcUserSales(customers){
    let sum=0;
    let medal='boronz';
customers.map(customer=>{
    const sales=customer.products.reduce((acc,cur)=>acc+((+cur.price)*(+cur.qty)),0);
    sum+=sales;
})
if(sum>10000000){
    medal='silver';
}if(sum>15000000){
    medal='gold';
}
return medal;
}

export default calcUserSales;