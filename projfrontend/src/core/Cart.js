import React, { useState, useEffect } from 'react'
import "../styles.css"
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import Paymentb from './Paymentb'
import StripeCheckout from './StripeCheckout'

const Cart = () => {

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = (products) => {
        return(
            <div>
                <h2>This section is to load products</h2>
                {products.map((product, index) => (
                        <Card 
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addtoCart={false}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        )
    }

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">
                    {products.length > 0 
                        ? (loadAllProducts(products)) 
                        : (<h3>No Products in cart</h3>)
                    }
                </div>
                <div className="col-6">
                    <h3 className="text-white">Payment Section</h3>
                    <StripeCheckout 
                        products={products}
                        setReload={setReload}
                    />
                    <Paymentb 
                        products={products}
                        setReload={setReload}
                    />
                </div>
            </div>
        </Base>
    )
}

export default Cart