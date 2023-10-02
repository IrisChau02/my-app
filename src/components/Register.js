import * as React from 'react';
import {useEffect, useState} from "react";
import {Box, CardContent, Typography} from "@mui/material";
import {Card, TextField, FormControl, FormLabel, Checkbox} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import useForm from "../hooks/useForm";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Divider from '@mui/material/Divider';
import Chip from "@mui/material/Chip"
import {FormHelperText} from '@material-ui/core';
import dayjs from 'dayjs';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    const getFreshModel = () => ({
        firstName: undefined,
        lastName: undefined,
        //birthday: undefined,
        gender: undefined,
        phoneNumber: undefined,
        email: undefined,
        password: undefined,
        loginName: undefined,
        confirmPassword: undefined,
    })

    const {
        values,
        setValues,
        error,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    useEffect(() => {
        console.log(values)
    }, [values])

    const validate = () => {
        const temp = {};

        //personal information

        if (values.firstName === undefined || values.firstName === "") {
            temp.firstName = "First Name cannot be empty.";
        } else {
            temp.firstName = "";
        }

        if (values.lastName === undefined || values.lastName === "") {
            temp.lastName = "Last Name cannot be empty.";
        } else {
            temp.lastName = "";
        }

        //if (values.birthday === undefined) {
        //    temp.birthday = "Birthday should be selected.";
        //} else {
        //    temp.birthday = "";
        //}

        if (values.gender === undefined) {
            temp.gender = "Gender should be selected.";
        } else {
            temp.gender = "";
        }

        if (values.email === undefined || values.email === "") {
            temp.email = "Email cannot be empty.";
        } else if (!values.email.includes("@")) {
            temp.email = "Email must be a valid email address.";
        } else {

            temp.email = "";
        }

        if (values.phoneNumber === undefined || values.phoneNumber === "") {
            temp.phoneNumber = "Phone Number cannot be empty.";
        } else if (!Number.isInteger(parseInt(values.phoneNumber))) {
            temp.phoneNumber = "Phone Number must be a valid integer.";
        } else {
            temp.phoneNumber = "";
        }

        //login information

        if (values.loginName === undefined || values.loginName === "") {
            temp.loginName = "Login Name cannot be empty.";
        } else {
            temp.loginName = "";
        }

        if (values.password === undefined || values.password === "") {
            temp.password = "Password cannot be empty.";
        } else if (values.password.length < 8 || !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/.test(values.password)) {
            temp.password = "Password must be at least 8 characters long and contain at least one letter, one number, and one symbol.";
        } else {
            temp.password = "";
        }

        if (values.confirmPassword === undefined || values.confirmPassword === "") {
            temp.confirmPassword = "Confirm Password cannot be empty.";
        } else if (values.confirmPassword !== values.password) {
            temp.confirmPassword = "Confirm Password must be same as the Password.";
        } else {
            temp.confirmPassword = "";
        }

        setErrors(temp);

        return Object.values(temp).every((x) => x === "");
    };

    const navigate = useNavigate();

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if (validate()) {

            console.log("values", values)

            axios.post('http://localhost:8081/register', values)
            .then(res=> {
                navigate('/');
            })
            .catch(err=> console.log(err))

        }

    }

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 4, // adds margin-top of 2 units
                    mb: 4, // adds margin-bottom of 2 units
                    backgroundColor: '#DFEDE2'
                }}
            >

                <Card sx={{width: '30%'}}>
                    <CardContent>

                        <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            sx={{color: 'brown', textAlign: 'center'}}
                        >
                            Register Page
                        </Typography>

                        <Divider></Divider>
                        <Chip label="Personal Information"/>

                        <form noValidate autoComplete="off" onSubmit={handleRegisterSubmit}>

                            <TextField
                                id="firstname"
                                label="First Name"
                                value={values.firstName}
                                onChange={e => handleInputChange({
                                    target: {
                                        value: e.target.value,
                                        name: 'firstName'
                                    }
                                })}
                                margin="dense"
                                required
                                {...(error.firstName && {error: true, helperText: error.firstName})}
                            />

                            <TextField
                                id="lastname"
                                label="Last Name"
                                value={values.lastName}
                                onChange={e => handleInputChange({
                                    target: {
                                        value: e.target.value,
                                        name: 'lastName'
                                    }
                                })}
                                margin="dense"
                                required
                                {...(error.lastName && {error: true, helperText: error.lastName})}
                            />
                            {/*
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    inputFormat="YYYY-MM-DD"
                                    label="Birthday"
                                    value={values.birthday ?? null}
                                    maxDate={new Date()}
                                    onChange={e => {
                                        setValues({
                                            ...values,
                                            birthday: formatDate(e),
                                        });
                                    }}
                                    renderInput={(params) =>
                                        <TextField required fullWidth {...params}
                                                   label="Birthday"
                                                   {...(error.birthday && {error: true, helperText: error.birthday})}
                                        />}
                                />
                            </LocalizationProvider>
                            */}
                            
                            <div>
                                <br></br>
                                 {/*<FormLabel component="legend">Gender *</FormLabel>*/}
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    aria-describedby={error.gender ? "gender-error-text" : ""}
                                    value={values.gender}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            gender: e.target.value,
                                        })
                                    }
                                >
                                    <FormControlLabel value="M" control={<Radio/>} label="Male"/>
                                    <FormControlLabel value="F" control={<Radio/>} label="Female"/>
                                    <FormControlLabel value="N/A" control={<Radio/>} label="N/A"/>
                                </RadioGroup>
                                {error.gender && (
                                    <FormHelperText id="gender-error-text" error>
                                        {error.gender}
                                    </FormHelperText>
                                )}
                            </div>

                            <TextField
                                id="email"
                                label="Email"
                                value={values.email}
                                onChange={e => handleInputChange({
                                    target: {
                                        value: e.target.value,
                                        name: 'email'
                                    }
                                })}
                                fullWidth
                                required
                                {...(error.email && {error: true, helperText: error.email})}
                            />

                            <TextField
                                id="phoneNumber"
                                label="Phone Number"
                                value={values.phoneNumber}
                                onChange={e => handleInputChange({
                                    target: {
                                        value: e.target.value,
                                        name: 'phoneNumber'
                                    }
                                })}
                                fullWidth
                                required
                                {...(error.phoneNumber && {error: true, helperText: error.phoneNumber})}
                            />

                            <Divider></Divider>
                            <Chip label="Login Information"/>

                            <TextField
                                id="loginname"
                                label="LoginName"
                                value={values.loginName}
                                onChange={e => handleInputChange({
                                    target: {
                                        value: e.target.value,
                                        name: 'loginName'
                                    }
                                })}
                                fullWidth
                                required
                                {...(error.loginName && {error: true, helperText: error.loginName})}
                            />

                            <TextField
                                id="password"
                                label="password"
                                value={values.password}
                                onChange={e => handleInputChange({
                                    target: {
                                        value: e.target.value,
                                        name: 'password'
                                    }
                                })}
                                fullWidth
                                required
                                {...(error.password && {error: true, helperText: error.password})}
                            />

                            <TextField
                                id="Conform password"
                                label="confirmPassword"
                                value={values.confirmPassword}
                                onChange={e => handleInputChange({
                                    target: {
                                        value: e.target.value,
                                        name: 'confirmPassword'
                                    }
                                })}
                                fullWidth
                                required
                                {...(error.confirmPassword && {error: true, helperText: error.confirmPassword})}
                            />

                            <Divider></Divider>

                            <Button type="submit" variant="contained" color="success">
                                Register
                            </Button>
                        </form>

                    </CardContent>
                </Card>
            </Box>
        </div>

    );
}

export default Register;