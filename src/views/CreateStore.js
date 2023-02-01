import styled from 'styled-components'
import React, {Component} from 'react'
import LayoutView from "./store/create/layout/LayoutView";
import StyleView from "./store/create/style/StyleView";
import AssetsView from "./store/create/assetstore/AssetsView";
import TechpackView from "./store/create/techpack/TechpackView";
import UserFormView from "./store/create/userform/UserFormView";
import Button from '@mui/material/Button';

class CreateStore extends Component
{
    constructor()
    {
        super();
        this.state = {
            name: "CreateStore",
            step:0,
            layout:0,
            style:0,
            techpack:0,
            price:149,
            showLogin:false
        };
    }

    toggleStep(stepCount)
    {
        console.log(stepCount);
        this.setState({ step: stepCount });
    }

    setLayer(layer)
    {
        this.setState({ layout: layer });
        var totalprice = this.getTotalPrice(layer);
        this.setState({price:totalprice});
        console.log('parent set layer' + layer);
        this.forceUpdate();
    }

    getTotalPrice(layout)
    {
        var basePrice = 149;

        if(layout == 1) basePrice += 79;
        if(layout == 2) basePrice += 149;
        if(layout == 3) basePrice += 209;
        if(layout == 4) basePrice += 259;

        return basePrice;
    }

    addTechPackPrice(techpack)
    {
        var layoutPrice = this.getTotalPrice(this.state.layout);

        if(techpack == 1) layoutPrice += 149;
        if(techpack == 2) layoutPrice += 399;

        this.setState({price:layoutPrice});
    }

    onChange(e,arg)
    {
        this.props.parent.updateUserField(arg,e.target.value);
    }

    setTechPack(techpack)
    {
        this.setState({ techpack: techpack });
        this.addTechPackPrice(techpack);
        this.forceUpdate();
    }

    buildStore()
    {

        if(!(this.props.parent.validateField("firstname") == null&& this.props.parent.validateField("lastname") == null&&
            this.props.parent.validateField("password") == null && this.props.parent.validateField("email") == null ))//&& this.props.parent.validateField("shopname")))
        {
            this.props.parent.setState({validateFields:true});
            console.log("failed form validation");
            return;
        }

        this.props.parent.updateUserField("setupComplete",true);
        this.props.parent.updateUserData(
            (data)=>
            {
                console.log(data);
                this.props.parent.fetchUser();
                this.props.parent.fetchBrand();
                this.props.parent.hideComponent('createstore')

            },
            (data)=>{}
        );
    }

    render()
    {
        var {step,showLogin} = this.state;

        return (
            <Container step={step}>
                <NavContainer>
                    <Button variant="contained"  style={{marginLeft:'30px'}} onClick={()=>{this.props.parent.setState({showLogin:true})}}>Login</Button>

                    <NavBar>

                    {step == 0 &&
                        <NavItemSelected>STEP 1: CHOSE YOUR LAYOUT</NavItemSelected>
                    }
                    {step != 0 && <NavItem>STEP 1: CHOSE YOUR LAYOUT</NavItem>}

                    {step == 1 && <NavItemSelected>STEP 2: CHOSE YOUR STYLE</NavItemSelected>}
                    {step != 1 && <NavItem>STEP 2: CHOSE YOUR STYLE</NavItem>}

                    {step == 2 &&<NavItemSelected>STEP 3: CHOSE YOUR 3D ASSETS</NavItemSelected>}
                    {step != 2 &&<NavItem>STEP 3: CHOSE YOUR 3D ASSETS</NavItem>}

                    {step == 3 &&<NavItemSelected>STEP 4: CONFIRM YOUR TRIAL</NavItemSelected>}
                    {step != 3 &&<NavItem>STEP 4: CONFIRM YOUR TRIAL</NavItem>}
                    </NavBar>

                    <Cart>
                        <Trolley src={'/images/store/trolly.png'}/>
                        <Pm>£{this.props.parent.getTotal()}/<span>pm</span></Pm>
                    </Cart>
                </NavContainer>

                {step == 0 && <LayoutView parent={this} root={this.props.parent}></LayoutView>}
                {step == 1 && <StyleView parent={this} root={this.props.parent}></StyleView>}
                {step == 2 && <AssetsView></AssetsView>}
                {step == 3 && <UserFormView parent={this} root={this.props.parent}></UserFormView>}
            <Footer>
                <ContactUs step={step}>
                    <h>Need More Info?</h>
                    <p>Contact Us</p>
                </ContactUs>

                {step != 3 &&<Button variant="contained" onClick={() => this.toggleStep(step+1)}>Next</Button>}
                {step == 3 &&<Button variant="contained" onClick={() => {this.buildStore();}}>Build</Button>}
            </Footer>
            </Container>
        )
    }
}

export default CreateStore

const Container= styled.div`
background-color: ${props => props.step == 0 || props.step == 1? 'white' : 'transparent'};
  width: 100vw;
  height: 100vh;
`

const LoginContainer= styled.div`
background-color: blue;
  position: static;
  width: 100vw;
  height: 100vh;
`

const Footer= styled.div`
  display:flex;
  align-items:center;
  padding-left: 6vw;
  padding-right: 6vw;
  justify-content:space-between;
  height:20vh;

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
      color:${props => props.step>1? 'white' : 'black'};
      font-size: 2vh;
    }
  
    p {
      color:${props => props.step>1? 'white' : 'black'};
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

  
`
const StyledImg = styled.img`
  margin: auto;
  position: absolute;
  width: 6vh;
  height: 6vh;
  align-content: center;
  
  object-fit: contain;
`
const NavBar = styled.div`
  display:flex;
  justify-content: space-between;
  width: 100vw;
  padding-left: 6vw;
  padding-right: 1vw;
  
 
`

const NavItem = styled.div`
  color: #a8a8a8;
  font-size: 1.8vh;
  font-weight: 300;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  text-transform: uppercase;
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
`
