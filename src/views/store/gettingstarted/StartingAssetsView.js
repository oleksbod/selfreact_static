import styled from 'styled-components'
import React, {Component} from 'react'
import { Scrollbar } from "react-scrollbars-custom";
import AssetStoreItem from "../create/assetstore/AssetStoreItem";

class StartingAssetsView extends Component
{
    constructor()
    {
        super();
        this.state = {
            name: "CreateStore",
            selection:-1
        };
        this.selectLayout = this.selectLayout.bind(this);
    }

    selectLayout(layoutSelection)
    {
        console.log("Selected Layout:" + layoutSelection)
        this.setState({selection:layoutSelection});
    }

    mapStandardStore(storeAsset,standardassets)
    {
        if((standardassets == true&&storeAsset.price > 0)|| (standardassets == false&&storeAsset.price == 0))
        {
            return "";
        }

        let thumbImg = "https://selfservetest-api.azurewebsites.net/cdn/serve/" + storeAsset.cdnId_thumbnail;
        return (
            <Layer1 isselected={this.state.selection == storeAsset.id} onClick={() =>
            {
                this.selectLayout(storeAsset.id);
                this.props.parent.setState({assetSelection:storeAsset.cdnId_gltf})

            }
            }>
                <AssetStoreItem  thumbnail={thumbImg} title={''} description={''} price={storeAsset.price} ></AssetStoreItem>
            </Layer1>
        );
    }

    render()
    {
        var {selection} = this.state;

        return(
            <ContentView>
                <Header>
                    <HeaderDesc><h>Let's add some assets!</h></HeaderDesc>
                    <PDesc>Want more assets? Upgrade by going to the asset tab and &#10; adding more assets via the BrandLab360 3D asset store!</PDesc>

                    <ScrollViewContainer>
                        <Scrollbar>
                            <ScrollView>
                                {this.props.root.state.assets&&this.props.root.state.assets.map(asset => (this.mapStandardStore(asset,true)))}
                            </ScrollView>
                        </Scrollbar>
                        <h>Visit our BrandLab360 3D Asset Store <u onClick={()=>{this.props.parent.setBackMenu(-9); this.props.parent.toggleMenu(2);}}>here</u></h>
                    </ScrollViewContainer>
                </Header>
            </ContentView>
        )
    }
}

export default StartingAssetsView

const ScrollViewContainer = styled.div`
  background-color: white;
  height: 36vh;
  width: 90vw;
  overflow: auto;
  margin-top: 3vh;
  gap : 1vw;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  padding-top:7vh;

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

const ScrollView = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  padding-top: 5px;
  padding-left: 4vw;
  padding-right: 4vw;
  gap : 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Layer1 = styled.div`
  width: 22vh;
  height: 16vh;
  border: 1px solid #ededed;
  background-color: #fbfbfb;
  display:grid;
  min-width: 22vh;
  overflow-y: hidden;
  cursor:pointer;
  outline-style: inset;
  outline-width: thin;
  outline-color:${props => props.isselected == true? 'dodgerblue' : 'transparent'};
  
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
  justify-content:center;
  align-items:center;
  flex-direction:column;
  padding-left: 2vw;
  padding-top: 2vh;
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
  font-family: Calibre;
  font-size: 2vh;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  white-space: pre-line;
`