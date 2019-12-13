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

function Registrasi() {
    const classes = useStyles();

    const [form, setForm] = useState({
        email: '',
        password: '',
        ulangi_password: ''
    });

    const [error, setError] = useState({
        email: '',
        password: '',
        ulangi_password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { auth, user, loading } = useFirebase();

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

        if (!form.password) {
            newError.password = 'Password Wajib Diisi';
        }

        if (!form.ulangi_password) {
            newError.ulangi_password = 'Ulangi Password Wajib Diisi';
        } else if (form.ulangi_password !== form.password) {
            newError.ulangi_password = 'Ulangi Password Tidak Sama Dengan Password';
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
                await auth.createUserWithEmailAndPassword(form.email, form.password)
            } catch (e) {
                const newError = {};

                switch (e.code) {

                    case 'auth/email-already-in-use':
                        newError.email = "Email Sudah Terdaftar";
                        break;
                    case 'auth/invalid-email':
                        newError.email = "Email Tidak Valid";
                        break;
                    case 'auth/weak-password':
                        newError.password = "Password Lemah";
                        break;
                    case 'auth/operation-not-allowed':
                        newError.email = "Metode Email dan Password Tidak Didukung";
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
                >Buat Akun Baru</Typography>

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

                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        margin="normal"
                        label="Password"
                        fullWidth
                        required
                        value={form.password}
                        onChange={handleChange}
                        helperText={error.password}
                        error={error.password ? true : false}
                        disabled={isSubmitting}
                    />

                    <TextField
                        id="ulangi_password"
                        type="password"
                        name="ulangi_password"
                        margin="normal"
                        label="Ulangi Password"
                        fullWidth
                        required
                        value={form.ulangi_password}
                        onChange={handleChange}
                        helperText={error.ulangi_password}
                        error={error.ulangi_password ? true : false}
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
                            > Daftar </Button>
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

export default Registrasi;