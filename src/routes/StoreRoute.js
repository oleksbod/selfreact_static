import styled from 'styled-components'
import React, {Component, useEffect} from 'react'
import Fade from 'react-reveal/Fade';
import Intro from "../views/Intro";
import CreateStore from "../views/CreateStore";
import Store from "../views/Store";
import LoginStore from "../views/LoginStore";
import {LoginUser,GetUser,GetUserByShop, UpdateUser,UploadCdn,getBrand} from "../WebAPI";
import axios from "axios";
class StoreRoute extends Component
{
    constructor()
    {
        super();
        this.state = {
            name: "React",
            intro: false,
            createStore: true,
            instore: false,
            userData: null,
            brand: null,
            assets:null,
            unityMounted:false,
            onMountedRoutine:false,
            validateFields: false,
            showLogin: false
        };

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        this.hideComponent = this.hideComponent.bind(this);
        window.onUnityMount = this.onUnityMounted;
        window.onUpdateComposable = this.onUpdateComposable;
    }

    hideComponent(name)
    {
        let _user = this.state.userData;

        if(_user.setupComplete && name == "intro")
        {
            name = "createstore";
            this.setZIndex(1);
        }

        console.log(name);
        switch (name) {
            case "intro":
                this.setState({intro: false});
                this.setState({createStore: true});
                this.setState({instore: false});
                break;
            case "createstore":
                this.setState({intro: false});
                this.setState({createStore: false});
                this.setState({instore: true});
                break;
            default:
        }
    }

    uploadLogo(logoFile,onSuccess,onFail)
    {
        console.log('Updating logo');
        if(logoFile.length > 0) {
            this.fetchBrandEv(()=>{
                let brandData = this.state.brand;
                UploadCdn(logoFile[0], brandData.logo_cdnId, onSuccess, onFail);
                console.log(logoFile);
            },()=>{
                console.log("failed to fetch braind and set logo");
            })
        }
    }

    checkUserState()
    {
        let _user = this.state.userData;
        if(_user.onboardingComplete == false)
        {
            this.updateUserField("firstname","");
            this.updateUserField("lastname","");
            this.updateUserField("email","");
            this.updateUserField("password","");
            this.updateUserField("shopname","");
            this.updateUserData(()=>{},()=>{});
        }
    }

    updateUserField(field, value)
    {
        this.setState({validateFields:false});
        let _user = this.state.userData;

        if(this.state.userData != null)
        switch (field)
        {
            case "firstname": _user.firstName = value;break;
            case "lastname": _user.lastName = value;break;
            case "email": _user.email = value;break;
            case "password": _user.password = value; break;
            case "shopname": _user.shopname = value; break;
            case "country": _user.countryCode = value;break;
            case "company": _user.company = value;break;
            case "jobtitle": _user.jobTitle = value;break;
            case "onboardingComplete": _user.onboardingComplete = value;break;
            case "setupComplete": _user.setupComplete = value;break;
            case "layoutId":_user.layoutId = value; break;
            case "styleId":_user.styleId = value; break;
            case "techPackId":_user.techPackId = value; break;
            case "composableId":_user.composableId = value;break;
        }

        this.setState({userData:_user});
    }

    validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

    validateField(field)
    {
        let _user = this.state.userData;

        switch (field)
        {
            case "firstname":
                if(_user.firstName!= null && _user.firstName.length > 1)
                    return null;
                else {
                    console.log("failed firstname");
                    return "Length needs to be higher than 1";
                }

            break;
            case "lastname":
                if(_user.lastName!= null && _user.lastName.length > 1)
                    return null;
                else
                    return "Length needs to be higher than 1";
                break;
            case "email":
                if(_user.email == null)
                    return "Email invalid";

               let isValid = this.validateEmail(_user.email) ;
               if(isValid)
                   return null;
               else
                   return "Email invalid"
                break;
            case "password":
                if(_user.password != null && _user.password.length > 6)
                    return null;
                else
                    return "Length needs to be higher than 6";
                break;
            case "shopname":
                if( _user.shopname == null || _user.shopname < 6)
                    return "Length needs to be higher than 6";
                if(_user.shopname > 20)
                    return  "Length needs to be higher than 20";

               /* try {
                    GetUserByShop(this.props.storeid,(data)=>{
                        console.log("User by shopname data" + data);

                        if(data != null && data.length > 10)
                            return "Shop with name already exists";

                    },()=>{});
                }catch (e) {
                    return null;
                }*/

                return null;

                break;
        }
        return  null;
    }

