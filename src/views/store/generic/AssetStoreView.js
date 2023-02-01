import styled from 'styled-components'
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { Scrollbar } from "react-scrollbars-custom";
import AssetStoreItem from "../create/assetstore/AssetStoreItem";
import './dropshadow.css'
import axios from "axios";

class StartingAssetsView extends Component
{
    constructor()
    {
        super();
        this.state = {
            selection:null,
            assets:null,
            purchased:false,
            searcharg:""
        };
    }

    mapStandardStore(storeAsset,standardassets)
    {
        if(standardassets == false && this.state.searcharg.length > 0)
        {
            if(storeAsset.description.includes( this.state.searcharg) == false)
                return "";
        }

        if((standardassets == true&&storeAsset.price > 0)|| (standardassets == false&&storeAsset.price == 0))
        {
            return "";
        }

        let thumbImg =   "https://selfservetest-api.azurewebsites.net/cdn/serve/" + storeAsset.cdnId_thumbnail;
        return (
            <div className="rainbowGradient">
                <div className="innerSquare">
                    <Layer1 standard={standardassets} onClick={() =>
                    {

                        this.setState({purchased:(storeAsset.price == 0)});
                        this.setState({selection:storeAsset})
                        console.log("Selected Asset:" + storeAsset);
                    }}>
                        <AssetStoreItem  thumbnail={thumbImg} title={''} description={'Ideal for up to 250 products'} price={standardassets == true?-1:storeAsset.price} isselected={false}></AssetStoreItem>
                    </Layer1>
                </div>
                </div>

        )
    }

    getLayout(text) {
        return (
            <span style={{'display':"flex",'flex-direction':'row'}}>
                <div style={{'display':"flex","flex":"1"}}>
                    <p style={{fontSize:'2vh', fontWeight:'600'}}>{text.split('@')[0]}</p>
                </div>
                <div  style={{'display':"flex","flex":"1"}}>
                      <p style={{fontSize:'2vh'}}>{text.split('@')[1]}</p>
                </div>
            </span>
        )
    }


    getAssetView()
    {
        let asset = this.state.selection;
        return(
        <WrapAsset>
            <img onClick={() => {this.setState({selection:null})}} style={{marginLeft:'25px',marginTop:'10px', width:"1.5vh",height:"2.5vh"}} src={'/images/icons/back.png'}></img>
            <div style={{width:'100%',height:'100%', display:'flex',flexDirection:'row',gap:'20px'}}>
                <AssetContainerView>
                    <img style={{display:'block',height:'65vh',width:'95%','margin-left':'auto','margin-right':'auto','margin-top':'auto'}} src={ "https://selfservetest-api.azurewebsites.net/cdn/serve/" + asset.cdnId_detail}/>
                </AssetContainerView>
                <AssetContainerView>
                    <div style={{width:'100%',height:'100%', display:'flex',flex:'1', flexDirection:'column'}}>
                        <AssetContainerView style={{textAlign:'left',gap:'1vh',paddingTop:'7vh'}}>
                            <h style={{'font-size':'5vh','font-weight':'600'}}>{asset.title}</h>
                            <p style={{'font-weight':'550'}}>{asset.shortDescription}</p>
                            {this.state.purchased == false&&<p>£{asset.price}.00</p>}
                            <span style={{display:'flex',flexDirection:'row'}}>
                            <div onClick={()=> {
                                if (this.state.purchased == false) {
                                    this.props.root.addToCart(asset.id);
                                    this.props.parent.setState({showCart: true});
                                }
                                else
                                {
                                    this.props.parent.setState({selection: null});
                                    this.props.parent.toggleMenu(-1);
                                    window.unity.SendMessage('bloodbridge', "instantiate",  "https://selfservetest-api.azurewebsites.net/cdn/serve/" +asset.cdnId_gltf);
                                }
                            }
                            } style={{cursor:'pointer',marginTop:"3vh", paddingTop:'1.5vh', textAlign:"center",fontSize:'1.6vh', width:'24vh',height:'5vh', backgroundColor:'black','color':'white'}}>
                               {this.state.purchased == false&&"Add to basket"}
                               {this.state.purchased&&"Add to scene"}
                            </div>
                                 <img style={{display:'flex',marginLeft:"5vh",marginTop:"4.35vh",height:'2.5vh',width:'2.5vh'}} src={"/images/icons/favorite.png"}/>

                            </span>
                        </AssetContainerView>
                        <AssetContainerView>
                            <div style={{width:'100%',height:'100%', display:'flex',flexDirection:'row',paddingBottom:"30px"}}>
                                <AssetContainerView style={{textAlign:'left',gap:'1vh',paddingTop:'2vh'}}>
                                    <p style={{'font-size':'3vh','font-weight':'600',paddingBottom:'2vh'}}>Details</p>

                                    {asset.description.split(/\n/).map(detail => (this.getLayout(detail)))}
                                </AssetContainerView>
                                <AssetContainerView>
                                    <img style={{display:'block',height:'30vh',width:'65%','margin-left':'auto','margin-right':'auto','margin-top':'auto'}} src={ "https://selfservetest-api.azurewebsites.net/cdn/serve/" + asset.cdnId_detail1}/>
                                </AssetContainerView>
                            </div>

                        </AssetContainerView>
                    </div>
                </AssetContainerView>
            </div>
        </WrapAsset>)
    }

