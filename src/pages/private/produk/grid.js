import React from "react";

// Material UI
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

//Styles
import useStyles from './styles/grid';

// Page Component
import AddDialog from './add'

function GridProduk() {

    const classes = useStyles();

    return <><h1>Halaman Grid Produk</h1>
        <Fab
            className={classes.fab}
            color="primary"
        >
            <AddIcon />

            <AddDialog />
        </Fab>
    </>

}

export default GridProduk;