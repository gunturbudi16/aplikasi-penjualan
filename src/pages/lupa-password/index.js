import React, { useState } from "react";

//Material-UI
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//Styles
import useStyles from './styles';

//React Router DOM
import { Link, Redirect } from 'react-router-dom';

//Validator
import isEmail from 'validator/lib/isEmail';

//Firebase Hooks 
import { useFirebase } from '../../components/FirebaseProvider';

// App Loading
import AppLoading from '../../components/AppLoading'

// notistack
import { useSnackbar } from 'notistack';



function LupaPassword() {
    const classes = useStyles();

    const [form, setForm] = useState({
        email: ''
    });

    const [error, setError] = useState({
        email: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { auth, user, loading } = useFirebase();

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = e => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: ''
        })
    }

    const validate = () => {

        const newError = { ...error };

        if (!form.email) {
            newError.email = 'Email Wajib Diisi';
        } else if (!isEmail(form.email)) {
            newError.email = 'Email Tidak Valid';
        }

        return newError;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const findErrors = validate();

        if (Object.values(findErrors).some(err => err !== '')) {

            setError(findErrors);
        } else {
            try {
                setIsSubmitting(true);
                const actionCodeSettings = {

                    url: `${window.location.origin}/login`
                }
                await auth.sendPasswordResetEmail(form.email, actionCodeSettings);

                enqueueSnackbar(`Cek Kotak Masuk Email: ${form.email}, 
                Sebuah tautan Untuk Mereset Password Telah Dikirim`, {
                    variant:'success'
                });
                setIsSubmitting(false);
            } catch (e) {
                const newError = {};

                switch (e.code) {

                    case 'auth/user-not-found':
                        newError.email = "Email Tidak Terdaftar";
                        break;
                    case 'auth/invalid-email':
                        newError.email = "Email Tidak Valid";
                        break;
                    default:
                        newError.email = "Terjadi Kesalahan Silahkan Coba Lagi";
                        break;
                }
                setError(newError);
                setIsSubmitting(false);
            }
        }
    }

    if (loading) {
        return <AppLoading />
    }

    if (user) {

        return <Redirect to="/" />
    }

    console.log(user);

    return (
        <Container maxWidth="xs">
            <Paper className={classes.paper} >
                <Typography
                    variant="h5"
                    component="h1"
                    className={classes.title}
                >Lupa Password</Typography>

                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        margin="normal"
                        label="Alamat Email"
                        fullWidth
                        required
                        value={form.email}
                        onChange={handleChange}
                        helperText={error.email}
                        error={error.email ? true : false}
                        disabled={isSubmitting}
                    />

                    <Grid container className={classes.buttons} >
                        <Grid item xs>
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                color="primary"
                                variant="contained"
                                size="large"
                            > Kirim </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                disabled={isSubmitting}
                                component={Link}
                                variant="contained"
                                size="large"
                                to="./login"
                            > Login </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default LupaPassword;