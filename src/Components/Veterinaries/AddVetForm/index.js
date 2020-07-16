import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {Grid, Button, Avatar, Paper, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {ApiVet} from "../../../Services";
import {ModalMsg, Spinner} from "../../Notifications";
import styles from "./styles";
import { CloudUploadOutlined } from '@material-ui/icons';

class AddVetForm extends Component {
  state = {
    formData: {
      business_name: "",
      fantasy_name: "",
      cuit_cuil: "",
      phone1: "",
      street: "",
      id_user: this.props.location.state,
      image: "",
    },
    previewImage: null,
    imageSrc: null,
    isLoading: false,
    hasMsg: null,
    openMsg: false,
    success: false,
  };

  /**
   * Handle on change input form
   * @param {Event} event
   * @returns {void}
   */
  handleOnChange = event => {
    const {formData} = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({formData});
  };

  /**
   * Method to handle when user submit form, validate all values
   * show sucess or error
   * @returns {void}
   */
  handleSubmit = async () => {
    const {state} = this;
    const {history} = this.props;
    try {
      this.setState({...state, isLoading: true});
      const request = { ...state.formData };
      if (state.imageSrc) {
        request.image = state.imageSrc;
      }
      const {data} = await ApiVet.veterinaries.createVet(request);
      if (data.success) {
        this.setState({
          ...state,
          isLoading: false,
          openMsg: true,
          hasMsg: data.msg,
          success: data.success,
        });
        setTimeout(() => {
          history.push(`/admin-vet/vetslist`);
        }, 3000);
      } else {
        this.setState({
          ...state,
          isLoading: false,
          hasMsg: data.msg,
          openMsg: true,
          success: data.success,
        });
        setTimeout(() => {
          this.setState({
            ...state,
            openMsg: false,
          });
        }, 3000);
      }
    } catch (err) {
      this.setState({
        ...state,
        isLoading: false,
        hasMsg:
          "Se produjo un error al registar la veterinaria, por favor verifique sus datos.",
        openMsg: true,
      });
      setTimeout(() => {
        this.setState({
          ...state,
          openMsg: false,
        });
      }, 3000);
    }
  };

  /**
   * Handle event input to add preview image in form
   * @param {Event} event
   * @returns {void}
   */
  handleInputFile = event => {
    if (event.target.files.length > 0) {
      const [imagePath] = event.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(imagePath);
      reader.onloadend = () =>
        this.setState({
          ...this.state,
          previewImage: reader.result,
          imageSrc: imagePath,
        });
    } else {
      this.setState({...this.state, previewImage: null, imageSrc: null});
    }
  };

  render() {
    const {classes} = this.props;
    const {
      formData,
      openMsg,
      hasMsg,
      isLoading,
      success,
      previewImage,
    } = this.state;
    const {handleSubmit, handleOnChange, handleInputFile} = this;
    return (
      <ValidatorForm ref="form" onSubmit={handleSubmit}>
        <Paper className={classes.Paper}>
          <Typography
            className={classes.TitleForm}
            color="secondary"
            component="h3"
          >
            Ingresá los datos de la Veterinaria
          </Typography>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              errorMessages={[
                "Este campo es requerido.",
                "El nombre debe tener al menos 2 caracteres",
              ]}
              id="business_name"
              label="Ingrese nombre de la empresa"
              margin="normal"
              name="business_name"
              validators={["required", "minStringLength:2"]}
              value={formData.business_name}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              errorMessages={[
                "Este campo es requerido.",
                "El nombre de fantasia debe tener al menos 2 caracteres",
              ]}
              id="fantasy_name"
              label="Ingrese nombre de fantasía"
              margin="normal"
              name="fantasy_name"
              validators={["required", "minStringLength:2"]}
              value={formData.fantasy_name}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              errorMessages={[
                "Este campo es requerido.",
                "El cuit debe ser un número",
                "Debe tener un minimo de 4 numeros",
                "Debe tener un máximo de 20 números.",
              ]}
              id="cuit_cuil"
              label="CUIT/CUIL (Solo números)"
              margin="normal"
              name="cuit_cuil"
              type="number"
              validators={[
                "required",
                "isNumber",
                "minStringLength:4",
                "maxStringLength:20",
              ]}
              value={formData.cuit_cuil}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              errorMessages={[
                "Este campo es requerido.",
                "El teléfono debe ser un numero",
              ]}
              id="phone1"
              label="Teléfono (Solo números)"
              margin="normal"
              name="phone1"
              type="number"
              validators={["required", "isNumber"]}
              value={formData.phone1}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              errorMessages={["Este campo es requerido."]}
              id="street"
              label="Domicilio"
              margin="normal"
              name="street"
              validators={["required"]}
              value={formData.street}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item className={classes.divImage} xs={12}>
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="space-around"
              spacing={3}
            >
              <Grid item xs={12}>
              <label className={classes.Label}>Agregar una imágen</label>
                <label htmlFor="imagePet" className={classes.LabelUpload}>
                  <CloudUploadOutlined className={classes.IconUpload} /> Subir archivo
                </label>
                <input
                  accept=".jpg,.jpeg,.png"
                  id="imagePet"
                  name="image"
                  type="file"
                  onChange={handleInputFile}
                  className={classes.InputFile}
                />
                {previewImage && (
                  <Grid container>
                    <Avatar
                      alt="Preview pet"
                      className={classes.avatar}
                      src={previewImage}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="flex-end"
          >
            <Button
              className={classes.SentButton}
              color="primary"
              type="submit"
              variant="contained"
            >
              Agregar
            </Button>
          </Grid>
          {isLoading ? <Spinner /> : ""}
          {openMsg ? <ModalMsg msg={hasMsg} success={success} /> : ""}
        </Paper>
      </ValidatorForm>
    );
  }
}

/* AddDocForm.propTypes = {
  idRole: PropTypes.number.isRequired,
}; */

export default withStyles(styles)(
  withRouter(props => <AddVetForm {...props} />)
);
