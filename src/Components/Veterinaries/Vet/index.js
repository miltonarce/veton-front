import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  CardContent,
  Grid,
} from "@material-ui/core";
import { AppContext } from "../../../Store";
import {
  CardVet,
  CardVetMedia,
  ContentMedia,
  CardPetHeader,
  PinkTypo,
  TextTypo,
  CardPaper,
  VetLink,
  ButtonDetailsVet
} from "./styles";
import {URL_IMAGES} from "../../../Utils/globals";

const Vet = ({ id_veterinary, business_name, last_name, image, cuit_cuil, phone1, street, approved }) => {
  const {
    auth: { user },
  } = useContext(AppContext);

  return (
    <CardVet>
      <ContentMedia>
        <CardVetMedia
          alt={business_name}
          component="img"
          src={
            image ? `${URL_IMAGES}${image}` : "/assets/no-image.png"
          }
          title={`Veterinaria ${business_name}`}
        />
      </ContentMedia>
      <CardPetHeader
        subheader={street || "Sin dirección."}
        title={`${business_name} ${last_name ? last_name : ''}`}
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
                  <PinkTypo color="secondary">CUIT</PinkTypo>
                </Grid>
                <Grid item xs={12}>
                  <TextTypo>{cuit_cuil || "Sin registro."}</TextTypo>
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
                  <TextTypo>{phone1 || "Sin registro."}</TextTypo>
                </Grid>
              </Grid>
            </CardPaper>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Grid container alignItems="center" direction="row" justify="center">
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={9}>
            {approved
              ? <ButtonDetailsVet variant="contained" disabled>
                  EN APROBACION
                </ButtonDetailsVet>
              : 
                <VetLink
                  to={`veterinary/${id_veterinary}`}
                >
                  <ButtonDetailsVet color="primary" variant="contained">
                    VER DETALLES
                  </ButtonDetailsVet>
                </VetLink>
            }
          </Grid>
        </Grid>
      </CardContent>
    </CardVet>
  );
};

Vet.propTypes = {
  id_veterinary: PropTypes.number.isRequired,
  business_name: PropTypes.string.isRequired,
  //last_name: PropTypes.string,
  image: PropTypes.string,
  cuit_cuil: PropTypes.number.isRequired,
  phone1: PropTypes.number.isRequired,
  street: PropTypes.string.isRequired,
};

export default Vet;
