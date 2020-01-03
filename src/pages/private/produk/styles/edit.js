import { makeStyles } from '@material-ui/core/Styles';


const useStyles = makeStyles(theme => ({

    hideInputFiles: {
        display: 'none'
    },
    uploadFotoProduk: {
        textAlign: 'center',
        padding: theme.spacing(3)
    },
    previewPhotoProduk: {
        width: '100%',
        height: 'auto'
    }
}))

export default useStyles;