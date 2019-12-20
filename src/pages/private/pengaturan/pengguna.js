import React, { useRef, useState } from "react";

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useFirebase } from "../../../components/FirebaseProvider";
import { useSnackbar } from "notistack";

//Styles
import useStyles from './styles/pengguna';

import isEmail from 'validator/lib/isEmail';

function Pengguna() {

    const classes = useStyles();
    const { user } = useFirebase();
    const [error, setError] = useState({
        displayName: '',
        email: '',
        password: ''
    })
    const { enqueueSnackbar } = useSnackbar();
    const [isSubmitting, setSubmitting] = useState(false)
    const displayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const saveDisplayName = async (e) => {

        const displayName = displayNameRef.current.value;
        console.log(displayName)

        if (!displayName) {
            setError({
                displayName: 'Nama Wajib Diisi'
            })
        } else if (displayName !== user.displayName) {

            setError({
                displayName: ''
            })
            setSubmitting(true);
            await user.updateProfile({
                displayName
            })
            setSubmitting(false);
            enqueueSnackbar('Data Pengguna Berhasil Diperbarui',
                { variant: 'success' })
        }

    }

    const updateEmail = async (e) => {
        const email = emailRef.current.value;

        if (!email) {
            setError({
                email: 'Email Wajib Diisi'
            })
        } else if (!isEmail) {
            setError({
                email: 'Email Tidak Valid'
            })
        } else if (email !== user.email) {
            setError({
                email: ''
            })
            setSubmitting(true);
            try {
                await user.updateEmail(email);

                enqueueSnackbar('Email Berhasil Diperbarui',
                    { variant: 'success' });
            }
            catch (e) {
                let emailError = '';
                switch (e.code) {
                    case 'auth/email-already-in-use':
                        emailError = 'Email sudah digunakan';
                        break;
                    case 'auth/invalid-email':
                        emailError = 'Email tidak valid';
                        break;
                    case 'auth/requires-recent-login':
                        emailError = 'Silahkan Login Kembali';
                        break;
                    default:
                        emailError = 'Terjadi Kesalahan Silahkan Coba Lagi'
                        break;
                }

                setError({
                    email: emailError
                })
            }
            setSubmitting(false);
        }
    }

    const sendEmailVerification = async (e) => {

        const actionCodeSettings = {
            url: `${window.location.origin}/login`
        };

        setSubmitting(true);
        await user.sendEmailVerification
            (actionCodeSettings);
        enqueueSnackbar(`Email verifikasi telah dikirim ke ${emailRef.current.value}`, { variant: "success" });
        setSubmitting(false);
    }

    const updatePassword = async (e) => {

        const password = passwordRef.current.value;

        if (!password) {

            setError({
                password: 'Password wajib diisi'
            })
        } else {
            setSubmitting(true);
            try {

                await user.updatePassword(password);

                enqueueSnackbar('Password berhasil diperbarui', { variant: 'success' });
            } catch (e) {

                let errorPassword = '';

                switch (e.code) {

                    case 'auth/weak-password':
                        errorPassword = 'Password terlalu lemah';
                        break;
                    case 'auth/requires-recent-login':
                        errorPassword = 'Silahkan Login Kembali';
                        break;
                    default:
                        errorPassword = 'Terjadi Kesalahan Silahkan Coba Lagi'
                        break;
                }

                setError({
                    password: errorPassword 
                })

            }
            setSubmitting(false);
        }
    }

    return <div className={classes.pengaturanPengguna}>
        <TextField
            id="displayName"
            name="displayName"
            label="Nama"
            margin="normal"
            defaultValue={user.displayName}
            inputProps={{
                ref: displayNameRef,
                onBlur: saveDisplayName
            }}
            disabled={isSubmitting}
            helperText={error.displayName}
            error={error.displayName ? true : false}
        />

        <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            margin="normal"
            defaultValue={user.email}
            inputProps={{
                ref: emailRef,
                onBlur: updateEmail
            }}
            disabled={isSubmitting}
            helperText={error.email}
            error={error.email ? true : false}
        />

        {
            user.emailVerified ?
                <Typography
                    color="primary"
                    variant="subtitle1"
                >Email sudah terverifikasi</Typography>
                :
                <Button
                    variant="outlined"
                    onClick={sendEmailVerification}
                    disabled={isSubmitting}
                >Kirim email verifikasi </Button>
        }

        <TextField
            id="passsword"
            name="passsword"
            label="Passsword Baru"
            type="password"
            margin="normal"
            inputProps={{
                ref: passwordRef,
                onBlur: updatePassword
            }}
            autoComplete="new-password"
            disabled={isSubmitting}
            helperText={error.password}
            error={error.password ? true : false}
        />


    </div>

}

export default Pengguna;