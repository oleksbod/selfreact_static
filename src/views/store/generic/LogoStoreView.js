import styled from 'styled-components'
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { Scrollbar } from "react-scrollbars-custom";
import AssetStoreItem from "../create/assetstore/AssetStoreItem";
import TechStoreView from "./TechStoreView";
class LogoStoreView extends Component {
    constructor() {
        super();
        this.state = {
            query:10
        };
    }

    componentDidMount()
    {
        this.setState({query:Math.random()});
    }

    fileDrop = (e) =>
    {
        console.log("File drop event");
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files.length)
        {
            for(let i = 0; i < files.length; i++) {
            if (files[0].size > 20971520) {
                alert("File is too big!");
                return;
            }
        }

            console.log(files);
            this.props.root.uploadLogo(files,()=>
            {
                window.unity.SendMessage('bloodbridge', "updatelogo");
                this.setState({query:this.state.query+1});
            },()=>{
                console.log("failed upload logo");
            });

        }
    }

     dragOver = (e) => {
       e.preventDefault();
    }

     dragEnter = (e) => {
        e.preventDefault();
    }

     dragLeave = (e) => {
        e.preventDefault();
    }

    render()
    {
        return(
            <ContentView>
                <LogoWrap>
                    <label htmlFor="logocontiner"><h>Your current logo:</h></label>
                    <LogoContainer id={'logocontiner'}>
                        <img  src={ "https://selfservetest-api.azurewebsites.net/cdn/serve/" + this.props.root.state.brand.logo_cdnId + "?" +this.state.query}/>
                    </LogoContainer>
                </LogoWrap>
                <LogoWrap style={{flex:1}} ondrop={this.fileDrop} onDragOver={this.dragOver}
                          onDragEnter={this.dragEnter}
                          onDragLeave={this.dragLeave}>
                    <label style={{transform:'translate(0px,3vh)','z-index':'41'}} htmlFor="logocontiner2"><h>Upload a different logo:</h></label>
                    <input hidden type="file" id={"logostore"} name="files" onChange={(e)=>{
                        this.props.root.uploadLogo(document.getElementById("logostore").files,()=>
                        {
                            window.unity.SendMessage('bloodbridge', "updatelogo");
                        this.setState({query:this.state.query+1});
                    },()=>{})}}></input>
                    <UploadContainer id={'logocontiner2'} ondrop={this.fileDrop} onDragOver={this.dragOver}
                                     onDragEnter={this.dragEnter}
                                     onDragLeave={this.dragLeave} onClick={()=>{
                        document.getElementById("logostore").click()

                    }}>
                        <Wrap>
                            <UploadLogoWrap onDrop={this.fileDrop} onDragOver={this.dragOver}
                                            onDragEnter={this.dragEnter}
                                            onDragLeave={this.dragLeave}>
                                <container ondrop={this.fileDrop} onDragOver={this.dragOver}
                                           onDragEnter={this.dragEnter}
                                           onDragLeave={this.dragLeave}>
                                    <ContainerDotted  ondrop={this.fileDrop} onDragOver={this.dragOver}
                                                      onDragEnter={this.dragEnter}
                                                      onDragLeave={this.dragLeave} thumbnail={'/images/icons/dotted.png'}>
                                    </ContainerDotted >
                                       <Thumbnail ondrop={this.fileDrop} onDragOver={this.dragOver}
                                                  onDragEnter={this.dragEnter}
                                                  onDragLeave={this.dragLeave} thumbnail={'/images/store/uploadicon_.png'}></Thumbnail>
                                       <p style={{fontSize:'2vh'}}>
                                           <span>Chose a file</span> or drag it here.
                                       </p>

                                </container>

                            </UploadLogoWrap>
                        </Wrap>

                    </UploadContainer>

                </LogoWrap>

            </ContentView>
        )
    }
}
export default LogoStoreView

const ContainerDotted = styled.div`
  width: 56vh;
  height: 66vh;
  position: absolute;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  z-index:40;
  background-image: url(${props => props.thumbnail});
`

const UploadContainer=styled.div`
    width:100%;
    height:100%;
  display: inline-block;
  left:0;
`

const LogoContainer=styled.div`

  img {
    max-width: 30vh;
    max-height: 15vh;
    width: auto;
    height: auto;
  }

  height: 15vh;
  width: 30vh;
  background-color: rgba(255, 255, 255, 0.28);
`

const LogoWrap=styled.div`
  text-align: left;
  justify-content:start;
  align-items:start;
  display:flex;
  width:100%;
  flex-direction: column;
  gap:1vh;
  padding-left: 2vh;
`

const ContentView = styled.div`
  background-color:white;
  position: absolute;
  top: 6vh;
  left: 30vw;
  width: 60vh;
  height: 64vh;
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 2vh;
  padding-top: 2vh;
  padding-left: 0.2vw;
  padding-right: 0.2vw;
  padding-bottom: 0vh;
  
  h
  {
    font-weight: bold;
    font-size:2.2vh;
  }
`

const Wrap = styled.div`
  position: relative;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height:100%;
`

const Thumbnail = styled.div`
  width: 9vh;
  height: 9vh;
  justify-content: center;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.thumbnail});
`

const UploadLogoWrap = styled.div`
  display:flex;
  top: 12vh;
  height: 100%;
  width: 100%;
  background-color:white;
  
  container{
    
    transform: translate(2vh, 3vh);
    width: 90%;
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
