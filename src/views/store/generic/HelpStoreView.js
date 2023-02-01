
import React, {Component} from 'react'
import './dropshadow.css';

export function HelpStoreView(props)
{
    return (
        <div style={{position:"absolute",top:'6vh',right:'10vw',minWidth:'140px',width:'20vw',height:'68vh',backgroundColor:'white'}}>
            <div className="rainbowGradient">
                <div className="innerSquare">
                    <div onClick={()=>{window.open('https://www.brandlab-360.com/contact', '_blank').focus()}} style={{cursor:'pointer',fontSize:'1.9vh', fontWeight:'600', paddingTop:'6.8vh' ,width:'20vw',height:"15vh"}}>
                        Contact BrandLab360
                    </div>
                </div>
            </div>
            <div className="rainbowGradient">
                <div className="innerSquare">
                    <div style={{cursor:'pointer',fontSize:'1.9vh', fontWeight:'600', paddingTop:'6.8vh' ,width:'20vw',height:"15vh"}}>
                        Troubleshooting Guide
                    </div>
                </div>
            </div>
            <div className="rainbowGradient">
                <div className="innerSquare">
                    <div style={{cursor:'pointer',fontSize:'1.9vh', fontWeight:'600', paddingTop:'6.8vh' ,width:'20vw',height:"15vh"}}>
                        Terms of Use
                    </div>
                </div>
            </div>
            <div className="rainbowGradient">
                <div className="innerSquare">
                    <div style={{cursor:'pointer',fontSize:'1.9vh', fontWeight:'600', paddingTop:'6.8vh' ,width:'20vw',height:"15vh"}}>
                        Policy Privacy
                    </div>
                </div>
            </div>
        </div>
)
}


