import './style.scss';
import { Header } from './Header';
import { Tr } from './Tr';
import { useEffect, useReducer, useState } from 'react';
import { data } from './request';
import removeItem from './request';



// ------------------------AQUI ESTAO OS METODOS PARA CONSUMIR A API--------------------------------
async function buscaProdutos(){//AQUI BUSCA OS PRODUTOS NO BANCO , EU TIREI A VERIFICACAO DE TOKEN
  const response = await fetch('http://localhost:3000/api/produto',{
    headers:{
      'Content-Type':'application/json'
    }
  })
  const resp = await response.json()
  console.log(resp)
}
buscaProdutos()

// criei esse objeto ae que he pra simular a forma que deve ser mandado os dados para a rota de adicionar produtos te vira ze carlos kkkk
const dados = {
  produtos:[
    {
      name:'bone',
      price:1000,
      qty:23,
      clienteId:'adadaa'
    },
    {
      name:'gorro',
      price:1000,
      qty:2,
      clienteId:'adadaa'
    }
  ]
}

//AQUI ADICIONA OS PRODUTOS NO BANCO , EU TIREI A VERIFICACAO DE TOKEN
async function adicionaProdutos(){

  const response = await fetch('http://localhost:3000/api/cliente/a',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(dados)
  })
  const resp = await response.json()
  console.log(resp)
}
adicionaProdutos()


// AQUI ESTA A ROTA QUE BUSCA OS PRODUTOS DO CLIENTE
async function buscaProdutosCliente(){//AQUI BUSCA OS PRODUTOS NO BANCO , EU TIREI A VERIFICACAO DE TOKEN
  const response = await fetch('http://localhost:3000/api/cliente/',{
    headers:{
      'Content-Type':'application/json'
    }
  })
  const resp = await response.json()
  console.log(resp)
}
buscaProdutosCliente()

const aux = data;
const reducer = (state, action)=>{
  switch (action.type){
    case 'incremment':
      return state.map(el=>{
        if (action.payload.obj._id == el._id){
          return {...el, qty: el.qty + action.payload.qty};
        }
        return el;
      });
  }
  return [...state];
};

function App() {
  //const [cart, setCart] = useState(aux);
  const [cart, dispacht] = useReducer(reducer, aux);
  const [totalPrice, setTotalPrice] = useState(0);

  const updateQty = (obj, qty)=>{
    dispacht({type: 'incremment', payload: {obj, qty}});
  }

  useEffect(()=>{
    var auxTotal = 0;
    cart.map(el=>{
      auxTotal += el.price * el.qty
    });
    setTotalPrice(auxTotal);

  }, [cart]);

  async function teste(){
    console.log(1)
  }
  const handleRemoveItem = (id) =>{
    /* setCart(auxCart=>{
      return auxCart.filter(e=>{
        return e._id !== id;
      });
    }); */
  }

  return (
    <>
      <Header />
      <main >
        <header>
          <i className='bx bxs-cart-alt'></i>
          <h1>Carrinho de compras</h1>
        </header>
        <div className="container">

          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Qntd.</th>
                <th>Preço</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item=>(
                <Tr update={updateQty} cancel={handleRemoveItem} data={item} key={item._id}/>
              ))}
            </tbody>
          </table>
          <footer>
            <div id="frete">
              <input type="text"/>
              <button>Calcular frete</button>
            </div>
            <div id="total">
              <div className="subtotal">
                <span>Total</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="cupom">
                <button><span>Adicione um cupom <i className='bx bx-right-arrow-alt'></i></span></button>
              </div>
            </div>
          </footer>
        </div>
        <footer className="main-footer">
          <button>Escolher mais produtos</button>
          <button>Finalizar compra</button>
        </footer>
      </main>
      <footer id="page-footer">
        <div className="container-footer">
          <div className="creators">
            <h1>Criadores</h1>
            <span>José Carlos Eliodoro de Santana</span>
          </div>
          <div className="contact">
            <h1>Contatos</h1>
            <span>Linkedin</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
