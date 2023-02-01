import styled from 'styled-components'
import React, {Component} from 'react'

class ExploreView extends Component
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
        console.log("Selected Layout:" + layoutSelection)
        this.setState({selection:layoutSelection});
        this.props.parent.setTechPack(layoutSelection);
    }

    componentDidMount()
    {
        window.unity.SendMessage('bloodbridge', "enablemovement");
    }

    render()
    {
        var {selection} = this.state;

        return(
            <ContentView>
                <Header>
                    <HeaderDesc><h>Looking good!</h></HeaderDesc>
                    <PDesc>Now let's go inside to start designing your space! Use your arrow keys to navigate.</PDesc>

                    <Wrap>
                        <UploadLogoWrap>
                            <container>
                                <Thumbnail thumbnail={'/images/store/movement.png'}></Thumbnail>
                            </container>

                        </UploadLogoWrap>

                    </Wrap>
                </Header>
            </ContentView>
        )
    }
}

export default ExploreView

const Wrap = styled.div`
  position: absolute;
  top: 65%;
  left: 0;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height:100%;
`

const Thumbnail = styled.div`
  width: 22vh;
  height: 14vh;
  justify-content: center;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.thumbnail});
`

const UploadLogoWrap = styled.div`
  display:flex;
  top: 10vh;
  height: 40vh;
  width: 35vw;
  background-color:transparent;
  
  container{
    transform: translate(2vh, 2vh);
    width: calc(35vw - 4vh);
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2vh;
  }
  
  span{
    font-weight: 800;
  }
  
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