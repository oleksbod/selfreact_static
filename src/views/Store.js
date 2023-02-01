import styled from 'styled-components'
import React, {Component} from 'react'
import Button from "@mui/material/Button";
import UploadLogoView from "./store/gettingstarted/UploadLogoView";
import ExploreView from "./store/gettingstarted/ExploreView";
import StartingAssetsView from "./store/gettingstarted/StartingAssetsView";
import AssetStoreView from "./store/generic/AssetStoreView";
import LayoutStoreView from "./store/generic/LayoutStoreView";
import StyleStoreView from "./store/generic/StyleStoreView";
import TechStoreView from "./store/generic/TechStoreView";
import LogoStoreView from "./store/generic/LogoStoreView";
import ImagesStoreView from "./store/generic/ImagesStoreView";
import ProductsSetup from "./store/gettingstarted/ProductsSetup";
import ProductStoreView from "./store/generic/ProductStoreView";
import {HelpStoreView} from "./store/generic/HelpStoreView";
import {SaveStoreView} from "./store/generic/SaveStoreView";
import {PublishStoreView} from "./store/generic/PublishStoreView";
import {CartStoreView} from "./store/generic/CartStoreView";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";

class CreateStore extends Component {
    constructor() {
        super();
        this.state = {
            name: "InStore",
            step: -11,
            backto: -1,
            assetSelection:-1,
            productInfoModified:false,
            showCart:false,
            stripePromise:null
        };
    }

    toggleMenu(menu)
    {
        console.log("Menu:" + menu);
        if(menu == -1 || menu == -6 || menu == -3 ||menu==  -10 || menu == -4)
        {
            if(menu==-1) {
                this.props.parent.InvokeUnity("onloadstore");

            }

                this.props.parent.setZIndex(1);

            this.props.parent.InvokeUnity("enablemovement");

        }
        else
        {
            this.props.parent.InvokeUnity("disablemovement");
            this.props.parent.setZIndex(0);
            window.unity.SendMessage('bloodbridge', "hideall");
        }

        if(menu == -6)
            window.unity.SendMessage('bloodbridge', "settutorialstate",0);
        if(menu == -5)
            window.unity.SendMessage('bloodbridge', "settutorialstate",1);
        if(menu == -3)
            window.unity.SendMessage('bloodbridge', "settutorialstate",2);
        if(menu == -2)
            window.unity.SendMessage('bloodbridge', "settutorialstate",3);

        this.setState({step:menu});
    }

    setBackMenu(menu)
    {
        this.setState({backto:menu});
    }

    componentDidMount()
    {
        if(this.props.parent.state.userData.onboardingComplete == true)
            this.toggleMenu(-1);
        else
            this.props.parent.setZIndex(0);


        this.setState({stripePromise:loadStripe("pk_test_PkbJdKkRlIVlHQ0Hrzhca6B7000H33oQik")});

    }

    nextButton()
    {
        if(this.state.step < -1) {
            if(this.state.step == -9 && this.state.assetSelection != -1)
                return (<Button variant="contained" onClick={() => {
                    this.toggleMenu(this.state.step + 1);
                    window.unity.SendMessage('bloodbridge', "instantiate", "https://selfservetest-api.azurewebsites.net" + "/cdn/serve/" + this.state.assetSelection);
                }
                }>Add</Button>)
            if(this.state.step == -5 && this.state.productInfoModified == true)
                return (<Button variant="contained" onClick={() => this.toggleMenu(this.state.step + 1)}>Update</Button>);
            if(this.state.step == -2 )
                return (<Button variant="contained" onClick={() => {this.props.parent.updateUserField("onboardingComplete",true); this.props.parent.updateUserData(
                    ()=>{

                        this.toggleMenu(-1);

                    },()=>{}
                )}}>Finish</Button>);
            else
                return (<Button variant="contained" onClick={() => this.toggleMenu(this.state.step + 1)}>Skip</Button>);
        }
    }

