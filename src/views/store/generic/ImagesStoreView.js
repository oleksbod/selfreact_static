import styled from 'styled-components'
import React, {Component} from 'react'
import { UploadCdnBatch} from "../../../WebAPI"
import './dropshadow.css'

class ImagesStoreView extends Component
{
    constructor()
    {
        super();
        this.state = {
            selection:0
        };
    }

    uploadWallImg(fileIdx)
    {
        let files2 = document.getElementById("wallsfiles" + fileIdx).files;
        if(files2.length > 0) {
            if(files2[0].size > 20971500){
                alert("File is too big!");

            }
            else
            {
            UploadCdnBatch(files2, (data) =>
            {
                let uData = this.props.root.state.userData;
                if(fileIdx >= uData.wallImages.length)
                {
                    for(let i = uData.wallImages.length; i <=fileIdx ; i++)
                        uData.wallImages[i] =  -1;
                }

                uData.wallImages[fileIdx] = data[0];
                this.props.root.setState({userData: uData})
                this.props.root.updateUserData(() => {
                }, () => {
                });

            }, (data) => {
                console.log("Upload batch cdn:" + data);
            })
        }
        }
    }

    deleteWallImg(wallIdx)
    {
        let userData = this.props.root.state.userData;
        userData.wallImages[wallIdx] = -1;
        this.props.root.setState({userData:userData});
        this.props.root.updateUserData(()=>{},()=>{});
    }

    onDragStart(cdnId)
    {
        this.props.root.focusCanvas();
        this.props.parent.toggleMenu(-1);
        this.props.root.InvokeUnityArg("dragasset",cdnId);
    }

    getWallImg(imgIdx)
    {
            if(this.props.root.state.userData.wallImages== null)
                this.props.root.state.userData.wallImages = [];

            if(imgIdx < this.props.root.state.userData.wallImages.length && this.props.root.state.userData.wallImages[imgIdx] != -1 )
                {
                    return (
                        <div draggable={true} onDragStart={()=> {this.onDragStart(this.props.root.state.userData.wallImages[imgIdx])}}>
                        <img src={ "https://selfservetest-api.azurewebsites.net" + '/cdn/serve/' + this.props.root.state.userData.wallImages[imgIdx]}></img>
                            <img onClick={()=>{this.deleteWallImg(imgIdx)}} style={{transform:"translate(-15px,1px)",position:"absolute",width :"10px",height:"15px"}} src={'/images/icons/trash.png'}></img>
                        </div>
                    );
                }
            else{
                    return (
                        <div>
                        <img onClick={()=>{document.getElementById("wallsfiles" + imgIdx).click()}} src={'/images/icons/border.png'}></img>
                        <input hidden type="file" id={"wallsfiles" + imgIdx} name="files" onChange={(e)=>
                        {
                                 this.uploadWallImg(imgIdx);
                        }
                        }></input>
                        </div>
            );
                }
    }

    render()
    {
        var {selection} = this.state;

        return(
            <ContentView>
                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <LayoutItem isselected={selection==0}>
                            <label htmlFor="logocontiner2"><h style={{fontSize:"2.3vh"}}>Wall 1:</h></label>
                            <LayoutDescription id={'logocontiner2'}>
                                {this.getWallImg(0)}
                                {this.getWallImg(1)}
                                {this.getWallImg(2)}
                                {this.getWallImg(3)}
                            </LayoutDescription>
                        </LayoutItem>
                    </div>
                </div>

                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <LayoutItem isselected={selection==1}>
                            <label htmlFor="logocontiner3"><h style={{fontSize:"2.3vh"}}>Wall 2:</h></label>
                            <LayoutDescription id={'logocontiner3'}>
                                {this.getWallImg(4)}
                                {this.getWallImg(5)}
                                {this.getWallImg(6)}
                                {this.getWallImg(7)}
                            </LayoutDescription>
                        </LayoutItem>

                    </div>
                </div>

                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <LayoutItem isselected={selection==2}>
                            <label htmlFor="logocontiner5"><h style={{fontSize:"2.3vh"}}>Wall 3:</h></label>
                            <LayoutDescription id={'logocontiner5'}>
                                {this.getWallImg(8)}
                                {this.getWallImg(9)}
                                {this.getWallImg(10)}
                                {this.getWallImg(11)}
                            </LayoutDescription>
                        </LayoutItem>
                    </div>
                </div>

                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <LayoutItem isselected={selection==3}>
                            <label htmlFor="logocontiner4"><h style={{fontSize:"2.3vh"}}>Wall 4:</h></label>
                            <LayoutDescription id={'logocontiner4'}>
                                {this.getWallImg(12)}
                                {this.getWallImg(13)}
                                {this.getWallImg(14)}
                                {this.getWallImg(15)}
                            </LayoutDescription>
                        </LayoutItem>
                    </div>
                </div>
            </ContentView>
        )
    }
}

export default ImagesStoreView

const LayoutDescription =styled.div`
    text-align: start;
  padding-right:0vh;
  padding-left:5vh;
  display: flex;
  gap:2vh;
  height:90%;
  img
  {
    height:14vh;
    width:11vh;
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
  padding-right: 2vh;
  color:  black;
  
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
  background-color: white;
  position: absolute;
  top: 6vh;
  left: 34vw;
  width: 70vh;
  height: 65vh;
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 0vh;
  padding-top:1vh;
  padding-left:0.2vw;
  padding-right:0.2vw;
  padding-bottom:2vh;
`
