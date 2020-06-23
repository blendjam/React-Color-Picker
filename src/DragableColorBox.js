import React from 'react'
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        backgroundColor: props => props.color,
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
    }
};

function DragableColorBox(props) {
    const { classes, name } = props
    return (
        <div className={classes.root}>{name}</div>
    )
}

export default withStyles(styles)(DragableColorBox);
