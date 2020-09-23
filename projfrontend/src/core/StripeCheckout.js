import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend'
import { createOrder } from "./helper/orderHelper"


const StripeCheckout = ({ products, setReload = f => f, reload = undefined }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalAmount = () => {
        let amount = 0
        products.map(p => {
            amount = amount + p.price
        })
        return amount
    }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)

        }).then(response => {
            console.log(response)
            const {status} = response
            console.log("STATUS", status);

            // const orderData = {
            //     products: products,
            //     transaction_id: response.id,
            //     amount: response.amount
            // }

            // createOrder(userId, token, orderData)

            cartEmpty(() => {
                console.log("Did we got a crash?");
            })
            setReload(!reload)
        }).catch(error => console.log(error))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey="pk_test_51HTlbuFm8AspTnLC7m7wXdWpBx25fu6evQtEAFYfPHyEfNo03of59kZQYWtrO4Z1ZiqdyxQRdtkRsque0jVbGI0X00A5wVM63U"
                token={makePayment}
                amount={getFinalAmount() * 100}
                name="Buy Tshirts"
                shippingAddress
                billingAddress
            >
                <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    }

    return (
        <div>
            <h3 className="text-white mt-5">Stripe Checkout {getFinalAmount()}$</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout