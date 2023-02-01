import styled from 'styled-components'
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { Scrollbar } from "react-scrollbars-custom";
import AssetStoreItem from "../create/assetstore/AssetStoreItem";
import Button from "@mui/material/Button";
import UploadView from "../generic/UploadView";
import ProductInfoView from "../generic/ProductInfoView";
import {DropzoneArea} from "material-ui-dropzone";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UploadProducts, UploadInfotags, UploadCdn, UploadCdnBatch} from "../../../WebAPI";

class ProductsSetup extends Component
{
    constructor()
    {
        super();
        this.state = {
            name: "CreateStore",
            selection:-1,
            step:0
        };
        this.selectLayout = this.selectLayout.bind(this);
    }

    selectLayout(layoutSelection)
    {
        console.log("Selected Layout:" + layoutSelection)
        this.setState({selection:layoutSelection});
    }

    updateFiles(files)
    {
        let files2 = document.getElementById("wallsfiles").files;

        for(let i = 0; i < files2.length; i++) {
            if (files2[0].size > 20971520) {
                alert("File limit is 20mb!");
                return false;
            }
        }

        UploadCdnBatch(files2,(data)=>{



           this.props.root.state.userData.wallImages = data;
           this.props.root.updateUserData(()=>{
               this.props.root.fetchUser();
               this.props.root.fetchBrand();
           } , ()=>{});

        },(data)=>{
            console.log("Upload batch cdn:" + data);
        })

        window.unity.SendMessage('bloodbridge', "hideall");
        window.unity.SendMessage('bloodbridge', "showwallspanel");


        this.props.parent.toggleMenu(-3)
        console.log("Files"+files);

        return true;
    }

    render()
    {
        let step = this.props.parent.state.step;

        return(
            <ContentView>
                {step ==-8 && <Header>
                    <HeaderDesc><h>Let's add some assets!</h></HeaderDesc>
                    <PDesc>Please note, your products will need to be on a transparent background</PDesc>
                    <PDesc>If they're not on a transparent background, we can edit them for you</PDesc>
                    <LayoutRow>
                        <Button variant="contained" onClick={()=>this.props.parent.toggleMenu(-7)}>They are on a transparent background</Button>
                        <Button variant="contained" >Get BrandLab360 to edit my products</Button>
                    </LayoutRow>
                </Header>}

                {step ==-7 && <Header style={{'padding-top':'10vh'}}>
                    <HeaderDesc><h>Great, let's upload your products!</h></HeaderDesc>
                    <PDesc>You have a maximum of 50 products to upload</PDesc>
                    <PDesc style={{'padding-bottom':'10vh'}} >To add more, upgrade in the layout section!</PDesc>

                    <Wrap>
                        <UploadLogoWrap>
                            <container>
                                <DropzoneArea
                                    acceptedFiles={['image/*']}
                                    dropzoneText={""}
                                    Icon={FontAwesomeIcon}
                                    onChange={(files) => {
                                      if(files.length>0)
                                      {
                                        UploadProducts(files,this.props.root.state.brand.id,()=>{
                                            this.props.parent.toggleMenu(-6);
                                            this.props.root.fetchBrand();
                                            window.unity.SendMessage('bloodbridge', "showprodcutspanel");

                                        },()=>{
                                            this.props.parent.toggleMenu(-6);
                                            this.props.root.fetchBrand();
                                        })
                                      }

                                    }}
                                    filesLimit={10}
                                    maxFileSize={20000000}
                                />
                                <Thumbnail thumbnail={'/images/store/uploadicon_.png'}>

                                </Thumbnail>
                                <p>
                                    <span>Chose a file</span> or drag it here.
                                </p>
                            </container>

                        </UploadLogoWrap>
                    </Wrap>
                </Header>}

                {step ==-6 && <Header style={{'padding-top':'10vh'}}>
                    <HeaderDesc><h>Now, let's merchandise your products!</h></HeaderDesc>
                    <PDesc>You have full control on how you want your products to be displayed</PDesc>
                    <PDesc >Simply drag them to the fixture in order you wish for them to be displayed.</PDesc>
                </Header>}

                {step ==-5 && <Header style={{'padding-top':'10vh'}}>
                    <HeaderDesc><h>Perfect now let's add in product information!</h></HeaderDesc>
                    <PDesc>You have the ability to add in product information, URL's to product pages,</PDesc>

                    <PDesc style={{'padding-bottom':'10vh'}}>as well as any forms of media such as product shorts, 360 imagery and videos</PDesc>

                    <ScrollViewContainer>
                        <Scrollbar>
                            <ScrollView>
                                {this.props.root.state.brand&&this.props.root.state.brand.products.map(product => (<ProductInfoView parent={this.props.parent} root={this.props.root} productId={product}></ProductInfoView>))}
                            </ScrollView>
                        </Scrollbar>
                    </ScrollViewContainer>

                </Header>}

                {step ==-4 && <Header style={{'padding-top':'10vh'}}>
                    <HeaderDesc><h>Let's add some decor to your walls.</h></HeaderDesc>
                    <PDesc>You can add in campaign imagery, product shots, or patterns to your walls!</PDesc>
                    <PDesc >Want to add in videos or have the ability to live stream? Upgrade in our tech pack!</PDesc>

                    <ContainerUpload onClick={()=>{document.getElementById("wallsfiles").click()}}>
                        <label htmlFor="fname3">Walls:    </label>
                        <FileUpload id="fname2"  >
                            <img src={'/images/icons/upload.png'} id={'icon'}></img>
                            <label htmlFor="icon" style={{ 'font-size': '1.05em'}}>  Upload Files: <span>(png,jpg)</span></label>
                        </FileUpload>
                    </ContainerUpload>
                    <input hidden type="file" id={"wallsfiles"} name="files" multiple onChange={(e)=>{this.updateFiles(e.target.value)}}></input>

                </Header>}


                {step ==-3&& <Header style={{'padding-top':'10vh'}}>
                    <HeaderDesc><h>Prefect, now drag them wherever you want!</h></HeaderDesc>
                    <PDesc>Drag your frames to wherever you want them to be displayed.</PDesc>
                    <PDesc >You can always swap them out later!</PDesc>
                </Header>}

                {step ==-2 && <Header style={{'padding-top':'10vh'}}>
                    <HeaderDesc><h>Looking good!</h></HeaderDesc>
                    <PDesc>Now it's time for you to explore more posibilities on your own!</PDesc>
                    <PDesc >If you ever need help, please click contact us button in bottom left corner.</PDesc>
                </Header>}

            </ContentView>
        )
    }
}

