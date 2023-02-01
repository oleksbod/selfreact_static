import styled from 'styled-components'
import {Component} from 'react'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {LoginUser} from "../WebAPI";

class LoginStore extends Component {
    constructor() {
        super();
        this.state = {
            name: "LoginStore"
        };
    }


    render() {
        const theme = createTheme({
            multilineColor:{
                color:'white'
            }
        });
        const handleSubmit = (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            LoginUser(data.get('email'),data.get('password'),(data)=>{
                    console.log(data);
                    if(data != null && data.sesid.length > 5)
                    {
                        localStorage.setItem('sesid', data.sesid);
                        document.location.reload();
                    }
                },
                (data)=>{
                    console.log(data);
                })
            console.log({
                email: data.get('email'),
                password: data.get('password'),
            });
        };

        return (
            <ContainerLogin>
            <ThemeProvider theme={theme} >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <WhiteBorderTextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                sx={{
                                    input: {
                                        color: "black",
                                        background: "white"
                                    }
                                }}
                            />
                            <WhiteBorderTextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                sx={{
                                    input: {
                                        color: "black",
                                        background: "white"
                                    }
                                }}
                            />
                            <ContainerButtons>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Button onClick={()=>{this.props.parent.setState({showLogin:false})}}
                                    color="error"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 , }}
                                >
                                    Cancel
                                </Button>
                            </ContainerButtons>

                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            </ContainerLogin>
        );
    }
}

export default LoginStore

const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: transparent;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: transparent;
    }

    &.Mui fieldset {
      border-color: transparent;
    }
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  gap: 20px;
`

const ContainerLogin = styled.div`
  height:100vh;
  width:100vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/images/intro/bg.jpg');
  z-index:2;
  position: absolute; 
  top: 0;
  right: 0;
  bottom: 0; left: 0;
  color: white;
`


