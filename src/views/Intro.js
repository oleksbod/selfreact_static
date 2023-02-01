import styled from 'styled-components'
import React, {Component} from 'react'

class Intro extends Component {
    constructor() {
            super();
            this.state = {
                  name: "Intro"
            };
          }

    render() {
        return (
            <Container onClick={() => this.props.parent.hideComponent("intro")}>
                <DescriptionGroup>
                    <Header>
                        <p>Why build a</p>
                        <p>virtual reality</p>
                        <p>environment with</p>
                        <p>BrandLab360?</p>
                    </Header>

                    <Header2>Let’s talk.</Header2>
                    <BtnHallow>Register for a callback</BtnHallow>
                </DescriptionGroup>
            </Container>
        )
    }
}

export default Intro

const Container = styled.div`

  height:100vh;
  width:100vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/images/intro/bg.jpg');
  z-index:2;
`

const DescriptionGroup = styled.div`
  padding-left: 4vw;
  padding-top: 4vh;
  width:61.5vh;
  height: 92vh;
  display:flex;
  flex-direction:column;
  justify-content: space-between;
`

const Header = styled.div`
  color: #ffffff;
  font-size: 6vh;
  font-weight: 900;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  line-height: normal;
  
  p
  {
    display: inline-block;
  }
    `
const Header2 = styled(Header)
    `
      color: #c3eeff;
    `

const BtnHallow = styled.button`
  border: 2px solid white;
  width:80%;
  background-color: transparent;
  color: white;
  padding: 8px 0px;
  spacing: 1px;
  font-size: 3vh;
  cursor: pointer;
    `
