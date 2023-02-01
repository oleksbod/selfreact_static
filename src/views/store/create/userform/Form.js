import React, { useState } from 'react';
import './Form.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';
import styled from "styled-components";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
      <Wrap>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </Wrap>
  );
};

export default Form;

const Wrap = styled.div
    `
      justify-content:center;
      align-items:center;
      padding-top: 35vh;
`

