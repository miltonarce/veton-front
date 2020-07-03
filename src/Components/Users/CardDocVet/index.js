import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  CardContent,
  Grid,
} from "@material-ui/core";
import { AppContext } from "../../../Store";
import {
  CardDoc,
  CardDocMedia,
  ContentMedia,
  CardDocHeader,
  PinkTypo,
  TextTypo,
  CardPaper,
  DocLink,
  ButtonDetailsDoc
} from "./styles";

const CardDocVet = ({ name, last_name, image, email, dni, phone }) => {
  const {
    auth: { user },
  } = useContext(AppContext);

  return (
    <CardDoc>
      <ContentMedia>
        <CardDocMedia
          alt={last_name}
          component="img"
          src={
            image ? `http://localhost/veton/veton-back/public/imgs/${image}` : "/assets/no-image.png"
          }
          title={`Doctor ${last_name}`}
        />
      </ContentMedia>
      <CardDocHeader
        subheader={email || "Sin dirección."}
        title={`${name} ${last_name ? last_name : ''}`}
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
        <Grid container alignItems="center" direction="row" justify="center">
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={9}>
            <DocLink
              to={`admin-vet/veterinary/${name}`}
                >
              <ButtonDetailsDoc color="primary" variant="contained">
                DESACTIVAR
              </ButtonDetailsDoc>
            </DocLink>
          </Grid>
        </Grid>
      </CardContent>
    </CardDoc>
  );
};

CardDocVet.propTypes = {
  name: PropTypes.string,
  last_name: PropTypes.string,
  image: PropTypes.string,
  email: PropTypes.string.isRequired,
};

export default CardDocVet;
