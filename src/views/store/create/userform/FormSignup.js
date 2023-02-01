import {React, useState} from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';
import styled from "styled-components";
import { ReactCountryDropdown } from 'react-country-dropdown'
import { Select, MenuItem } from "@material-ui/core";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

const FormSignup = ({ submitForm }) => {

  const [selectedCountry, setSelectedCountry] = useState("");
  const selectCountryHandler = (value) => setSelectedCountry(value);
  countries.registerLocale(enLocale);
  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key
    };
  });

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  const handleSelect = (country) =>
  {
    console.log(country)
  }

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>


        <WrapRow>
          <div className='form-inputs'>
            <label className='form-label'>First Name</label>
            <input
                className='form-input'
                type='text'
                name='username'
                placeholder=''
                value={values.username}
                onChange={handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Last Name</label>
            <input
                className='form-input'
                type='email'
                name='email'
                placeholder=''
                value={values.email}
                onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
        </WrapRow>

        <WrapRow>
          <div className='form-inputs'>
            <label className='form-label'>Email</label>
            <input
                className='form-input'
                type='password'
                name='password'
                placeholder=''
                value={values.password}
                onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Country</label>
            <Select
                className='form-input'
                style = {{backgroundColor:'white'}}
                value={selectedCountry}
                onChange={(e) => selectCountryHandler(e.target.value)}
            >
              {!!countryArr?.length &&
                  countryArr.map(({ label, value }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                  ))}
            </Select>
            {errors.password2 && <p>{errors.password2}</p>}
          </div>
        </WrapRow>

      <WrapRow>

      </WrapRow>

        <WrapRow>
          <div className='form-inputs'>
            <label className='form-label'>Company</label>
            <input
                className='form-input'
                type='password'
                name='password'
                placeholder=''
                value={values.password}
                onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Job Title</label>
            <input
                className='form-input'
                type='password'
                name='password2'
                placeholder=''
                value={values.password2}
                onChange={handleChange}
            />
            {errors.password2 && <p>{errors.password2}</p>}
          </div>
        </WrapRow>


        <button hidden id={'confirmtrial'} className='form-input-btn' type='submit'>
          Sign up
        </button>

      </form>
    </div>
  );
};
const Wrap = styled.div
    `
      width:100%;
      height:100%;
      padding-top: 0vh;
`

const WrapRow = styled.div
    `
      width:80%;
      gap:2vw;
      display:flex;
      flex-direction:row;
      justify-content:center;
      align-items:center;
      
`

export default FormSignup;
