import React, {Component}  from "react";
import PropTypes from "prop-types";
import {CardContent, Grid} from "@material-ui/core";
import DialogDoctorVetConfirmation from "../../Notifications/DialogDoctorVetConfirmation";
import {ModalMsg, Spinner} from "../../Notifications";
import {ApiVet} from "../../../Services";
import {
  CardDoc,
  CardDocMedia,
  ContentMedia,
  CardDocHeader,
  PinkTypo,
  TextTypo,
  CardPaper,
} from "./styles";
import {URL_IMAGES} from "../../../Utils/globals";

class CardDocVet extends Component {
  state = {
    previewImage: null,
    imageSrc: null,
    showPassword: false,
    isLoading: false,
    hasMsg: null,
    openMsg: false,
    success: false,
  };

  handleDeactivateDoctor = async () => {
    const {state} = this;
    const {id_user, id_veterinary } = this.props;
    const {onDoctorDeactivate} = this.props;
    const request = {
      id_user,
      id_veterinary,
    };

    try {
      this.setState({...state, isLoading: true});
      const {data} = await ApiVet.veterinaries.deactivateDoc(request);
      if (data.success) {
        this.setState({
          ...state,
          isLoading: false,
          openMsg: true,
          hasMsg: data.msg,
          success: data.success,
        });
        setTimeout(() => {
          this.setState({
            ...state,
            openMsg: false
          });
          onDoctorDeactivate();
        }, 1500);
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
    } catch (error) {
      this.setState({
        ...state,
        isLoading: false,
        hasMsg:
          "Se produjo un error al desactivar al médico, por favor verifique sus datos.",
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

  render() {
    const {name, last_name, image, email, dni, phone} = this.props;
    const {openMsg, hasMsg, isLoading, success} = this.state;
    const {handleDeactivateDoctor} = this;

    return (
      <CardDoc>
        <ContentMedia>
          <CardDocMedia
            alt={last_name}
            component="img"
            src={
              image
                ? `${URL_IMAGES}${image}`
                : "/assets/no-image.png"
            }
            title={`Doctor ${last_name}`}
          />
        </ContentMedia>
        <CardDocHeader
          subheader={email || "Sin dirección."}
          title={`${name} ${last_name ? last_name : ""}`}
        />
        <CardContent>
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="flex-start"
            spacing={3}
          >
            <Grid item xs={6}>
              <CardPaper>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="center"
                >
                  <Grid item xs={12}>
                    <PinkTypo color="secondary">DNI</PinkTypo>
                  </Grid>
                  <Grid item xs={12}>
                    <TextTypo>{dni || "Sin registro."}</TextTypo>
                  </Grid>
                </Grid>
              </CardPaper>
            </Grid>
            <Grid item xs={6}>
              <CardPaper>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="center"
                >
                  <Grid item xs={12}>
                    <PinkTypo color="secondary">Teléfono</PinkTypo>
                  </Grid>
                  <Grid item xs={12}>
                    <TextTypo>{phone || "Sin registro."}</TextTypo>
                  </Grid>
                </Grid>
              </CardPaper>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <DialogDoctorVetConfirmation
            text="Podés volver a activarlo en otro momento"
            title="¿Estás seguro de desactivar el médico de tu veterinaria?"
            onClickConfirm={() => {
              handleDeactivateDoctor();
            }}
          />
        </CardContent>
        {isLoading ? <Spinner /> : ""}
        {openMsg ? <ModalMsg msg={hasMsg} success={success} /> : ""}
      </CardDoc>
    );
  }
};

CardDocVet.propTypes = {
  name: PropTypes.string,
  last_name: PropTypes.string,
  image: PropTypes.string,
  email: PropTypes.string.isRequired,
};

export default CardDocVet;
