import React from 'react'
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        background: props => props.color,
        outline: "none",
        border: "none",
        display: "inline-block",
        width: "10rem",
        height: "3rem",
        type: props => props.type,
        color: props => props.fontColor,
        cursor: "pointer",
    },

}


function Button(props) {
    const { classes, onClick } = props;
    return (
        <button className={classes.root} onClick={onClick}>{props.children}</button>
    )
}

export default withStyles(styles)(Button);
