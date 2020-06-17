import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  CardContent,
  Grid,
} from "@material-ui/core";
import { AppContext } from "../../../Store";
import {
  CardPet,
  CardPetMedia,
  ContentMedia,
  CardPetHeader,
  PinkTypo,
  TextTypo,
  CardPaper,
  PetLink,
  ButtonDetailsPet
} from "./styles";

const Vet = ({ id_veterinary, business_name, last_name, image, cuit_cuil, phone1, street }) => {
  const {
    auth: { user },
  } = useContext(AppContext);

  return (
    <CardPet>
      <ContentMedia>
        <CardPetMedia
          alt={business_name}
          component="img"
          src={
            image ? `http://localhost/veton/veton-back/public/imgs/${image}` : "/assets/no-image.png"
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
            <PetLink
              to={`/${
                user.id_role === 3 ? "veterinary" : "user"
                }/pet/${id_veterinary}`}
            >
              <ButtonDetailsPet color="primary" variant="contained">
                VER DETALLES
              </ButtonDetailsPet>
            </PetLink>
          </Grid>
        </Grid>
      </CardContent>
    </CardPet>
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
