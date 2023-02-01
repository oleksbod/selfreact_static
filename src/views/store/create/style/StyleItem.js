import styled from 'styled-components'
import React, {Component} from 'react'

class StyleItem extends Component {
    constructor() {
        super();
        this.state = {
            name: "CreateStore",
        };
    }

    render() {
        return (
            <Container thumbnail={this.props.thumbnail}>
                <Wrap isselected={this.props.isselected}>
                    <title>{this.props.title}</title>
                </Wrap>
                    <WrapPrice>
                        <img src={'/images/store/Rectangle_3.png'}/>
                        <p>FREE</p>
                    </WrapPrice>
            </Container>

        )
    }
}

export default StyleItem

const Container = styled.div`
  width: 100%;
  height: 100%;
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
  width: 100px;
  -webkit-justify-content: flex-end;
  align-items: flex-end;
  -webkit-align-items: flex-end;

  p{
    position: absolute;
    font-size:1.8vh;
    font-weight: 700;
    top: 30%;
    right: 18%;
  }

  span{
    font-size:0.5em;
  }

  img
  {
    height: 4vh;
  }
`

const WrapSplit = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:start;
  padding-left: 10%;
`

const Wrap = styled.div`
  outline-color:${props => props.isselected == true? 'dodgerblue' : 'transparent'};
  outline-style: inset;
  outline-width: thin;
  width:100%;
  height:100%;
  display:flex;
  padding-top: 2%;
  padding-left: 2%;
  align-items:start;
  
    img {
      height: 16vh;
      width: 16vh;
    }
  
     title {
       display:flex;
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