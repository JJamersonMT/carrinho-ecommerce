import { useState } from "react";

export const Tr = ({ data, cancel, update })=>{
  const [qty, setQty] = useState(data.qty);

  const handleIncremmentQty = (n=1) =>{
    if(qty === 0 && n < 0) return false;
    if(qty === data.qty_max && n > 0) return false;
    setQty(e=> e + n);
    update(data, n);
  };

  
  return (
    <tr>
      <td className="produc">
        <img src="https://picsum.photos/100/200" alt=""/>
        <div className="text">
          <h2>{data.product_name}</h2>
          <span>Em estoque</span>
        </div>
      </td>
      <td className="qty">
        <div>
          <button onClick={()=> handleIncremmentQty(-1)}>
            <i className='bx bx-chevron-down'></i>
          </button>
          <span>{qty}</span>
          <button onClick={()=> handleIncremmentQty()}>
            <i className='bx bx-chevron-up' ></i>
          </button>
        </div>
      </td>
      <td className="price"><span>R$ {(data.price).toFixed(2)}</span></td>
      <td className="price"><span>R$ {(data.price * qty).toFixed(2)}</span></td>
      <td className="delete-item">
        <button onClick={()=> cancel(data._id)}>
          <i className='bx bx-x' ></i>
        </button>
      </td>
    </tr>
  );
}