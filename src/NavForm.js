import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {},
};

function NavForm(props) {
    const { classes } = props;
    const [paletteName, setPaletteName] = useState("");

    useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            props.paletteList.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    });

    const handlePaletteNameChange = e => {
        setPaletteName(e.target.value);
    };

    const handleSavePalette = () => {
        props.handleSavePalette(paletteName);
    }

    return (
        <div className={classes.root}>
            <ValidatorForm onSubmit={handleSavePalette}>
                <TextValidator
                    value={paletteName}
                    name="paletteName"
                    onChange={handlePaletteNameChange}
                    validators={["required", "isPaletteNameUnique"]}
                    errorMessages={["This filed is required", "Enter Unique Name"]}
                />
                <button type="submit">Save Palette</button>
            </ValidatorForm>
        </div>
    )
}

export default withStyles(styles)(NavForm);