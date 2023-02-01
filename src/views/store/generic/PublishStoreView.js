
import styled from 'styled-components'
import React, {Component} from 'react'
import './dropshadow.css';
import Button from "@mui/material/Button";
import Payment from "../../../Payment";

export function PublishStoreView(props)
{
    function GetPaymentHeader()
    {
        if(props.root.getCartTotalAssets() + props.root.getCartTotalRecurring() != 0) {
            return (
                <div>
                    <p style={{fontWeight:'700',fontSize:'2.5vh',marginBottom:"5vh"}}>Publish your virtual enviorement</p>
                    <p style={{fontWeight:'600',fontSize:'1.8vh',marginTop:"5vh"}}>To pay today: £{props.root.getCartTotalRecurring()+props.root.getCartTotalAssets()}</p>
                    <p style={{fontWeight:'600',fontSize:'1.8vh',marginBottom:"5vh"}}>Monthly Recurring Fee: £{props.root.getCartTotalRecurring()}</p>

                </div>
            );
        }
        else
        {
            return (
                <div>
                    <p style={{fontWeight:'700',fontSize:'2.5vh',marginBottom:"5vh"}}>Your virtual enviorement is live.</p>
                </div>
            );
        }
    }

    function GetPayment()
    {
        if(props.root.getCartTotalAssets() + props.root.getCartTotalRecurring()!= 0) {
            return (
                <div>
                    <Wrap>
                        <Payment root={props.root} amount={props.root.getCartTotalAssets() + props.root.getCartTotalRecurring()} stripePromise={props.stripePromise} />
                    </Wrap>
                    <div style={{width:'50%',margin:'auto',marginTop:'1vh'}}>

                        <Button style={{fontSize:'2vh',paddingTop:'2vh',paddingBottom:'2vh',paddingLeft:'8vh',paddingRight:'8vh', backgroundColor:'black',color:'white',borderRadius:'48px',size:'large'}} variant="contained" onClick={()=>document.getElementById("stripepaybtn").click()}>Confirm</Button>
                    </div>
                </div>
            );
        }
        else
        {
            return (
                <div>

                </div>
            );
        }
    }

    return (
        <div style={{position:"absolute",margin:'auto',minWidth:'140px', top: '6vh',width:'60vw',left: '20vw',height:'60vh',backgroundColor:'white'}}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:"center" ,height:'100%', width:'90%', margin:'auto'}}>
                <div style={{width:'99%',margin:'auto'}}>

                    {
                        GetPaymentHeader()}
                    {GetPayment()
                    }
                </div>
            </div>
        </div>
    )
}

const ContainerWrap=styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  

  label {
    padding-bottom: 5px;
    font-weight: 700;
    font-size: 15px;
  }

  input
  {
    padding-left:5px;
    height: 35px;
  }

`

const Wrap = styled.div`
  position: relative;
  background-color: transparent;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap:15px;

  width: 100%;
  height: 50%;
  display: block;


   label {
     color:black;
    text-align: left;
    display:block;
     font-size: 18px;
  }
  input{
    border-width:0px;
    border-radius:0px;
    outline: none;
    text-align: left;
    display:block;
    font-size: 20px;
  }
`



