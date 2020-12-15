import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function ErrorNotice(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
        },
        },
        }));
        const classes = useStyles();

    
    return (
        <div className="error-notice">
            <span>{props.message}</span>
            <Button onClick={props.clearError} color="secondary">CLEAR MESSAGE</Button>
        </div>
        );
    
}

