import React from 'react';

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styles';

function AppLoading() {

    const classes = useStyles();

    return (
            <div className={classes.loadingBox}>
                <CircularProgress />
            </div>
    )
}

export default AppLoading;