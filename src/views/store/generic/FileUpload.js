import styled from 'styled-components'
import React, {Component} from 'react'

class UploadView extends Component
{
    constructor()
    {
        super();
        this.state = {
        };
    }

    render()
    {
        var {selection} = this.state;

        return(
            <Wrap>
                <UploadLogoWrap>
                    <container>
                        <Thumbnail thumbnail={'/images/store/uploadicon_.png'}></Thumbnail>
                        <p>
                            <span>Chose a file</span> or drag it here.
                        </p>
                    </container>

                </UploadLogoWrap>
            </Wrap>
        )
    }
}

export default UploadView

const Wrap = styled.div`
  position: relative;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height:100%;
`

const Thumbnail = styled.div`
  width: 10vh;
  height: 10vh;
  justify-content: center;
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
  background-color:white;
  
  container{
    outline-style: dotted;
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
