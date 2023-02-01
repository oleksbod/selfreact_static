import styled from 'styled-components'
import React, {Component} from 'react'
import StyleItem from "./StyleItem";

class StyleView extends Component
{
    constructor()
    {
        super();
        this.state = {
            name: "CreateStore",
            selection:1
        };
        this.selectStyle = this.selectStyle.bind(this);
    }

    selectStyle(styleSelection)
    {
        this.props.root.updateUserField("styleId",styleSelection);
        this.props.root.updateUserData(()=>{
            this.setState({selection:this.props.root.state.userData.styleId})
        },()=>{});
    }

    componentDidMount()
    {
        this.setState({selection:this.props.root.state.userData.styleId});
    }

    render()
    {
        var {selection} = this.state;

        return(
            <ContentView>
                <ViewSplit>
                    <div>
                        <Header>
                            <HeaderDesc><h>Step 2: Chose your style.</h></HeaderDesc>
                            <PDesc>Decisions are hard. Don't worry, you can upgrade or downgrade your style at any time!</PDesc>
                        </Header>
                    </div>
                    <LayoutsOptions>
                        <LayoutRow>
                            <Layer1 onClick={() => this.selectStyle(1)}>
                                <StyleItem  thumbnail={'/images/store/style_2.png'} title={'Modern & Minimalist'} description={'Ideal for up to 100 products'} price={79} isselected={selection==1}></StyleItem>
                            </Layer1>
                            <Layer1 onClick={() => this.selectStyle(2)}>
                                <StyleItem   thumbnail={'/images/store/style_1.png'} title={'Traditional & Classic'} description={'Ideal for up to 150 products'} price={149} isselected={selection==2}></StyleItem>
                            </Layer1>
                        </LayoutRow>
                        <LayoutRow>
                            <Layer1 onClick={() => this.selectStyle(3)}>
                                <StyleItem   thumbnail={'/images/store/style_3.png'} title={'Dark & Futuristic'} description={'Ideal for up to 200 products'} price={209} isselected={selection==3}></StyleItem>
                            </Layer1>
                            <Layer1 onClick={() => this.selectStyle(4)}>
                                <StyleItem  thumbnail={'/images/store/style_0.png'} title={'Industrial & Urban'} description={'Ideal for up to 250 products'} price={259} isselected={selection==4}></StyleItem>
                            </Layer1>
                        </LayoutRow>
                    </LayoutsOptions>
                </ViewSplit>
            </ContentView>
        )
    }
}

export default StyleView

const LayoutsOptions = styled.div`
  display:flex;
  justify-content:space-between;
  flex-direction:column;
  align-items:center;
  padding-top : 4vh;
  padding-right: 7vw;
`

const Layer1 = styled.div`
  width: 42vh;
  height: 31vh;
  border: 1px solid #ededed;
  background-color: #fbfbfb;
  display:flex;
  cursor:pointer;
`

const LayoutRow = styled.div`
  display:flex;
  gap: 4vw;
`

const ContentView = styled.div``

const ViewSplit = styled.div`
  display:flex;
  justify-content: space-between;
`

const Header = styled.div`
  width:30vw;
  height: 70vh;
  display:flex;
  justify-content:center;
  flex-direction:column;
  padding-left: 6vw;
  `

const HeaderDesc = styled.div`
 
color: #232323;
font-family: "Calibre - Semibold";
font-size: 4vh;
font-weight: 800;
font-style: normal;
letter-spacing: normal;
text-align: left;
`

const PDesc = styled.div`
  padding-top: 4vh;
  color: #232323;
  font-size: 2vh;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
`