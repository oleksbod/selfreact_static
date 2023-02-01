import styled from 'styled-components'
import React, {Component} from 'react'
import {UpdateProduct,UploadInfotags,GetProduct,DeleteProduct} from "../../../WebAPI";
import './dropshadow.css';

class ProductInfoView extends Component
{
    constructor()
    {
        super();
        this.state = {
            productLoaded:false,
            uploadColor:"white",
            product:
                {
                    productInfo:"",
                    webpageUrl:"",
                    cdnId_thumbnail: "999999"
                }
        };
    }

    componentDidMount()
    {

        console.log("Fetching products");
        this.fetchProduct();
    }

    fetchProduct()
    {
        let productId = this.props.productId;
        GetProduct(productId,
            (data)=>
            {
                console.log(data);
                this.setState({product:data});
                this.setState({productLoaded:true});
            }
            ,(data)=>{});
    }

    handleChange(val,target)
    {

        if(this.state.productLoaded)
        {
            let prod = this.state.product;
            switch (target) {
                case "productInfo":
                    prod.productInfo = val;
                    break;
                case "webpageUrl":
                    prod.webpageUrl = val;
                    break;
            }
            this.props.parent.setState({productInfoModified:true});

            this.setState({product: prod});
        }
    }

    updateProduct()
    {
        let prod = this.state.product;
        console.log("updating product");
        UpdateProduct(this.props.productId,prod.productInfo,prod.webpageUrl,()=>{
            console.log("prodcut sucessfully updated");
        },()=>{});
    }

    updateFiles(files)
    {
        console.log("Files"+files);



        var files = document.getElementById("files"+this.props.productId).files;

        for(let i = 0; i < files.length; i++) {
            if (files[i].size > 20971520) {
                alert("File is too big!");
                return;
            }
        }

        UploadInfotags(files,this.props.productId,this.props.root.state.brand.id,()=>{
            console.log("Sucesfully updated infotags");
            this.setState({uploadColor:"green"})
        },()=>{
            this.setState({uploadColor:"red"})
        });
    }

    deleteProduct()
    {
        DeleteProduct(this.props.productId,()=>{
            this.props.root.fetchBrandEv(()=>{
                this.fetchProduct();
            },()=>{
                this.fetchProduct();
            });
            console.log("product deleted");

        },()=>{
            this.props.root.fetchBrandEv(()=>{
                this.fetchProduct();
            },()=>{
                this.fetchProduct();
            });

        });

    }

     onFocus()
    {

    }

     onFocusOut()
    {
        this.updateProduct();
    }

    onDragStart(cdnId)
    {
        this.props.root.focusCanvas();
    this.props.parent.toggleMenu(-1);
    this.props.root.InvokeUnityArg("dragasset",cdnId);
    }

    render()
    {
        var {selection,product,uploadColor} = this.state;

        return(
            <div className="rainbowGradientRound">
                <div className="innerSquare">
                    <Wrap>
                        <Thumbnail draggable={true} onDragStart={()=> {this.onDragStart(product.id)}}  thumbnail={  'https://selfservetest-api.azurewebsites.net/cdn/serve/' + product.cdnId_thumbnail}>
                            <MaximizeIcon src={'/images/icons/maximize.png'} ></MaximizeIcon>
                        </Thumbnail>
                        <ContainerInfo>
                            <div style={{gap:'5px'}}>
                                <label style={{ 'font-size': '1.9vh'}}  htmlFor="fname">Product Info:     </label>
                                <input type="text" id="fname" name="fname" value={product.productInfo} onFocus={()=>{this.onFocus()}} onBlur={()=>{this.onFocusOut()}}  onChange={(e)=>this.handleChange(e.target.value,"productInfo")}/>
                            </div>

                            <div>
                                <label style={{ 'font-size': '1.9vh'}} htmlFor="fname2">Webpage URL:   </label>
                                <input type="text" id="fname2" name="fname" value={product.webpageUrl} onFocus={()=>{this.onFocus()}} onBlur={()=>{this.onFocusOut()}}  onChange={(e)=>this.handleChange(e.target.value,"webpageUrl")}/>
                            </div>
                            <div>
                                <label style={{ 'white-space': 'pre-wrap','font-size': '1.9vh'}} htmlFor="fname3">Media Upload:            </label>

                                <FileUpload uploadColor={uploadColor} id="fname2" onClick={()=>{document.getElementById("files"+this.props.productId).click()}}>

                                    <img src={'/images/icons/upload.png'} id={'icon'}></img>
                                    <label htmlFor="icon" style={{ 'font-size': '1.2vh'}}>
                                        Upload Files: <span>(pdf,jpg,mp4,move,mp3) </span>
                                    </label>
                                </FileUpload>

                                <img onClick={()=>this.deleteProduct()} style={{transform:'translate(-5px,8px)', marginLeft:'15px',marginTop:'10x',width:'12px',height:'16px'}} src={'/images/icons/trash.png'} id={'icon'}></img>


                            </div>
                        </ContainerInfo>
                        <input hidden type="file" id={"files"+this.props.productId} name="files" multiple onChange={(e)=>{this.updateFiles(e.target.value)}}></input>

                    </Wrap>
                </div>
            </div>

        )
    }
}

export default ProductInfoView



const MaximizeIcon = styled.img
    `
      position: absolute;
      right: 5px;
      top:5px;
      width:15px;
      height:15px;
    `

const FileUpload = styled.button`
  display:flex;
  width:80%;
  height:30px;
  background-color:${props => props.uploadColor};
  border-width:0px;
  align-items: center;
  
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

const ContainerInfo = styled.div`
display:flex;
  flex-direction: column;
  width:calc(100% - 110px);
  padding-right: 5px;
  padding-left:20px;
  gap:3px;
  padding-top:3px;
  
  input
  {
    flex-direction: column;
    display:flex;
    flex-grow: 1;
    width:65%;
    padding-left:5px;
    padding-right:0px;
    height: 30px;
    border-width:0px;
  }
  
  
  
  label
  {
    text-align: start;
    line-height: 200%;
    font-size: .85em;
    white-space: pre-wrap;
  }
  
  div
  {
    display:flex;
    flex-direction: row;
    flex:1;
  }
`

const Wrap = styled.div`
  position: relative;
  background-color: #F5F5F5;
  display: flex;
  align-items: start;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

const Thumbnail = styled.div`
  width: 110px;
  height: 100%;
  display:flex;
  justify-content: start;
  align-items: start;
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
  background-color:#F5F5F5;
  
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
