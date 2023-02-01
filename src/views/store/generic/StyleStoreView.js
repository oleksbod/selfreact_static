import styled from 'styled-components'
import React, {Component} from 'react'

class StyleStoreView extends Component
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
        this.props.root.updateUserField("styleId",layoutSelection);
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
                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <WrapPrice>
                            <img src={'/images/store/Rectangle_3.png'}/>
                            <p>CURRENT</p>
                        </WrapPrice>
                        <LayoutItem isselected={selection==0}>
                            <img src={'/images/store/style_0.png'}></img>
                            <LayoutDescription>
                                <h>Modern & Minimalist</h>

                            </LayoutDescription>

                            <SelectorWrap isselected={selection==0} onClick={() => this.selectLayout(0)}></SelectorWrap>
                        </LayoutItem>
                    </div>
                </div>

                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <WrapPrice>
                            <img src={'/images/store/Rectangle_3.png'}/>
                            <p1>FREE         </p1>
                        </WrapPrice>
                        <LayoutItem isselected={selection==1}>
                            <img src={'/images/store/style_1.png'}></img>
                            <LayoutDescription>
                                <h>Traditional & Classic</h>

                            </LayoutDescription>

                            <SelectorWrap isselected={selection==1} onClick={() => this.selectLayout(1)}></SelectorWrap>
                        </LayoutItem>
                    </div>
                </div>

                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <WrapPrice>
                            <img src={'/images/store/Rectangle_3.png'}/>
                            <p1>FREE         </p1>
                        </WrapPrice>
                        <LayoutItem isselected={selection==2}>
                            <img src={'/images/store/style_2.png'}></img>
                            <LayoutDescription>
                                <h>Dark & Futuristic</h>
                            </LayoutDescription>

                            <SelectorWrap isselected={selection==2} onClick={() => this.selectLayout(2)}></SelectorWrap>
                        </LayoutItem>
                    </div>
                </div>

                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <WrapPrice>
                            <img src={'/images/store/Rectangle_3.png'}/>
                            <p1>FREE         </p1>
                        </WrapPrice>
                        <LayoutItem isselected={selection==3}>
                            <img src={'/images/store/style_3.png'}></img>
                            <LayoutDescription>
                                <h>Industrial & Urban</h>

                            </LayoutDescription>

                            <SelectorWrap isselected={selection==3} onClick={() => this.selectLayout(3)}></SelectorWrap>
                        </LayoutItem>
                    </div>
                </div>
            </ContentView>
        )
    }
}

export default StyleStoreView

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
  right: 3px;
  
  z-index: 10;
  -webkit-justify-content: flex-end;
  align-items: flex-end;
  -webkit-align-items: flex-end;
text-align: center;


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
    right: 3%;
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
    width:96%;
  height:13.5vh;
  align-items: center;
  justify-content: space-between;
  display:flex;
  padding-left: 2vh;
  color:  ${props => props.isselected == true? 'black':'rgb(117,117,117)' };
  
  img
  {
    height:100%;
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
  background-color: #white;
  position: absolute;
  top: 5vh;
  left: 10vw;
  width: 70vh;
  height: 85vh;
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 0vh;
  padding-top:1vh;
  padding-left:0.2vw;
  padding-right:0.2vw;
  padding-bottom:1vh;
`
