import React, { useState } from "react";

// Material UI
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

//Styles
import useStyles from './styles/grid';

// Page Component
import AddDialog from './add'

function GridProduk() {

    const classes = useStyles();

    const [openAddDialog, setOpenAddDialog] = useState(false);

    return <><h1>Halaman Grid Produk</h1>
        <Fab
            className={classes.fab}
            color="primary"
            onClick={(e)=>{
                setOpenAddDialog(true);
            }}
        >
            <AddIcon />
        </Fab>

        <AddDialog
            open={openAddDialog}
            handleClose={()=>{
                setOpenAddDialog(false);
            }}
        />

    </>

}

export default GridProduk;