    componentDidMount()
    {
        const options = {
            method: 'GET',
            url: 'https://selfservetest-api.azurewebsites.net/data/assets/',
            headers: {
                sesid: localStorage.getItem("sesid")
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data);
            this.setState(({assets:response.data}));
        }).catch(function (error) {
            console.error(error);
        });

    }

    handleChange(e)
    {
        this.setState({searcharg:document.getElementById("fnamet7td").value});
    }

    mapSearchable()
    {
        return( this.state.assets&&this.state.assets.map(asset => (this.mapStandardStore(asset,false))))
    }

    render()
    {
        let {selection} = this.state;

        return(
            <ContentView>


                <Header>
                    {selection != null && this.getAssetView()}
                    <ScrollViewContainer>
                        <h>
                            {this.props.parent.state.backto != -1 && <BackIcon style={{'justify-content': 'start'}} onClick={()=>{this.props.parent.toggleMenu(this.props.parent.state.backto)}} thumbnail={'/images/icons/back.png'} ></BackIcon>}
                            BrandLab360 3D Asset Store</h>

<Wrap>
   Your Purchases
</Wrap>
                        <Wrap>
                            {this.state.assets&&this.state.assets.map(asset => (this.mapStandardStore(asset,true)))}

                        </Wrap>
                        <Wrap>
                            BrandLab 360's Asset Store - Evreything Available as a One-Time Purchase
                        </Wrap>
                        <Wrap>

                            <TextInput type="text" id="fnamet7td" name="fname" onChange={(e)=>{this.handleChange()}}>
                            </TextInput>
                            <SearchBarIcons>
                                <SearchBarIcon thumbnail={'/images/icons/search.png'} ></SearchBarIcon>
                                <SearchBarIcon thumbnail={'/images/icons/filter.png'} ></SearchBarIcon>
                                <SearchBarIcon thumbnail={'/images/icons/sortdirection.png'}></SearchBarIcon>
                            </SearchBarIcons>

                        </Wrap>
                         <Scrollbar>
                            <ScrollViewGrid>
                                <ScrollView>
                                    {
                                       this.mapSearchable()
                                    }
                                </ScrollView>
                            </ScrollViewGrid>
                        </Scrollbar>
                    </ScrollViewContainer>
                </Header>
            </ContentView>
        )
    }
}

export default StartingAssetsView

const SearchBarIcons = styled.div`
  width: 43%;
  height: 4vh;
  display: flex;
  transform: translate(-6vw);
`

