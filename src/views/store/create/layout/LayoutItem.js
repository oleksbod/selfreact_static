import styled from 'styled-components'
import React, {Component} from 'react'

class LayoutItem extends Component {
    constructor() {
        super();
        this.state = {
            name: "CreateStore",
        };
    }

    getPrice()
    {
        if(this.props.price < 0)
        {
         return(<>{-1  * this.props.price }</>);
        }
        else
            return(<>+{this.props.price }</>);
    }

    render() {
        return (
        <Container>

            <Wrap isselected={this.props.isselected}>
                <WrapSplit>
                    <img src={this.props.thumbnail}/>
                </WrapSplit>
                <WrapSplit>

                    <title>{this.props.title}</title>
                    <description>{this.props.description}</description>
                </WrapSplit>
            </Wrap>
            {this.props.price != 0 &&
                <WrapPrice>
                <img src={'/images/store/Rectangle_3.png'}/>
                    <p>{this.getPrice()} <span>/pm</span></p>
                </WrapPrice>}
        </Container>

        )
    }
}

export default LayoutItem

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  
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
    right: 10%;
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
  align-items:center;
  
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