    updateUserData(onSuccess,onFail)
    {
        UpdateUser(this.state.userData,
            ()=>{
            onSuccess();
            this.fetchBrand();
            this.fetchUser();
            }
            ,onFail);

    }

    fetchUserDef()
    {
        GetUser((data) =>
            {
                localStorage.setItem('sesid',data.sesid);

                this.setState({userData:data});
            }
            ,
            (err) => {

            }
        );
    }

    fetchUser()
    {
        GetUser((data) =>
            {
                console.log(data);
                console.log("sesid:" + data.sesid);

                if(this.props.minimal == false)
                     localStorage.setItem('sesid',data.sesid);
                else
                    localStorage.setItem('sesid1',data.sesid);

                this.setState({userData:data});
            }
            ,
            (err) => {

            }
        );
    }

    fetchBrand()
    {
        if(this.state.userData != null)
        getBrand(this.state.userData.brandId,(data)=>
        {
            this.setState({brand:data});
            console.log(data);

        },(data)=>{});
    }

    fetchBrandEv(onComplete,onFail)
    {
        getBrand(this.state.userData.brandId,(data)=>
        {
            this.setState({brand:data});
            console.log(data);
            onComplete();

        },(data)=>{
            onFail();
        });
    }

   getCartTotalAssets()
   {
       let userData = this.state.userData;

       let totalAssetPrice = 0;

       for(let i = 0; i < userData.cart.length; i++)
       {
           let asset = this.getAssetById(userData.cart[i]);
           if(asset != null)
           {
               totalAssetPrice += asset.price;
           }
       }

       return totalAssetPrice;
   }

   addToCart(assetId)
   {
       var state = this.state.userData;

       this.InvokeUnity("conntest");
       console.log("added item " + assetId + " to cart");
       let userData = this.state.userData;
       let index = userData.cart.indexOf(assetId);
       if(index == -1)
       {
           userData.cart.push(assetId);
           this.setState({userData:userData});
           this.updateUserData(()=>{},()=>{});
       }
       else
       {
            console.log("item already in cart");
       }
   }

   removeFromCart(assetId)
   {
       console.log("removed item " + assetId + " from cart");
       let userData = this.state.userData;
       var index = userData.cart.indexOf(assetId);
       if (index !== -1) {
           userData.cart.splice(index, 1);
       }
       this.setState({userData:userData});
       this.updateUserData(()=>{},()=>{});
   }

   getAssetById(assetId)
   {
       let assetsData = this.state.assets;
       for(let j = 0; j < assetsData.length; j++)
       {
           if (assetsData[j].id == assetId)
           {
               return assetsData[j];
           }
       }
       return null;
   }

   getTotal()
   {
       return this.getCartTotalRecurring() + this.getCartTotalAssets();
   }

   InvokeUnityArg(method,asset)
   {
       window.onUnityMount = this.onUnityMounted;
       window.onUpdateComposable = this.onUpdateComposable;

       if(window.unity != null)
       {
           window.unity.SendMessage('bloodbridge', method, asset);
       }
       else
       {
           console.log("Unity instance is null")
       }
   }

   InvokeUnity(method)
   {
       window.onUnityMount = this.onUnityMounted;
       window.onUpdateComposable = this.onUpdateComposable;

       if(window.unity != null)
       {
           window.unity.SendMessage('bloodbridge', method);
       }
       else
       {
           console.log("Unity instance is null")
       }
   }

   getCartTotalRecurring()
   {
       let userData = this.state.userData;

       let totalCartPrice = 0;

       if(userData != null)
       switch(userData.layoutId)
       {
           case 0:
               totalCartPrice += 149;
               break;
           case 1:
               totalCartPrice += 79 + 149;
               break;
           case 2:
               totalCartPrice += 149 + 149;
               break;
           case 3:
               totalCartPrice += 209 + 149;
               break;
           case 4:
               totalCartPrice += 259 + 149;
               break;
           case 4:
               totalCartPrice += 149;
               break;
       }

       if(userData.ownedLayounts.includes(userData.layoutId))
           totalCartPrice = 0;

       if(userData != null)
       switch(userData.techPackId) {
           case 1:
               totalCartPrice += 149;
               break;
           case 2:
               totalCartPrice += 399;
               break;
       }

       return totalCartPrice;
   }

