import {useEffect, useState} from 'react';
import React, {Component} from 'react'
import axios from "axios";
function Completion(props) {
  const [ messageBody, setMessageBody ] = useState('');
  const { stripePromise } = props;

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) =>
    {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      setMessageBody(error ? `> ${error.message}` : (
        <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
      ));
    });
  }, [stripePromise]);

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
      window.location = window.location.origin;
    }).catch(function (error) {
      console.error(error);

    });
  }

  return (
    <>

      {DoReport()}

    </>
  );
}

export default Completion;
