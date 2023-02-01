import styled from 'styled-components'
import React, {Component} from 'react'
import LayoutItem from "./LayoutItem";


class LayoutView extends Component
{
    constructor()
    {
        super();
        this.state = {
            name: "CreateStore",
            selection:0
        };
        this.selectLayout = this.selectLayout.bind(this);
    }

    selectLayout(layoutSelection)
    {
        this.props.root.updateUserField("layoutId",layoutSelection);
        this.props.root.updateUserData(()=>{
            this.setState({selection:this.props.root.state.userData.layoutId})
        },()=>{});
    }

    componentDidMount()
    {
        this.setState({selection:this.props.root.state.userData.layoutId});
    }

    render()
    {
        var {selection} = this.state;

    return(
        <ContentView>

            <ViewSplit>
                <div>
                    <Header>
                        <HeaderDesc><h>Step 1: Chose your layout.</h></HeaderDesc>
                    <PDesc>Decisions are hard. Don't worry, you can upgrade or downgrade your layout at any time!</PDesc>
                    </Header>
                </div>
                <LayoutsOptions>
                    <LayoutRow>
                        <Layer1 onClick={() => this.selectLayout(0)}>
                            <LayoutItem  thumbnail={'/images/store/Room_1.png'} title={'Small Store'} description={'Ideal for up to 50 products'} price={-149} isselected={selection==0}></LayoutItem>
                        </Layer1>
                          </LayoutRow>
                    <LayoutRow>
                        <Layer1 onClick={() => this.selectLayout(1)}>
                            <LayoutItem  thumbnail={'/images/store/Room_2.png'} title={'Medium Store'} description={'Ideal for up to 100 products'} price={79} isselected={selection==1}></LayoutItem>
                        </Layer1>
                        <Layer1 onClick={() => this.selectLayout(2)}>
                            <LayoutItem   thumbnail={'/images/store/Room_3.png'} title={'Large Store'} description={'Ideal for up to 150 products'} price={149} isselected={selection==2}></LayoutItem>
                        </Layer1>
                    </LayoutRow>
                    <LayoutRow>
                        <Layer1 onClick={() => this.selectLayout(3)}>
                            <LayoutItem   thumbnail={'/images/store/Room_4.png'} title={'Premium Store'} description={'Ideal for up to 200 products'} price={209} isselected={selection==3}></LayoutItem>
                        </Layer1>
                        <Layer1 onClick={() => this.selectLayout(4)}>
                            <LayoutItem  thumbnail={'/images/store/Room_5.png'} title={'Department Store'} description={'Ideal for up to 250 products'} price={259} isselected={selection==4}></LayoutItem>
                        </Layer1>
                    </LayoutRow>
                </LayoutsOptions>
            </ViewSplit>
        </ContentView>
    )
    }
}

export default LayoutView

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
  height: 18vh;
  border: 1px solid #ededed;
  background-color: #fbfbfb;
  display:flex;
  cursor:pointer;
`

const LayoutRow = styled.div`
  display:flex;
  gap: 4vw;
`

const ContentView = styled.div`

`

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