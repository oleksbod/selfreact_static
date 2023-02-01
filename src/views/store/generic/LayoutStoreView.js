import styled from 'styled-components'
import React, {Component} from 'react'

class LayoutStoreView extends Component
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

    getLayoutPriceWrap(layoutIdx)
    {
        var {selection} = this.state;
        var ownedLayouts = this.props.root.state.userData.ownedLayounts;

            if(selection == layoutIdx) {
                return (
                    <>
                        <img src={'/images/store/Rectangle_3.png'}/>
                        <p>CURRENT</p>
                    </>
                )
            }
            else
            {
                if(layoutIdx == 0)
                    return (
                        <>
                            <img src={'/images/store/Rectangle_3.png'}/>
                            <p1>£149<span>/pm</span></p1>
                        </>)
                else if(layoutIdx == 1)
                    return (
                        <>
                            <img src={'/images/store/Rectangle_3.png'}/>
                            <p1>+£79<span>/pm</span></p1>
                        </>)
                else if(layoutIdx == 2)
                    return (
                        <>
                            <img src={'/images/store/Rectangle_3.png'}/>
                            <p1>+£149<span>/pm</span></p1>
                        </>)
                else if(layoutIdx == 3)
                    return (
                        <>
                            <img src={'/images/store/Rectangle_3.png'}/>
                            <p1>+£209<span>/pm</span></p1>
                        </>)
                else if(layoutIdx == 4)
                    return (
                        <>
                            <img src={'/images/store/Rectangle_3.png'}/>
                            <p1>+£259<span>/pm</span></p1>
                        </>)
            }


    }

    render()
    {
        var {selection} = this.state;
        var ownedLayouts = this.props.root.state.userData.ownedLayounts;

        return(
            <ContentView>
                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <WrapPrice>
                            {this.getLayoutPriceWrap(0)}

                        </WrapPrice>

                        <LayoutItem isselected={selection==0}>
                            {ownedLayouts.includes(0)&&<img src={'/images/icons/unlocked.png'}></img>}
                            {!ownedLayouts.includes(0)&& <img src={'/images/icons/locked.png'}></img>}

                            <img src={'/images/store/Room_1.png'} style={{height:'90%'}}></img>
                            <LayoutDescription>
                                <h>Small Store</h>
                                <p>Ideal for up to 50 products</p>

                            </LayoutDescription>

                            <SelectorWrap isselected={selection==0} onClick={() => this.selectLayout(0)}>

                            </SelectorWrap>
                        </LayoutItem>
                    </div>
                </div>

                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <WrapPrice>
                            {this.getLayoutPriceWrap(1)}
                        </WrapPrice>

                        <LayoutItem isselected={selection==1}>
                            {ownedLayouts.includes(1)&&<img src={'/images/icons/unlocked.png'}></img>}
                            {!ownedLayouts.includes(1)&& <img src={'/images/icons/locked.png'}></img>}
                            <img src={'/images/store/Room_2.png'} style={{height:'90%'}}></img>
                            <LayoutDescription>
                                <h>Medium Store</h>
                                <p>Ideal for up to 100 products</p>

                            </LayoutDescription>

                            <SelectorWrap isselected={selection==1} onClick={() => this.selectLayout(1)}></SelectorWrap>
                        </LayoutItem>
                    </div>
                </div>

                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <WrapPrice>
                            {this.getLayoutPriceWrap(2)}
                        </WrapPrice>

                        <LayoutItem isselected={selection==2}>
                            {ownedLayouts.includes(2)&&<img src={'/images/icons/unlocked.png'}></img>}
                            {!ownedLayouts.includes(2)&& <img src={'/images/icons/locked.png'}></img>}
                            <img src={'/images/store/Room_3.png'} style={{height:'90%'}}></img>
                            <LayoutDescription>
                                <h>Large Store</h>
                                <p>Ideal for up to 150 products</p>
                            </LayoutDescription>

                            <SelectorWrap isselected={selection==2} onClick={() => this.selectLayout(2)}></SelectorWrap>
                        </LayoutItem>
                    </div>
                </div>

                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <WrapPrice>
                            {this.getLayoutPriceWrap(3)}
                        </WrapPrice>

                        <LayoutItem isselected={selection==3}>
                            {ownedLayouts.includes(3)&&<img src={'/images/icons/unlocked.png'}></img>}
                            {!ownedLayouts.includes(3)&& <img src={'/images/icons/locked.png'}></img>}
                            <img src={'/images/store/Room_4.png'} style={{height:'90%'}}></img>
                            <LayoutDescription>
                                <h>Premium Store</h>
                                <p>Ideal for up to 200 products</p>

                            </LayoutDescription>

                            <SelectorWrap isselected={selection==3} onClick={() => this.selectLayout(3)}></SelectorWrap>
                        </LayoutItem>
                    </div>
                </div>

                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <WrapPrice>
                            {this.getLayoutPriceWrap(4)}
                        </WrapPrice>
                        <LayoutItem isselected={selection==4}>
                            {ownedLayouts.includes(4)&&<img src={'/images/icons/unlocked.png'}></img>}
                            {!ownedLayouts.includes(4)&& <img src={'/images/icons/locked.png'}></img>}
                            <img src={'/images/store/Room_5.png'} style={{height:'90%'}}></img>
                            <LayoutDescription>
                                <h>Department Store</h>
                                <p>Ideal for up to 250 products</p>

                            </LayoutDescription>

                            <SelectorWrap isselected={selection==4} onClick={() => this.selectLayout(4)}></SelectorWrap>
                        </LayoutItem>
                    </div>
                </div>


            </ContentView>
        )
    }
}

export default LayoutStoreView

const LayoutDescription =styled.div`
    text-align: start;
  padding-right:18vh;
  
`

const SelectorWrap =styled.button`
  width: 100%;
  height: 14vh;
  position: absolute;
  background-color:  ${props => props.isselected == true? 'transparent':'rgba(147, 147, 147, 0.12)' };
  z-index: 52;
  left: 0;
  border-width: 0;
`

const WrapPrice = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  z-index: 10;
  -webkit-justify-content: flex-end;
  align-items: flex-end;
  -webkit-align-items: flex-end;

  
  
  p{
    position: absolute;
    font-size:100%;
    font-weight: 700;
    top: 30%;
    right: 1%;
  }

  p1{
    position: absolute;
    font-size:larger;
    font-weight: 700;
    top: 30%;
    right: 1%;
  }
  
  h
  {
    position: absolute;
    margin-right: 1%;
  }
  
  span{
    font-size:0.5em;
  }
  
  img
  {
    height: 4%;
    width:16%;
  }
`

const LayoutItem = styled.div`
    background-color:white;
    width:100%;
  height:14vh;
  align-items: center;
  justify-content: space-between;
  display:flex;
  padding-left: 2vh;
  color:  ${props => props.isselected == true? 'black':'rgb(117,117,117)' };
  
  img
  {
    height:50%;
  }
 
  h
  {
    font-weight: bold;
    font-size:.9em;
  }
  
  p
  {
    font-size:.8em;
  }
`

const ContentView = styled.div`
  background-color: white;
  position: absolute;
  top: 6vh;
  left: 5vw;
  width: 70vh;
  height: 80vh;
  display: flex;
  justify-content: start;
  flex-direction: column;
  padding-top:2vh;
  padding-left:0.2vw;
  padding-right:0.2vw;
  padding-bottom:2vh;
`
