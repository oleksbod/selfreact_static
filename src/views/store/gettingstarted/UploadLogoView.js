import styled from 'styled-components'
import React, {Component} from 'react'
import { DropzoneArea } from 'material-ui-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class UploadLogoView extends Component
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

    componentDidMount()
    {
        this.props.root.setZIndex(1);
    }


    selectLayout(layoutSelection)
    {
        console.log("Selected Layout:" + layoutSelection)
        this.setState({selection:layoutSelection});
        this.props.parent.setTechPack(layoutSelection);
    }

    render()
    {
        var {selection} = this.state;

        return(
            <ContentView>
                <Header>
                    <HeaderDesc><h>Lets start by uploading your brands logo!</h></HeaderDesc>
                    <PDesc>(Hint, a 2:1 aspect ratio works perfectly!)</PDesc>

                    <Wrap>
                        <UploadLogoWrap>
                            <container>
                                <DropzoneArea
                                    style={{"margin" : "auto"}}
                                    acceptedFiles={['image/*']}
                                    dropzoneText={""}
                                    Icon={FontAwesomeIcon}
                                    onChange={(files) => this.props.root.uploadLogo(files,()=>{
                                        window.unity.SendMessage('bloodbridge', "updatelogo");
                                        this.props.parent.toggleMenu(-10)},()=>{})}
                                    filesLimit={1}
                                    maxFileSize={20000000}/>

                              <Thumbnail thumbnail={'/images/store/uploadicon_.png'}>

                              </Thumbnail>
                                <p>
                                    <span>Chose a file</span> or drag it here.
                                </p>
                            </container>

                        </UploadLogoWrap>
                    </Wrap>
                </Header>
            </ContentView>
        )
    }
}

export default UploadLogoView

const Wrap = styled.div`
  position: absolute;
  top: 50%;
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
  width: 8vh;
  height: 8vh;
  justify-content: center;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.thumbnail});
  z-index: 0;
  pointer-events: none;
`
const UploadLogoWrap = styled.div`
  display:flex;
  top: 10vh;
  height: 40vh;
  width: 35vw;
  
  
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
  
  p
  {
    position: absolute;
    padding-top:100px;
    z-index: 0;
    pointer-events: none;
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
   z-index:1;
`
const PDesc = styled.div`
  padding-top: 1vh;
  color: white;
  font-family: Calibre;
  font-size: 2vh;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
   z-index:1;
`