    render()
    {
        var {step} = this.state;

        return(
            <Container step={step}>
                <NavContainer>
                    <NavBar>
                        {step == 0 &&
                            <NavItemSelected onClick={()=>{this.toggleMenu(-1)}}>LAYOUT</NavItemSelected>
                        }
                        {step != 0 && <NavItem onClick={()=>{this.toggleMenu(0)}}>LAYOUT</NavItem>}

                        {step == 1 && <NavItemSelected onClick={()=>{this.toggleMenu(-1)}}>STYLE</NavItemSelected>}
                        {step != 1 && <NavItem onClick={()=>{this.toggleMenu(1)}}>STYLE</NavItem>}

                        {step == 2 &&<NavItemSelected onClick={()=>{this.toggleMenu(-1)}}>ASSETS</NavItemSelected>}
                        {step != 2 &&<NavItem onClick={()=>{this.toggleMenu(2)}}>ASSETS</NavItem>}

                        {step == 4 &&<NavItemSelected onClick={()=>{this.toggleMenu(-1)}}>LOGO</NavItemSelected>}
                        {step != 4 &&<NavItem onClick={()=>{this.toggleMenu(4)}}>LOGO</NavItem>}

                        {step == 5 &&<NavItemSelected onClick={()=>{this.toggleMenu(-1)}}>IMAGES</NavItemSelected>}
                        {step != 5 &&<NavItem onClick={()=>{this.toggleMenu(5)}}>IMAGES</NavItem>}

                        {step == 6 &&<NavItemSelected onClick={()=>{this.toggleMenu(-1)}}>INFOTAGS</NavItemSelected>}
                        {step != 6 &&<NavItem onClick={()=>{this.toggleMenu(6)}}>INFOTAGS</NavItem>}
                    </NavBar>

                    <Cart>
                        <Cart style={{gap:'2vw'}}>
                        {step == 7 &&<NavItemSelected onClick={()=>{this.toggleMenu(-1)}}>HELP</NavItemSelected>}
                        {step != 7 &&<NavItem onClick={()=>{this.toggleMenu(7)}}>HELP</NavItem>}

                            {step == 8 &&<NavItemSelected onClick={()=>{this.toggleMenu(-1)}}>SAVE</NavItemSelected>}
                            {step != 8 &&<NavItem onClick={()=>{this.toggleMenu(8)}}>SAVE</NavItem>}

                            {step == 9 &&<NavItemSelected onClick={()=>{this.toggleMenu(-1)}}>PUBLISH</NavItemSelected>}
                            {step != 9 &&<NavItem onClick={()=>{this.toggleMenu(9)}}>PUBLISH</NavItem>}
                        </Cart >
                        <Trolley onClick={()=>
                        {
                            if(step != 10) {
                                if(this.state.showCart == true)
                                {
                                    this.setState({showCart:false});
                                }
                                else
                                     this.toggleMenu(10);
                            }
                            else
                            {
                                this.toggleMenu(-1);
                            }
                        }}  src={'/images/store/trolly.png'}/>
                        <Pm>£{this.props.parent.getTotal()}/<span>pm</span></Pm>
                    </Cart>
                </NavContainer>

                {step == -11 && <UploadLogoView parent={this} root={this.props.parent}></UploadLogoView>}
                {step == -10 && <ExploreView parent={this}></ExploreView>}
                {step == -9 &&  <StartingAssetsView parent={this}  root={this.props.parent}></StartingAssetsView>}
                {step >= -8 && step < -1 &&  <ProductsSetup parent={this} root={this.props.parent}></ProductsSetup>}

                {step == 2 &&  <AssetStoreView parent={this} root={this.props.parent}></AssetStoreView>}
                {step == 0 &&  <LayoutStoreView parent={this} root={this.props.parent}></LayoutStoreView>}
                {step == 1 &&  <StyleStoreView parent={this} root={this.props.parent}></StyleStoreView>}

                {step == 4 &&  <LogoStoreView parent={this} root={this.props.parent}></LogoStoreView>}
                {step == 5 &&  <ImagesStoreView parent={this} root={this.props.parent}></ImagesStoreView>}
                {step == 6 &&  <ProductStoreView parent={this} root={this.props.parent}></ProductStoreView>}
                {step == 7 &&  <HelpStoreView parent={this} root={this.props.parent}></HelpStoreView>}
                {step == 8 &&  <SaveStoreView parent={this} root={this.props.parent}></SaveStoreView>}
                {step == 9 &&  <PublishStoreView parent={this} root={this.props.parent} stripePromise={this.state.stripePromise}></PublishStoreView>}
                {(step == 10||this.state.showCart) &&  <CartStoreView parent={this} root={this.props.parent}></CartStoreView>}

                {step >-2 && <img style={{position:'absolute',width:'10vw',right:'0.5vw',top:"6.5vh",'z-index':'1'}} src={'images/logo_showroom.png'}></img>}

                {this.state.step != -1 &&<Footer>
                    <ContactUs step={step}>
                        <h>Need More Info?</h>
                        <p>Contact Us</p>
                    </ContactUs>

                    {this.nextButton()}
                </Footer>}

            </Container>
        )
    }
}

export default CreateStore

const Container= styled.div`
background-color: ${props => props.step == 0 || props.step == 1? 'white' : 'transparent'};
 display:flex;
  flex-direction:column;
  justify-content:space-between;
  height: 100vh;
  background-color:transparent;
 z-index:-2;
`

const Footer= styled.div`
  display:flex;
  align-items:center;
  padding-left: 6vw;
  padding-right: 6vw;
  justify-content:space-between;
  height:20vh;
z-index:2;
  button {
    background-color: #232323;
    border: none;
    color: white;
    padding: 2vh;
    padding-left: 42px;
    padding-top:8px;
    padding-bottom: 8px;
    padding-right: 42px;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 2vh;
    border-radius: 24px;
    
  }
`

const ContactUs = styled.div`
  display:flex;
  flex-direction:column;
  flex-align:start;
    h {
      color:${props => props.step!= 99? 'white' : 'black'};
      font-size: 2vh;
    }
  
    p {
      color:${props => props.step!=99? 'white' : 'black'};
      text-decoration: underline;
      font-weight: 700;
      text-align: start;
      font-size: 2vh;
    }
`

const Cart = styled.div`
  height: 2vh;
  padding-right: 4vw;
  display:flex;
  align-content: center;
  spacing: 4px;
  justify-content:space-between;
`

const Pm = styled.div`
  width: 120%;
  color: #232323;
  font-size: 2vh;
  font-weight: 700;
  padding-left: 0.5vw;

  span{
    font-size:0.5em;
  }
`

const Trolley = styled.img`
  height: 2vh;
`

const NavContainer = styled.div`
  width: 100vw;
  height: 6vh;
  align-content: center;
  background-color: #f0f0f0;
  display:flex;
  align-items: center;
  z-index:2;
`

const NavBar = styled.div`
  display:flex;
  justify-content: left;
  width: 100vw;
  padding-left: 6vw;
  padding-right: 1vw;
  gap: 3vw;
`

const NavItem = styled.div`
  color: #404040;
  font-size: 1.8vh;
  font-weight: 200;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  text-transform: uppercase;
  cursor:pointer;
`

const NavItemSelected = styled.div`
  color: #232323;
  font-size: 1.8vh;
  font-weight: 600;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  text-transform: uppercase;
  align-content: center;
  cursor:pointer;
`