const ScrollView = styled.div`
  background-color: white;
  padding-top: 1vh;
  height: 100%;
  width: 100%;
  gap : 1vw;
  display: flex;
  posi
`

const WrapAsset = styled.div`
  src: url('../../../fonts/Calibre/Calibre-Regular.woff') format('woff'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */ url('../../../fonts/Calibre/Calibre-Regular.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
  font-family: 'CalibreBase';
  background-color: white;
  height: 70vh;
  width: 87vw;
  position:absolute;
  z-index: 20;
  overflow: auto;
  margin-top: 0vh;
  gap : 0vw;
  display: flex;
  flex-direction: column;
  align-items:start;
  justify-content: start;
`

const AssetContainerView = styled.div`
height:100%;
width:100%;
display:flex;
flex-direction: column;
flex:1
`


const Wrap = styled.div`
padding-bottom: 1vh;
  width: 100%;
  padding-left: 1.5vw;
  padding-bottom: 2vh;
  align-items: start;
  justify-content: start;
  display: flex;
  font-weight:700;
  font-size:1.8vh;
  
  input
  {
  padding-left:15px;
  }
`
const TextInput = styled.input`

  width: 48%;
  height: 4vh;
  background-color: #efefef;
  paddingVertical: 10;
  paddingHorizontal: 15;
  border-color: #ccc;
  border-width: 0px;
  border-radius: 25px;
  fontSize: 16;
`

const BackIcon = styled.div`
  display: flex;
  justify-content: start;
  position: absolute;
  top: 10vh;
  left: 10.5vw;
  z-index: 10;
  width: 10px;
  height:15px;
  -webkit-justify-content: flex-start;
  align-items: flex-start;
  -webkit-align-items: flex-start;
  background-size: 70% 70%;;
  transform: translate(-30px, 0px);
  background-position: center;
  background-repeat: no-repeat;
  background-image:url(${props => props.thumbnail});
  cursor:pointer;
`


const SearchBarIcon = styled.div`
  display: flex;
  justify-content: end;
  position: relative;
  top: 0;
  left: 0;
  z-index: 10;
  width: 4vh;
  height: 4vh;
  -webkit-justify-content: flex-end;
  align-items: flex-end;
  -webkit-align-items: flex-end;
  background-size: 70% 70%;;
  transform: translate(-30px, 0px);
  background-position: center;
  background-repeat: no-repeat;
  background-image:url(${props => props.thumbnail});
  cursor:pointer;
`

const ScrollViewContainer = styled.div`
  background-color: white;
  height: 70vh;
  width: 87vw;
  overflow: auto;
  margin-top: 0vh;
  gap : 0vw;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: start;
  padding-top:0vh;

  h{
    padding-top: 2vh;
    padding-bottom: 3vh;
    padding-left: 1vw;
    display: flex;
    font-size: 1.8vh;
    font-weight: 900;
    min-width:15%;
  }
  
  p
  {
  text-align:left;
  }
`

const ScrollViewGrid = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  gap : 1vw;
  display: grid;
  grid-gap: 3vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  grid-template-columns: repeat(6, minmax(0,1fr));
`

const Layer1 = styled.div`
  width: ${props => props.standard == true? '16.5vh':'22vh'};
  height: ${props => props.standard == true? '12vh':'16vh'};
  border: 1px solid #ededed;
  background-color: #fbfbfb;
  display:grid;
  overflow-y: hidden;
  cursor:pointer;
  outline-style: inset;
  outline-width: thin;
  outline-color:${props => props.isselected == true? 'dodgerblue' : 'transparent'};
`

const ContentView = styled.div`
  transform:translate(0,-2vh);
  background-color:transparent;
  width:100vw;
  height: 70vh;
  display:flex;
  justify-content:start;
  flex-direction:column;
`

const Header = styled.div`
  width:100vw;
  height: 70vh;
  display:flex;
  justify-content:start;
  align-items:center;
  flex-direction:column;
  `
