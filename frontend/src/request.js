export const data = [
  {
    product_name: 'produto 1',
    price: (Math.random() * 1000 + 1),
    qty: 1/* Math.floor(Math.random() * 15 + 1) */,
    qty_max: Math.floor(Math.random() * 20 + 10),
    _id: 1,
  },
  {
    product_name: 'produto 2',
    price: (Math.random() * 1000),
    qty: 1/* Math.floor(Math.random() * 15 + 1) */,
    qty_max: Math.floor(Math.random() * 20 + 10),
    _id: 2,
  },
  {
    product_name: 'produto 3',
    price: (Math.random() * 1000),
    qty: 1/* Math.floor(Math.random() * 15 + 1) */,
    qty_max: Math.floor(Math.random() * 20 + 10),
    _id: 3,
  },
]

function removeItem(id){
  data.filter((a)=>{
    return a._id != id
  });
}
export default removeItem;