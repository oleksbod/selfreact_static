import styled from 'styled-components'
import React, {Component} from 'react'

class TechpackItem extends Component {
    constructor() {
        super();
        this.state = {
            name: "CreateStore",
        };
    }

    render() {
        return (
<ViewSplit >
    <SelectionBox isselected={this.props.isselected}></SelectionBox>
            <Container thumbnail={this.props.thumbnail}>

            </Container>
            <Container style={{width: '100%'}}>
                <Wrap >
                    <h>{this.props.h0}</h>
                    <p>{this.props.p0}</p>
                    <p>{this.props.p1}</p>
                    <p>{this.props.p2}</p>
                    <p>{this.props.p3}</p>
                    <p>{this.props.p4}</p>
                </Wrap>
                <WrapPrice>
                    <img src={'/images/store/Rectangle_3.png'}/>
                    <p>{this.props.price ==0?'FREE   ':'+£'+this.props.price}<span>{this.props.price ==0?'':'/pm'}</span></p>
                </WrapPrice>
            </Container>
</ViewSplit>
        )
    }
}

export default TechpackItem

const SelectionBox = styled.div`
position: absolute;
  width: 52vw;
  height: 20vh;
  outline-color:${props => props.isselected == true? 'dodgerblue' : 'transparent'};
  outline-style: inset;
  outline-width: thin;
`

const ViewSplit= styled.div`
display:flex;
  
  background-color:#fbfbfb;
  height:100%;
  width:100%;
`


const Container = styled.div`
  width: 29vh;
  height: 20vh;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.thumbnail});
  
`

const WrapPrice = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  -webkit-justify-content: flex-end;
  align-items: flex-end;
  -webkit-align-items: flex-end;

  p{
    position: absolute;
    font-size:1.8vh;
    font-weight: 700;
    top: 30%;
    right: 12%;
  }

  span{
    font-size:0.5em;
  }

  img
  {
    height: 4vh;
  }
`

const Wrap = styled.div`
  outline-color:${props => props.isselected == true? 'dodgerblue' : 'transparent'};
  outline-style: inset;
  outline-width: thin;
  width:95%;
  height:100%;
  display:flex;
  padding-top: 0%;
  padding-left: 2%;
  align-items:start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h{
  font-weight: 800;
    font-size: 2vh;
  }
  
  p
  {
    text-align: left;
    font-size: 1.8vh;
  }
  

  
    img {
      height: 16vh;
      width: 16vh;
  
     title {
       display:block;
       font-size: 2vh;
       color: #232323;
       font-weight: 800;
       font-style: normal;
       letter-spacing: normal;
       text-align: left;
     }
  
     price {
       display:flex;
       font-size: 2vh;
       color: #232323;
       font-weight: 700;
       font-style: normal;
       letter-spacing: normal;
       text-align: right;
     }
  
     description
     {
       display:flex;
       font-size: 2vh;
       color: #232323;
       font-weight: 400;
       font-style: normal;
       letter-spacing: normal;
       text-align: left;
     }
`