import {useEffect, useState} from 'react';

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'
import React, {Component} from 'react'
import axios from "axios";

function Payment(props) {
  const { stripePromise } = props;
  const [ clientSecret, setClientSecret ] = useState('');

  useEffect(() => {

    fetch("https://selfservetest-api.azurewebsites.net/create-payment-intent",{
      method: 'GET',
      headers: {
        'amount': props.amount,

      }
    })
        .then((res) => res.json())
        .then(({clientSecret}) => setClientSecret(clientSecret));
  }, [props.amount]);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, }}>
          <CheckoutForm root={props.root} />
        </Elements>
      )}
    </>
  );
}

export default Payment;
