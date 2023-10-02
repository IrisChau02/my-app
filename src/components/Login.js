import React, { useState } from 'react';
import { TextField, Button, Card, CardContent } from '@mui/material';
import backgroundImage from './loginbackground.png';
import useForm from '../hooks/useForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {

    const getFreshModel = () => ({
        username: '',
        password: '',
    })

    const {
        values,
        setValues,
        error,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const validate = () => {
    
        let temp = {}
        temp.username = values.username !== '' ? "" : "Username is required."
        temp.password = values.password !== '' ? "" : "Password is required."
        
        setErrors(temp)
        
        return Object.values(temp).every(x => x === "" ); //that mean !== " "
    }
    
    const navigate = useNavigate();
    
   const handleSubmit = (event) => {
        event.preventDefault();

        if(validate()){
            console.log(values)
            axios.post('http://localhost:8081/login', values)
            .then(res=> {
                if(res.data === "success"){
                    navigate('/home');
                }else{
                    alert("No exist record")
                }
            })
            .catch(err=> console.log(err))
        }
        
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: `url(${backgroundImage}) no-repeat center center fixed`,
            backgroundSize: 'cover'
        }}>
            <Card sx={{ backgroundColor: '#F2F5F3', border: '2px solid grey' }}>
                Login
                <CardContent>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <TextField
                            label="Username"
                            name='username'
                            value={values.username}
                            variant='outlined'
                            onChange={handleInputChange}
                            {...(error.username && {error:true, helperText: error.username})}
                        />
                        <br />
                        <TextField
                            label="Password"
                            name='password'
                            value={values.password}
                            variant='outlined'
                            onChange={handleInputChange}
                            {...(error.password && {error:true, helperText: error.password})}
                        />
                        <br />
                        <Button type="submit" variant="contained" color="success">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;