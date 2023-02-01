import React, {Component} from 'react'
import './dropshadow.css';
import Button from "@mui/material/Button";

export function SaveStoreView(props)
{
    return (
        <div style={{position:"relative",margin:'auto',minWidth:'140px',width:'90vh',height:'60vh',backgroundColor:'white'}}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:"center" ,height:'100%', width:'90%', margin:'auto'}}>
<div style={{width:'99%',margin:'auto'}}>
                <p style={{fontWeight:'600',fontSize:'2.5vh',marginBottom:"5vh"}}>Your Changes are Saved!</p>
                <p style={{fontWeight:'600',fontSize:'2.5vh',marginBottom:"5vh"}}>Publish to see your changes live at the following domain:</p>
                <div style={{width:'50%',margin:'auto'}}>
                <div className="rainbowGradient">
                    <div className="innerSquare">
                        <div style={{cursor:'pointer',fontSize:'1.9vh', fontWeight:'600', paddingTop:'6.8vh' ,width:'100%',height:"5vh"}}>
                            <p style={{transform:'translate(0,-4.5vh)'}}>http://13.40.79.158/{props.root.state.userData.shopname}</p>
                        </div>
                    </div>
                </div>
                   <Button style={{fontSize:'2vh', marginTop:'5vh',paddingTop:'2vh',paddingBottom:'2vh',paddingLeft:'8vh',paddingRight:'8vh', backgroundColor:'black',color:'white',borderRadius:'24px',size:'large'}} variant="contained" onClick={()=>
                   {
                       props.parent.toggleMenu({step:-1});
                       window.unity.SendMessage('bloodbridge', "enablemovement");
                   }
                   }>Okay</Button>
                </div>
</div>
            </div>
        </div>
    )
}