    onUpdateComposable(composableJson)
    {
        window.updatedJson= composableJson;
        console.log("updating composable:" + composableJson);
    }

    onUnityMounted()
    {
        console.log("Unity3D mounted");
        window.unityMounted = true;
        window.unity.SendMessage('bloodbridge', "setapiurl", "https://selfservetest-api.azurewebsites.net");
    }

    updateUnityData()
    {
        if(window.updatedJson != "" && typeof(window.updatedJson) !== "undefined")
        {
            this.updateUserField("composableId",window.updatedJson);
            this.updateUserData(()=>{
                console.log("Sucesfully updated composable");
            },()=>{
                console.log("Failed to update composable");
            });
            window.updatedJson = "";
        }

        if( window.unityMounted )
        {
            if(window.initialized == false)
            {
                window.isMinimal = this.props.minimal;
                if(this.props.minimal == false)
                {
                    let sesIdStorage = localStorage.getItem("sesid");
                    if (sesIdStorage == null)
                    {
                        localStorage.setItem('sesid', "null");

                    }
                }
                else
                {
                    this.setZIndex(1);
                    GetUserByShop(this.props.storeid,(data)=>{

                        let sesIdStorage = localStorage.getItem("sesid1");

                        if(sesIdStorage != data.sesid)
                        {
                            console.log("[SHOP SES ID=>]" + data.sesid);
                            console.log("User by shopname data" + data);
                            localStorage.setItem('sesid1', data.sesid);
                            window.location.reload();
                        }

                    },()=>{});
                }



                GetUser((data) =>
                    {
                        console.log(data);
                        console.log("UPDATING USER:" + data.sesid);

                        if(this.props.minimal == false) {
                            localStorage.setItem('sesid', data.sesid);
                        }

                        this.setState({userData:data});
                        this.fetchBrand();
                        this.InvokeUnityArg("updateuserdata",JSON.stringify(data));

                        if(data.setupComplete == true)
                        {
                            this.hideComponent("createstore");
                        }

                        window.initialized = true;
                    },
                    (err) => {

                    }
                );

                console.log("ENDPOINT =>> " +  "https://selfservebackend.azurewebsites3.net" + "/data/assets/");

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
            }

            if(this.state.onMountedRoutine == false)
            {
              if(this.props.minimal)
              {
                  this.InvokeUnity("setMinimal");
                  this.setZIndex(1);
              }


                if(this.state.userData != null &&this.state.userData.onboardingComplete)
                {
                    this.InvokeUnity("enablemovement");
                    this.InvokeUnity("onloadstore");
                    this.setState({onMountedRoutine: true});
                }
            }

            if (this.state.userData != null)
                this.InvokeUnityArg("updateuserdata", JSON.stringify(this.state.userData));

            if (this.state.brand != null)
                this.InvokeUnityArg("updatebrand", JSON.stringify(this.state.brand));
        }
    }

    setZIndex(idx)
    {
        document.getElementById("canvasmain").style.zIndex = idx;
    }

    focusCanvas()
    {
        document.getElementById("canvasmain").focus();
        document.getElementById("canvasmain").click();

    }

    componentDidMount()
    {
        window.fetchUser = this.fetchUserDef;
        window.initialized = false;
        setInterval(() => {
           this.updateUnityData();
        }, 1000);
    }

    render()
    {
        const {intro,createStore,instore,showLogin} = this.state;

        return (
            <div >
                {!showLogin&&intro&&window.initialized && <Intro parent={this}></Intro>}
                {!showLogin&&createStore&&window.initialized && this.props.minimal == false && <CreateStore parent={this}></CreateStore>}
                {!showLogin&&instore&&window.initialized &&this.props.minimal == false && <Store parent={this} app={this.props.app}></Store>}
                {showLogin&&window.initialized  && <LoginStore parent={this}></LoginStore>}
            </div>

        )
    }
}

export default StoreRoute