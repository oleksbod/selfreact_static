import React, {Component} from 'react'
import {
  PaymentElement
} from '@stripe/react-stripe-js'
import {useState} from 'react'
import {useStripe, useElements} from '@stripe/react-stripe-js';
import axios from "axios";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);


     await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion/`,

      },
      redirect: 'if_required'
    }).then(function(result) {
       if (result.error) {
         // Inform the customer that there was an error.
         console.log(result.error.message);
       } else {
         // Handle next step based on PaymentIntent's status.
         console.log("PaymentIntent ID: " + result.paymentIntent.id);
         console.log("PaymentIntent status: " + result.paymentIntent.status);
         DoReport();
       }
     });

    setIsLoading(false);
  }

  function DoReport()
  {
    const options = {
      method: 'GET',
      url: 'https://selfservetest-api.azurewebsites.net/payment-complete' ,
      headers: {
        sesid: localStorage.getItem("sesid")
      }
    };

    axios.request(options).then(function (response)
    {
        props.root.fetchUser();
    }).catch(function (error) {
      console.error(error);

    });
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button hidden disabled={isLoading || !stripe || !elements} id="stripepaybtn">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
