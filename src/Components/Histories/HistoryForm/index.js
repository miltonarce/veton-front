import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Grid, TextField, Button, FormHelperText, Avatar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { InvalidField } from "../../Notifications";
import styles from "./styles";
import { CloudUploadOutlined } from "@material-ui/icons";

class HistoryForm extends React.Component {
  state = {
    form: {
      comments: "",
      hide_comments: "",
      afflictions_procedures: "",
    },
    previewImage: [],
    imageSrc: [],
  };

  /**
   * Handle submit event, call callback parent
   * @param {Event} event
   * @returns {void}
   */
  handleOnSubmit = event => {
    const { props, state } = this;
    event.preventDefault();
    const request = { ...state.form };
    if (state.imageSrc.length > 0 && state.imageSrc.length <= 5) {
      state.imageSrc.forEach((element, i) => {
        request[`image${i+1}`] = element;
      });
      
    }
   props.onSubmit(request);
  };

  /**
   * Method to check handle on change in form inputs
   * @param {Event} event
   * @returns {void}
   */
  handleOnChange = event => {
    const { state } = this;
    const { name, value } = event.target;
    this.setState({ form: { ...state.form, [name]: value } });
  };

  /**
   * Handle event input to add preview image in form
   * @param {Event} event
   * @returns {void}
   */
  handleInputFile = event => {
    this.setState({ ...this.state, previewImage: [], imageSrc: [] });
    if (event.target.files.length > 0) {
        
        for(let i = 0;  i < event.target.files.length; i++){
          const imagePath = event.target.files[i];
          const reader = new FileReader();
          reader.readAsDataURL(imagePath);
          reader.onloadend = () =>
            this.setState({
              ...this.state,
              previewImage: this.state.previewImage.concat(reader.result),
              imageSrc: this.state.imageSrc.concat(imagePath),
            });
     
          }
       
    }
  };

  render() {
    const { title, classes, errors } = this.props;
    const { comments, hide_comments, afflictions_procedures } = this.state.form;
    const { previewImage} = this.state;
    const { handleOnSubmit, handleOnChange, handleInputFile } = this;
    console.log(this.state);
    return (
      <>
        <Paper className={classes.Paper}>
          <Typography
            className={classes.TitleForm}
            color="secondary"
            component="h3"
          >
            {title}
          </Typography>
          <form onSubmit={handleOnSubmit}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                required
                id="comments"
                label="Comentarios"
                margin="normal"
                name="comments"
                type="text"
                value={comments}
                onChange={handleOnChange}
              />
              <InvalidField errors={errors} field="comments" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                required
                id="hide_comments"
                label="Comentarios ocultos"
                margin="normal"
                name="hide_comments"
                type="text"
                value={hide_comments}
                onChange={handleOnChange}
              />
              <FormHelperText>Permite aportar al veterinario medidas de seguridad sobre el animal, si es agresivo, muerde constantemente, entre otros</FormHelperText>
              <InvalidField errors={errors} field="hide_comments" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="afflictions_procedures"
                label="Aflicciones"
                margin="normal"
                name="afflictions_procedures"
                type="text"
                value={afflictions_procedures}
                onChange={handleOnChange}
              />
              <InvalidField errors={errors} field="afflictions_procedures" />
            </Grid>
            <Grid item xs={12}><label className={classes.Label}>Agregar imágenes a la historia clínica</label></Grid>
            <Grid item xs={12}>
            <label htmlFor="imagePet" className={classes.LabelUpload}>
                  <CloudUploadOutlined className={classes.IconUpload} /> Subir archivo
                </label>
                  <input
                    accept=".jpg,.jpeg,.png"
                    id="imagePet"
                    name="image"
                    type="file"
                    multiple
                    onChange={handleInputFile}
                    className={classes.InputFile}
                  />   
                  <Grid container>
                  {previewImage.length >= 1 && previewImage.map(i =>  (
                 
                      <Avatar
                        alt="Preview pet"
                        className={classes.avatar}
                        src={i}
                      />
                   
                  ))} 
                  </Grid>
                </Grid>
            <Grid item className={classes.GridButton} xs={12}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="space-around"
              >
                <Grid item xs={3}>
                  <span>(*) Datos obligatorios.</span>
                </Grid>
                <Grid item xs={3}>
                  <Button color="primary" type="submit" variant="contained">
                    AGREGAR
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </>
    );
  }
}

HistoryForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(HistoryForm);
