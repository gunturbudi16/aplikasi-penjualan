import { makeStyles } from '@material-ui/core/styles';


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
    },
    iconRight: {
        marginLeft: theme.spacing(1)
    },
    iconLeft: {
        marginRight: theme.spacing(1)
    },
    actionButtons: {
        paddingTop: theme.spacing(2)
    }
}))

export default useStyles;