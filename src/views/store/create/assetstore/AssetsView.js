import styled from 'styled-components'
import React, {Component,useState,useEffect} from 'react'
import ReactDOM from 'react-dom';
import { Scrollbar } from "react-scrollbars-custom";
import AssetStoreItem from "./AssetStoreItem";
import axios from "axios";

class AssetsView extends Component
{
    constructor()
    {
        super();
        this.state = {
            name: "CreateStore",
            selection:null,
            assets:null,
            selections:[]
        };
        this.selectLayout = this.selectLayout.bind(this);


    }

    isElSelected(layoutSelection)
    {
        let tAssets = this.state.selections;

        if( tAssets[layoutSelection] == null)
        {
            return false;
        }
        else
        {
            return tAssets[layoutSelection];

        }
    }

    selectLayout(layoutSelection)
    {
        console.log("Selected Layout:" + layoutSelection.cdnId_thumbnail);
        let tAssets = this.state.selections;

        if(  tAssets[layoutSelection.cdnId_thumbnail] == null) {
            tAssets[layoutSelection.cdnId_thumbnail] = true;
        }
        else
        {
            tAssets[layoutSelection.cdnId_thumbnail] = !tAssets[layoutSelection.cdnId_thumbnail];
        }

        this.setState({selections:tAssets});
            //this.setState({selection:layoutSelection});
    }


    componentDidMount()
    {

        const options = {
            method: 'GET',
            url: 'https://selfservetest-api.azurewebsites.net/data/assets/',
        };

        axios.request(options).then((response) => {
            console.log(response.data);
            this.setState(({assets:response.data}));
        }).catch(function (error) {
            console.error(error);
        });

       /* fetch(  "/data/assets/")
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    this.setState(({assets:data}));
                },
                (error) => {
                });*/
    }

    mapStandardStore(storeAsset,standardassets)
    {
        if((standardassets == true&&storeAsset.price > 0)|| (standardassets == false&&storeAsset.price == 0))
        {
            return "";
        }

            let thumbImg =  "https://selfservetest-api.azurewebsites.net/cdn/serve/" + storeAsset.cdnId_thumbnail;
            return (
                <Layer1 hidden onClick={() => this.selectLayout(storeAsset)} isselected={this.isElSelected(storeAsset.cdnId_thumbnail)}>
                    <AssetStoreItem  thumbnail={thumbImg} title={''} description={'Ideal for up to 250 products'} price={storeAsset.price} ></AssetStoreItem>
                </Layer1>
            )
    }

    render()
    {
        var {selection,assets} = this.state;

        return(
            <ContentView>
                    <Header>
                        <HeaderDesc><h>Step 3: Chose your 3D Assets.</h></HeaderDesc>
                        <PDesc>Can't decide? Don't worry, you can purchase new assets at any time!</PDesc>

                        <ScrollViewContainer>
                            <h>Included as Standard:</h>
                            <Scrollbar>
                                <ScrollView>
                                    {this.state.assets&&this.state.assets.map(asset => (this.mapStandardStore(asset,true)))}
                                </ScrollView>
                            </Scrollbar>
                        </ScrollViewContainer>

                        <ScrollViewContainer2 style={{ height: '36vh'}}>
                            <h>BrandLab360's Asset Store - Everything Available as One-Time Purchase</h>
                                <Scrollbar>
                                    <ScrollViewGrid>
                                        <ScrollView>
                                        {this.state.assets&&this.state.assets.map(asset => (this.mapStandardStore(asset,false)))}
                                        </ScrollView>
                                    </ScrollViewGrid>
                                </Scrollbar>
                        </ScrollViewContainer2>
                    </Header>
            </ContentView>
        )
    }
}

export default AssetsView

const ScrollViewContainer2 = styled.div`
  background-color: white;
  height: 20vh;
  width: 87vw;
  overflow: auto;
  margin-top: 3vh;
  gap : 1vw;
  display: flex;
  flex-direction: column;
  h{
    padding-top: 1vh;
    padding-left: 1vw;
    display: flex;
    font-size: 1.8vh;
    font-weight: 900;
    min-width:15%;
  }
`

const ScrollViewContainer = styled.div`
  background-color: white;
  height: 20vh;
  width: 87vw;
  overflow: auto;
  margin-top: 3vh;
  gap : 1vw;
  display: flex;

  h{
    padding-top: 1vh;
    padding-left: 1vw;
    display: flex;
    font-size: 1.8vh;
    font-weight: 900;
    min-width:15%;
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
  gap : 1vw;
`



const ScrollView = styled.div`
  background-color: white;
  padding-top: 1vh;
  height: 100%;
  width: 100%;
  gap : 1vw;
  display: flex;
  
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
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: 2px;
  margin-right: 2px;
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