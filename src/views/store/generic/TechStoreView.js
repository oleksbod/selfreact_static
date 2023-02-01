import styled from 'styled-components'
import React, {Component} from 'react'

class TechStoreView extends Component
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
                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <WrapPrice>
                            <img src={'/images/store/Rectangle_3.png'}/>
                            <p>CURRENT</p>
                        </WrapPrice>
                        <LayoutItem isselected={selection==0}>
                            <img src={'/images/techpack_0.png'}></img>
                            <LayoutDescription>
                                <h>Core</h>
                                <p>-Ability to talk to your customers via video calls within your virtual enviorement</p>
                                <p>-Products link directly to your website and can also be linked to multiple forms of media via our infotags</p>

                            </LayoutDescription>
                            <SelectorWrap isselected={selection==0} onClick={() => this.selectLayout(0)}></SelectorWrap>
                        </LayoutItem>
                    </div>
                </div>

                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <WrapPrice>
                            <img src={'/images/store/Rectangle_3.png'}/>
                            <p1>+£149<span>/pm</span></p1>
                        </WrapPrice>
                        <LayoutItem isselected={selection==1}>
                            <img src={'/images/techpack_1.png'}></img>
                            <LayoutDescription>
                                <h>Advanced</h>
                                <p>-All functionality form Core tech pack</p>
                                <p>-Ability to sit down within the enviorement and go live in a private meeting</p>
                                <p>-Live stream media on our virtual screens</p>
                                <p>-Marketing/promotional videos to be looped on virtual screens</p>
                                <p>-Ability to include a virtual 2D avatar</p>
                            </LayoutDescription>
                            <SelectorWrap isselected={selection==1} onClick={() => this.selectLayout(1)}></SelectorWrap>
                        </LayoutItem>
                    </div>
                </div>

                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <WrapPrice>
                            <img src={'/images/store/Rectangle_3.png'}/>
                            <p1>+£399<span>/pm</span></p1>
                        </WrapPrice>
                        <LayoutItem isselected={selection==2}>
                            <img src={'/images/techpack_2.png'}></img>
                            <LayoutDescription>
                                <h>Premium</h>
                                <p>-All functionality form Advanced techpack</p>
                                <p>-Includes gamification options(click here to see our pre-made gamification tech)</p>
                                <p>-Option for BrandLab360 team to shoot, edit and produce a virtual 3D twin avatar</p>
                            </LayoutDescription>
                            <SelectorWrap isselected={selection==2} onClick={() => this.selectLayout(2)}></SelectorWrap>
                        </LayoutItem>
                    </div>
                </div>
            </ContentView>
        )
    }
}

export default TechStoreView

const LayoutDescription =styled.div`
    text-align: left;
  padding-right:4vh;
  display: flex;
  justify-content:start;
  flex-direction: column;
  align-items:start;
  width:100%;
  padding-left:3vh;
  font-size: 2vh;
  
  h
  {
    
  }

  p
  {
    font-size: 1vh;
  }
`

const SelectorWrap =styled.button`
  width: 100%;
  height: 19vh;
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
  height:19vh;
  align-items: center;
  justify-content: space-between;
  display:flex;
  color:  ${props => props.isselected == true? 'black':'rgb(117,117,117)' };
  
  img
  {
    height:100%;
  }
 
  h
  {
    font-weight: bold;
    font-size:.9em;
    align-items: start;
    text-align: left;
    justify-content:start;
  }
  
  p
  {
    font-size:.8em;
    align-items: start;
  }
`

const ContentView = styled.div`
  background-color: white;
  position: absolute;
  top: 6vh;
  left: 25vw;
  width: 100vh;
  height: 64vh;
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 0vh;
  padding-top:1vh;
  padding-left:0.2vw;
  padding-right:0.2vw;
  padding-bottom:2vh;
`
