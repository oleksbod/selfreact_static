import styled from 'styled-components'
import React, {Component} from 'react'
import { Scrollbar } from "react-scrollbars-custom";
import ProductInfoView from "./ProductInfoView";
import {UploadProducts} from "../../../WebAPI";

class ProductStoreView extends Component {
    constructor() {
        super();
        this.state = {
            name: "CreateStore",
            selection: 0,
            uploadDialog:false
        };
    }

    fileDrop = (e) =>
    {
        console.log("File drop event");
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files.length >0)
        {
            for(let i = 0; i < files.length; i++) {
                if (files[0].size > 2097152) {
                    alert("File is too big!");
                   return;
                }
            }

            console.log(files);
            UploadProducts(files,this.props.root.state.brand.id,()=>{
                this.props.root.fetchBrand();
            },()=>{})

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

    componentDidMount()
    {
        this.props.root.fetchBrand();
    }

    render()
    {
        return(
            <ContentView>
                    <Scrollbar>
                        <ScrollView>
                            {this.props.root.state.brand&&this.props.root.state.brand.products.map(product => (<ProductInfoView parent={this.props.parent} root={this.props.root} productId={product}></ProductInfoView>))}
                        </ScrollView>
                    </Scrollbar>

                <Wrap>
                    <UploadLogoWrap onDragOver={this.dragOver}
                                    onDragEnter={this.dragEnter}
                                    onDragLeave={this.dragLeave}
                                    onDrop={this.fileDrop} onClick={()=>{document.getElementById("uploadproducts").click()}}>
                        <DottedOutline onDragOver={this.dragOver}
                                       onDragEnter={this.dragEnter}
                                       onDragLeave={this.dragLeave}
                                       onDrop={this.fileDrop}></DottedOutline>
                        <container onDragOver={this.dragOver}
                                   onDragEnter={this.dragEnter}
                                   onDragLeave={this.dragLeave}
                                   onDrop={this.fileDrop}>
                            <ContainerDotted onDragOver={this.dragOver}
                                             onDragEnter={this.dragEnter}
                                             onDragLeave={this.dragLeave}
                                             onDrop={this.fileDrop}>
                                <img src={'/images/icons/dotted.png'}/>
                            </ContainerDotted>
                            <Thumbnail  thumbnail={'/images/store/uploadicon_.png'}></Thumbnail>
                            <p> <span>Want to upload more products?</span> </p>
                            <p>
                                <span>Chose a file</span> or drag it here.
                            </p>
                        </container>
                        <input hidden type="file" id={"uploadproducts"} name="files" multiple onChange={(e)=>
                        {
                            let files = document.getElementById("uploadproducts").files;
                            if(files.length>0)
                            {
                                let filesValid = true;

                                for(let i = 0; i < files.length; i++) {
                                    if (files[i].size > 20971520) {
                                        alert("File is too big!");
                                        filesValid = false;
                                        return;
                                    }
                                }

                               if(filesValid) {
                                   UploadProducts(files, this.props.root.state.brand.id, () => {
                                       this.props.root.fetchBrand();
                                   }, () => {

                                   })
                               }
                               else
                               {
                                   console.log("Files over 20mb size");
                               }
                            }
                        }}></input>
                    </UploadLogoWrap>
                </Wrap>

            </ContentView>


        )
    }
/*<DropzoneArea
                                acceptedFiles={['image/*']}
                                dropzoneText={""}
                                Icon={FontAwesomeIcon}
                                showPreviews={false}
                                showPreviewsInDropzone={false}
                                onChange={(files) => {
                                    if(files.length>0)
                                    {
                                        UploadProducts(files,this.props.root.state.brand.id,()=>{
                                            this.props.root.fetchBrand();
                                        },()=>{})
                                    }

                                }}
                                filesLimit={10}
                            />*/



}
export default ProductStoreView


const ContainerDotted = styled.div`
  width: 76vh;
  height: 26vh;
  position: absolute;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70%;
  z-index:40;
  
  img
  {
  width:90%;
  height:70%;
  }
  
`

const ScrollView = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom:1.5vh;
`

const ContentView = styled.div`
  background-color:white;
  position: absolute;
  top: 6vh;
  left: 40vw;
  width: 70vh;
  height: 84vh;
  display: flex;
  justify-content: start;
  flex-direction: column;
  padding-top: 2vh;
  padding-left: 0.2vw;
  padding-right: 0.2vw;
  padding-bottom: 2vh;
  gap:5vh;
  
  h
  {
    font-weight: bold;
    font-size:2.2vh;
  }
`



const Thumbnail = styled.div`
transform: translate(0, -50px);
  width: 6vh;
  height: 6vh;
  justify-content: center;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.thumbnail});
`

const DottedOutline = styled.div` 
position:absolute;
height: 100%;
width: 90%;
transform: translate(2.5vh, 0.25vh);
`

const UploadLogoWrap = styled.div`
  display:flex;
  top: 10vh;
  height: 100%;
  width: 100%;
  background-color:white;
  
  container{
    transform: translate(3.5vh, -3vh);
    
    width: 90%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top:95px;
  }
  
   p
  {
    font-size:0.95em;
    position: relative;
    z-index: 0;
    pointer-events: none;
  }
  
  span{
    font-weight: 800;
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
  height:100px;
 
`

