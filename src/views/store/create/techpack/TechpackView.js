import styled from 'styled-components'
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { Scrollbar } from "react-scrollbars-custom";
import TechpachItem from "./TechpackItem";

class TechpackView extends Component
{
    constructor()
    {
        super();
        this.state = {
            name: "CreateStore",
            selection:0
        };
    }

    selectLayout(layoutSelection)
    {
        this.props.root.updateUserField("techPackId",layoutSelection);
        this.props.root.updateUserData(()=>{
            this.setState({selection:this.props.root.state.userData.techPackId})
        },()=>{});
    }

    componentDidMount()
    {
        this.setState({selection:this.props.root.state.userData.techPackId});
    }

    render()
    {
        var {selection} = this.state;

        return(
            <ContentView>
                <Header>
                    <HeaderDesc><h>Step 4: Chose your tech pack</h></HeaderDesc>
                    <PDesc>So much functionality to chose from! Don't panic you can change your tech pack at any time!</PDesc>

                    <Wrap>
                        <Layer1 onClick={() => this.selectLayout(0)}>
                            <TechpachItem  h0={'Core'}
                                           p0={'-Ability to talk to your customers via video calls within your virtual enviorement'}
                                           p1={'-Products link directly to your website and can also be linked to multiple forms of media via our infotags'}
                                           p2={''} p3={''} p4={''} thumbnail={'/images/techpack_2.png'}  price={0} isselected={selection==0}></TechpachItem>
                        </Layer1>
                        <Layer1 onClick={() => this.selectLayout(1)}>
                            <TechpachItem  h0={'Advanced'}
                                           p0={'-All functionality form Core tech pack'}
                                           p1={'-Ability to sit down within the enviorement and go live in a private meeting'}
                                           p2={'-Live stream media on our virtual screens'}
                                           p3={'-Marketing/promotional videos to be looped on virtual screens'}
                                           p4={'-Ability to include a virtual 2D avatar'} thumbnail={'/images/techpack_1.png'}  price={149} isselected={selection==1}></TechpachItem>
                        </Layer1>
                        <Layer1 onClick={() => this.selectLayout(2)}>
                            <TechpachItem  h0={'Premium'}
                                           p0={'-All functionality form Advanced techpack'}
                                           p1={'-Includes gamification options(click here to see our pre-made gamification tech)'}
                                           p2={'-Option for BrandLab360 team to shoot, edit and produce a virtual 3D twin avatar'}
                                           p3={''}
                                           p4={''} thumbnail={'/images/techpack_0.png'}  price={399} isselected={selection==2}></TechpachItem>
                        </Layer1>
                    </Wrap>
                </Header>
            </ContentView>
        )
    }
}

export default TechpackView

const Wrap = styled.div`
  position: absolute;
  top: 20%;
  left: 0;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 65%;
`

const Layer1 = styled.div`
  width: 52vw;
  height: 20vh;
  border: 1px solid #ededed;
  background-color: transparent;
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