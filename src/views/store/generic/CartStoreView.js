
import React, {Component} from 'react'
import './dropshadow.css';
import Button from "@mui/material/Button";
import './dropshadow.css'

export function CartItem(price,name,thumbnaiil,span, onDelete)
{
   return(

           <div className="rainbowGradientRound">
               <div className="innerSquare">
                   <div style={{backgroundColor:'white',width:'25vh',height:'15vh'}}>
                       <img onClick={() => {onDelete()}} style={{cursor:'pointer', position:"absolute", transform:'translate(-5px,8px)', right:'15vh',marginTop:'10x',width:'12px',height:'16px'}} src={'/images/icons/trash.png'} id={'icon'}></img>
                       <div style={{display:'flex',alignContent:"space-around"}}>
                           <img style={{height:'11vh',width:"11vh",objectFit:"fill"}} src={thumbnaiil}/>

                        <div style={{ width:'50vh',height:'auto',margin:'auto'}}>
                            <p style={{fontWeight:600, marginLeft:'2vh',textAlign:'left', width:'20vh'}}>£{price}/<span style={{fontSize:"0.65em"}}>{span}</span></p>
                            <p style={{marginLeft:'2vh',textAlign:'left',width:'20vh'}}>{name}</p>
                        </div>
                    </div>
                   </div>
               </div>
           </div>
     )
}

export function CartStoreView(props)
{
    function mapCartItems()
    {
        if(props.root.state.userData.cart.length > 0)
        return(
            <div>
            <p style={{marginLeft:'1vh' ,textAlign:"left" , fontWeight:'670'}}>Assets</p>
                {props.root.state.userData.cart.map(cartItem =>
                {
                    let asset = props.root.getAssetById(cartItem);
                    return CartItem(asset.price,asset.title, 'https://selfservetest-api.azurewebsites.net/cdn/serve/'+asset.cdnId_thumbnail,"upfront",()=>{
                        props.root.removeFromCart(cartItem);
                    });
                })}
            </div>
        );
    }

    function mapLayout()
    {
        let price = 0;
        let title = "";
        let thumbnail = "images/store/Room_";

        switch (props.root.state.userData.layoutId)
        {
            case 0:
                price = 149;
                title = "Medium Store";
                thumbnail += "2.png";
                break;
            case 1:
                price = 79 + 149;
                title = "Medium Store";
                thumbnail += "2.png";
                break;
            case 2:
                price = 149 + 149;
                title = "Large Store";
                thumbnail += "3.png";
                break;
            case 3:
                price = 209 + 149;
                title = "Premium Store";
                thumbnail += "4.png";
                break;
            case 4:
                price = 259 + 149;
                title = "Department Store";
                thumbnail += "5.png";
                break;
        }

        if(props.root.state.userData.ownedLayounts.includes(props.root.state.userData.layoutId ) == false)
        return(
            <div>
                <p style={{marginLeft:'1vh' ,textAlign:"left" , fontWeight:'670'}}>Layout</p>
                {CartItem(price,title,thumbnail,"pm",()=>
                {
                   let userData = props.root.state.userData;
                    userData.layoutId = 0;
                   props.root.setState({userData:userData});
                })}
            </div>
        );
    }

    return (
        <div style={{position:"absolute",minWidth:'140px',right:'3vw',top:'6vh', width:'70vh',height:'auto',backgroundColor:'white','z-index':'2'}}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:"center" ,height:'auto', width:'90%', margin:'auto'}}>

              <div style={{width:'70%',height:'auto' ,margin:'auto'}}>
                    <p style={{fontWeight:'700',fontSize:'1.9vh',marginTop:"2vh"}}>Your basket</p>

                  {mapLayout()}
                  {
                              mapCartItems()
                  }


                    <p style={{fontWeight:'600',fontSize:'1.8vh',marginTop:"5vh"}}>To pay today: £{props.root.getCartTotalRecurring()+props.root.getCartTotalAssets()}</p>
                    <p style={{fontWeight:'600',fontSize:'1.8vh',marginBottom:"0vh"}}>Monthly Recurring Fee: £{props.root.getCartTotalRecurring()}</p>
                    <Button onClick={()=>{
                        props.parent.setState({showCart: false});
                        props.parent.toggleMenu(9)}} style={{fontSize:'1.5vh', marginTop:'1vh',marginBottom:'2vh',paddingTop:'1vh',paddingBottom:'1vh',paddingLeft:'4vh',paddingRight:'4vh', backgroundColor:'black',color:'white',borderRadius:'24px'}} variant="contained" >Proceed</Button>
                    </div>
                </div>
            </div>
    )
}




