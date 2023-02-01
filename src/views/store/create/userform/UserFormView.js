import styled from 'styled-components'
import React, {Component} from 'react'
import Form from './Form'
class UserFormView extends Component {
    constructor() {
        super();
        this.state = {
            name: "CreateStore",
            selection: 0
        };
        this.selectLayout = this.selectLayout.bind(this);
    }

    selectLayout(layoutSelection) {
        console.log("Selected Layout:" + layoutSelection)
        this.setState({selection: layoutSelection});
    }

    handleChange(event, arg) {
        this.props.parent.onChange(event, arg);
    }


    render()
    {
        var {selection} = this.state;

        return(
            <ContentView>
                <Header>
                    <HeaderDesc><h>Step 4: Confirm your trial</h></HeaderDesc>
                    <PDesc>Try us for 72hours!</PDesc>

                    <Wrap>
                        <ContainerWrap>
                            <label htmlFor="fname">First name</label>
                            <input type="text" id="fname" name="fname" onChange={(e)=>{this.handleChange(e,"firstname")}}/>
                            {this.props.root.state.validateFields && <p>{this.props.root.validateField("firstname")}</p>}
                        </ContainerWrap>
                        <ContainerWrap>
                            <label htmlFor="fname">Last Name</label>
                            <input type="text" id="fname" name="fname" onChange={(e)=>{this.handleChange(e,"lastname")}}/>
                            {this.props.root.state.validateFields && <p>{this.props.root.validateField("lastname")}</p>}
                        </ContainerWrap>
                        <ContainerWrap>
                            <label htmlFor="fname">Email</label>
                            <input type="email" id="fname" name="fname" onChange={(e)=>{this.handleChange(e,"email")}}/>
                            {this.props.root.state.validateFields && <p>{this.props.root.validateField("email")}</p>}
                        </ContainerWrap>
                        <ContainerWrap>
                            <label htmlFor="fname">Password</label>
                            <input type="password" id="fname" name="fname" onChange={(e)=>{this.handleChange(e,"password")}}/>
                            {this.props.root.state.validateFields && <p>{this.props.root.validateField("password")}</p>}
                        </ContainerWrap>
                        <ContainerWrap>
                            <label htmlFor="fname">Shopname</label>
                            <input type="text" id="fname" name="fname" onChange={(e)=>{this.handleChange(e,"shopname")}}/>
                            {this.props.root.state.validateFields && <p>{this.props.root.validateField("shopname")}</p>}
                        </ContainerWrap>
                        <ContainerWrap>
                            <label htmlFor="fname">Country</label>
                            <input type="text" id="fname" name="fname" onChange={(e)=>{this.handleChange(e,"country")}}/>
                        </ContainerWrap>
                        <ContainerWrap>
                            <label htmlFor="fname">Company</label>
                            <input type="text" id="fname" name="fname" onChange={(e)=>{this.handleChange(e,"company")}}/>
                        </ContainerWrap>
                        <ContainerWrap>
                            <label htmlFor="fname">Job Title</label>
                            <input type="text" id="fname" name="fname" onChange={(e)=>{this.handleChange(e,"jobtitle")}}/>
                        </ContainerWrap>
                    </Wrap>
                </Header>
            </ContentView>
        )
    }
}

export default UserFormView

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

  p
  {
    padding-top: 3px;
    font-size: 0.8em;
    color: red;
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

  left: 25%;
  top: 25%;
  width: 50%;
  height: 50%;
  display: grid;

  grid-template-columns: repeat(2, minmax(0,1fr));

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

const Layer1 = styled.div`
  width: 52vw;
  height: 20vh;
  border: 1px solid #ededed;
  background-color: #fbfbfb;
  display:grid;
  
  overflow-y: hidden;
  cursor:pointer;

`

const ContentView = styled.div`
  background-color:transparent;
  width:100vw;
  height: 70vh;
  display:flex;
  justify-content:center;
  flex-direction:column;
`

const Header = styled.div`
  width:100vw;
  height: 70vh;
  display:flex;
  justify-content:start;
  flex-direction:column;
  padding-left: 6vw;
  padding-top: 3vh;
`

const HeaderDesc = styled.div`

  color: white;
  font-family: "Calibre - Semibold";
  font-size: 4vh;
  font-weight: 800;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
`

const PDesc = styled.div`
  padding-top: 1vh;
  color: white;
  font-size: 2vh;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
`