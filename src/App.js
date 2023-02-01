import './App.css';
import React, {Component} from 'react'
import StoreRoute from "./routes/StoreRoute";
import {BrowserRouter, Route, Routes, useParams} from 'react-router-dom';
import AdminRoute from "./routes/AdminRoute";
import axios from "axios";
import {loadStripe} from '@stripe/stripe-js';
import {useEffect, useState} from 'react';
import Payment from './Payment'
import Completion from './Completion'

class App extends Component
{
    constructor() {
           super();
            this.state = {
                  name: "React",
                  user: null,
                  stripePromise:null
            };
          }


    componentDidMount()
    {
        const options = {
            method: 'GET',
            url: 'https://selfservetest-api.azurewebsites.net/user/null'
        };

        axios.request(options).then(function (response) {
            console.log("AXIOS");
            console.log( response.data);
        }).catch(function (error) {
            console.error(error);
        });

        this.setState({stripePromise:loadStripe("pk_test_PkbJdKkRlIVlHQ0Hrzhca6B7000H33oQik")});
    }

    render()
    {


        return (
            <div className="App" >
            <BrowserRouter>
                <Routes>
                    <Route exact path="/payment/" element={<Payment stripePromise={this.state.stripePromise} />} />
                    <Route exact path="/completion/" element={<Completion stripePromise={this.state.stripePromise} />} />
                    <Route exact path="/" element={<StoreRoute minimal={false} app={this}></StoreRoute>}>

                    </Route>
                    <Route exact path="/admin/" element={<AdminRoute/>}>

                    </Route>
                    <Route path="/:id" element={<ViewStore/>}>

                    </Route>
                    <Route path="/loadstore" element={<AdminLoadStore/>}>

                    </Route>

                </Routes>
            </BrowserRouter>
            </div>

        );
    }
}

function ViewStore() {
    let { id } = useParams();

    return (
        <div>
            <StoreRoute minimal={true} storeid={id}></StoreRoute>
        </div>
    );
}

function AdminLoadStore()
{
    function getSesId()
    {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        localStorage.setItem('sesid', token);
        window.location = "http://" + window.location.host;
    }

    return (
        <div>
            {getSesId()}
        </div>
    );


}

export default App;
