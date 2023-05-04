import React, { useEffect } from 'react';
import axios from 'axios';

import {
    Button,
    TextField,
    Box,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput, InputAdornment, IconButton, FormHelperText
} from '@mui/material';

import useForm from '../hooks/useForm';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from "react-router-dom";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


axios.defaults.withCredentials = true;
axios.defaults.credentials = "include";

const getFreshModel = () => ({
    email: "",
    password: ""
})




export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const { setToken } = useStateContext();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const { user, setUser, resetUser } = useStateContext();
    const navigate = useNavigate();

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    useEffect(() => {
        resetUser();
    }, [])


    const login = e => {
        e.preventDefault()
        if (validate())
            axios.post('https://dvm.onrender.com/admin/adminlogin', values)
                .then(result => {
                    return result.data;
                })
                .then(res => {
                    setToken(res.token)
                    setUser(res.user)
                    navigate("/home")
                })
                .catch(function (err) {

                  if (err.response.data.errors) {
                    setErrors({ 
                      ...errors,
                      ...err.response.data.errors
                    })
                  }
                  }
                
                )
    }

    const validate = () => {
        let temp = {}
        temp.email = (/^[a-zA-Z\d]+@(?:[a-zA-Z\d]+\.)+[A-Za-z]+$/).test(values.email) ? "" : "Email is not valid.";
        temp.password = values.password !== "" ? "" : "Please Enter Password";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    }

    return (
        <Card sx={{width: 400, mx:70, my:28}}>
            <CardContent>
                <Typography variant="h5"
                        sx ={{my: 3, mx:6}}>
                            Digital Vending Machine
                </Typography>
                <Box sx={{
                    m: 3,
                    '& .MuiTextField-root':{
                        m: 1,
                        width: '90%'
                    }
                    }}>
                    <form noValidate autoComplete='on' onSubmit={login}>
                        <TextField
                            label="Email"
                            name="email"
                            value={values.email}
                            variant="outlined"
                            onChange={handleInputChange}
                            {...(errors.email && {error: true, helperText: errors.email})}
                        />

                        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            name="password"
                            value={values.password}
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleInputChange}
                            {...(errors.password && {error: true, helperText: errors.password})}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                          {!!errors.password && (
                            <FormHelperText error id="accountId-error">
                              {errors.password}
                            </FormHelperText>
                          )}
                        </FormControl>

                        <Button
                            type='submit'
                            variant="outlined"
                            size='large'
                            color='success'
                            sx={{width: '25%', mx:14}}
                            >Login</Button>
                    </form>
                </Box>
            </CardContent>
        </Card>
  

  )
}