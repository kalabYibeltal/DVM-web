import React from 'react';
import {Navigate, Outlet} from "react-router";
import {Backdrop, CircularProgress} from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStateContext from '../hooks/useStateContext';

export default function Authenticate(props) {
    const [verified, setVerified] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const { token } = useStateContext();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()
    console.log(token)

    React.useEffect(() => {
        axios.post('https://dvm-dq1y.onrender.com/admin/verify', {}, {
            headers: {
                token
            }
        })
            .then(data => {
                setVerified(true);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setVerified(false);
                setLoading(false);
            });
    })

    const handleClose = () => {
        setOpen(false);
    };

    if (loading) {
        return (
            <>
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open}
                  onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>
        )
    }

    if (verified) {
        return <Outlet />
    }

    // navigate("/appbar/login");
    return <Navigate to={"/appbar/login"} />
}