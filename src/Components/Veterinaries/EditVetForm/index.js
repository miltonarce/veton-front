import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {Grid, Button, Avatar, Paper, Typography, Container, CircularProgress} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {ApiVet, ApiAdminVet} from "../../../Services";
import {ModalMsg, Spinner} from "../../Notifications";
import {URL_IMAGES} from "../../../Utils/globals";
import styles from "./styles";
import { CloudUploadOutlined } from '@material-ui/icons';

class AddVetForm extends Component {

  state = {
    formData: {
      business_name: "",
      fantasy_name: "",
      cuit_cuil: "",
      phone1: "",
      phone2: "",
      street: "",
      id_user: "",
      image: "",
    },
    previewImage: null,
    imageSrc: null,
    isLoading: true,
    hasMsg: null,
    openMsg: false,
    success: false,
  };
  
  // Retrieve detail vet by id
  async componentDidMount() {
    const {match} = this.props;
    const {state} = this;
    try {
      const {data} = await ApiAdminVet.veterinary.fetch(match.params.id);
      this.setState({
        ...state,
        formData: data.veterinary,
        isLoading: false,
      });
    } catch (error) {
      this.setState({...state, isLoading: false, error: true});
    }
  }

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
    const {match} = this.props;
    try {
      this.setState({...state, isLoading: true});
      const request = { ...state.formData };
      if (state.imageSrc) {
        request.image = state.imageSrc;
      }
      /*if (request.id_veterinary){
        delete request.id_veterinary;
      }*/
      console.log(request)
      const {data} = await ApiVet.veterinaries.editVet(match.params.id, request);
      if (data.success) {
        this.setState({
          ...state,
          isLoading: false,
          openMsg: true,
          hasMsg: data.msg,
          success: data.success,
        });
        setTimeout(() => {
          history.push(`/admin-vet/veterinary/${match.params.id}`);
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
    if(isLoading){
      return (
        <Container fixed>
        <Grid
          container
          alignItems="center"
          className={classes.spinner}
          direction="row"
          justify="center"
        >
          <CircularProgress color="secondary" />
        </Grid>
      </Container>
      )
    }
    return (
      <ValidatorForm ref="form" onSubmit={handleSubmit}>
        <Paper className={classes.Paper}>
          <Typography
            className={classes.TitleForm}
            color="secondary"
            component="h3"
          >
            Datos de la Veterinaria
          </Typography>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              errorMessages={[
                "Este campo es requerido.",
                "El nombre de fantasia debe tener al menos 2 caracteres",
              ]}
              id="fantasy_name"
              label="Nombre de fantasía"
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
              errorMessages={[
                "Este campo es requerido.",
                "El teléfono debe ser un numero",
              ]}
              id="phone2"
              label="Teléfono 2 (Solo números)"
              margin="normal"
              name="phone2"
              type="number"
              validators={["required", "isNumber"]}
              value={formData.phone2}
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
              <Grid item xs={12} className={classes.ContainerInput}>
                {previewImage ? 
                  <Grid container className={classes.ContainerImageTitle}>
                    <Typography
                      className={classes.TitleImage}
                      color="secondary"
                      component="h4"
                    >
                      Nueva Imagen
                    </Typography>
                    <Avatar
                      alt="Preview vet"
                      className={classes.avatar}
                      src={previewImage}
                    />
                  </Grid>
                :
                  <Grid container className={classes.ContainerImageTitle}>
                    <Typography
                      className={classes.TitleImage}
                      color="secondary"
                      component="h4"
                    >
                      Imagen actual
                    </Typography>
                    <Avatar
                      alt="Preview vet"
                      className={classes.avatar}
                      src={formData.image ? `${URL_IMAGES}${formData.image}`: "/assets/no-image.png"}
                    />
                </Grid>
                }
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
              Guardar
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