export default ProductsSetup

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


const ContainerUpload = styled.div`
 position: absolute;
  top:50%;
  width:250px;
  height:40px;
  background-color: #e8e8e9;
  flex-direction: row;
  display:flex;
  align-items: center;
  justify-content: center;
  padding-left:10px;
  padding-right:10px;
  gap:10px;

  label {
    font-size: .85em;
    white-space:pre-wrap;
  }
`

const FileUpload = styled.button`
  display:flex;
  padding-left:5px;
  width:100%;
  height:30px;
  background-color:white;
  border-width:0px;
  align-items: center;
  white-space:pre-wrap;
  
  
  
  
  img
  {
    padding-top: 0px;
    height: 25px;
    width: 25px;
  }
  
  span
  {
    font-size: .85em;
  }
`

const ScrollView = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  padding-left: 4vw;
  padding-right: 4vw;
  gap : 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const ScrollViewContainer = styled.div`
  background-color: transparent;
  position:absolute;
  height: 75vh;
  width: 58vw;
  overflow: auto;
  padding-top:16vh;
  gap : 1vw;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  z-index:2;

  h{
    padding-top: 1vh;
    padding-bottom: 5vh;
    padding-left: 1vw;
    display: flex;
    font-size: 1.8vh;
    font-weight: 600;
    min-width:15%;
    white-space: pre-wrap;
  }
  
  u
  {
    cursor: pointer;
  }
  
`

const LayoutRow = styled.div`
  display:flex;
  gap: 4vw;
  padding-top: 3vh;
  
  button
  {
    background-color: #232323;
    border: none;
    color: white;
    border-radius: 24px;
    font-size: 2vh;
    font-family: "Calibre - Semibold";
    font-style:normal;
  }
`

const ContentView = styled.div`
  background-color:transparent;
  width:100vw;
  height: 70vh;
  display:flex;
  justify-content:start;
  flex-direction:column;
`
const Header = styled.div`

  width:100vw;
  height: auto;
  display:flex;
  justify-content:start;
  align-items:center;
  flex-direction:column;
  padding-left: 2vw;
  padding-top: 2vh;
  z-index:1;
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
  white-space: pre-line;
  z-index:1;
`