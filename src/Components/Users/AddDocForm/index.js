import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {
  InputAdornment,
  Grid,
  IconButton,
  Avatar,
  Paper,
  Typography,
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {withStyles} from "@material-ui/core/styles";
import {ApiVet} from "../../../Services";
import {ModalMsg, Spinner} from "../../Notifications";
import DialogConfirmation from "../../Notifications/DialogConfirmation";
import styles from "./styles";
import { CloudUploadOutlined } from '@material-ui/icons';

class AddDocForm extends Component {
  state = {
    formData: {
      email: "",
      password: "",
      dni: "",
      phone: "",
      name: "",
      last_name: "",
      id_role: 3,
      id_vet: this.props.location.state,
      image: "",
    },
    previewImage: null,
    imageSrc: null,
    showPassword: false,
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
      const {data} = await ApiVet.veterinaries.createDoc(request);
      if (data.success) {
        this.setState({
          ...state,
          isLoading: false,
          openMsg: true,
          hasMsg: data.msg,
          success: data.success,
        });
        const idVetToNavigate = this.props.location.state;
        setTimeout(() => {
          history.push(`/admin-vet/veterinary/${idVetToNavigate}`);
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
          "Se produjo un error al registar el médico, por favor verifique sus datos.",
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

  /**
   * Handle click show password form
   * @returns {void}
   */
  handleClickShowPassword = () => {
    const {state} = this;
    this.setState({...state, showPassword: !state.showPassword});
  };

  /**
   * Prevent mouse down
   * @param {Event} event
   * @returns {void}
   */
  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    const {classes} = this.props;
    const {
      formData,
      showPassword,
      openMsg,
      hasMsg,
      isLoading,
      success,
      previewImage,
    } = this.state;
    const {
      handleSubmit,
      handleOnChange,
      handleClickShowPassword,
      handleMouseDownPassword,
      handleInputFile,
    } = this;
    return (
      <ValidatorForm ref="form" onSubmit={handleSubmit}>
        <Paper className={classes.Paper}>
          <Typography
            className={classes.TitleForm}
            color="secondary"
            component="h3"
          >
            Ingresá los datos del Médico Veterinario
          </Typography>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              errorMessages={["Este campo es requerido."]}
              id="name"
              label="Ingrese nombre"
              margin="normal"
              name="name"
              validators={["required"]}
              value={formData.name}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              errorMessages={["Este campo es requerido."]}
              id="last_name"
              label="Ingrese apellido"
              margin="normal"
              name="last_name"
              validators={["required"]}
              value={formData.last_name}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              errorMessages={[
                "Este campo es requerido.",
                "El dni debe ser un número.",
                "Debe tener un minimo de 4 numeros",
                "Debe tener un máximo de 12 números.",
              ]}
              id="dni"
              label="DNI (Solo números)"
              margin="normal"
              name="dni"
              type="number"
              validators={[
                "required",
                "isNumber",
                "minStringLength:4",
                "maxStringLength:12",
              ]}
              value={formData.dni}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              errorMessages={[
                "Este campo es requerido.",
                "El dni debe ser un número.",
                "Debe tener un minimo de 8 numeros",
              ]}
              id="phone"
              label="Teléfono (Solo números)"
              margin="normal"
              name="phone"
              type="number"
              validators={["required", "isNumber", "minStringLength:8"]}
              value={formData.phone}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              errorMessages={[
                "Este campo es requerido.",
                "No es un email valido.",
              ]}
              id="email"
              label="Ingrese email"
              margin="normal"
              name="email"
              validators={["required", "isEmail"]}
              value={formData.email}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              errorMessages={[
                "La contraseña es requerida",
                "La contraseña debe tener un mínimo de 4 caracteres",
                "La contraseñá puede tener un máximo de 100 caracteres",
                "Solo se aceptan letras y numeros para la contraseñá, sin espacios.",
              ]}
              id="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment className={classes.Adorment} position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityOff color="secondary" />
                      ) : (
                        <Visibility color="secondary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Ingrese contraseña"
              margin="normal"
              name="password"
              type={showPassword ? "text" : "password"}
              validators={[
                "required",
                "minStringLength:4",
                "maxStringLength:100",
                "matchRegexp:^[A-Za-z0-9]+$",
              ]}
              value={formData.password}
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
            <DialogConfirmation
              text="Quedará asignado a ella y podrá atender pacientes"
              textButton="Agregar"
              title="¿Estás seguro de agregar este médico a tu veterinaria?"
              onClickConfirm={() => {
                handleSubmit();
              }}
            />
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
  withRouter(props => <AddDocForm {...props} />)
);
