import React from "react";
import PropTypes from "prop-types";
import {Grid} from "@material-ui/core";
import CardDocVet from "../CardDocVet";
import {GridList, styles} from "./styles";

const ListDocsVets = ({doctors, id_vet, onDoctorDeactivate}) => {
  return (
    <Grid container alignItems="flex-start" direction="row" justify="flex-start" spacing={2} component="ol" style={styles}>
      {doctors.map((doctor, i) => (
        <GridList key={i} item lg={4} md={6} xl={4} xs={12} component="li">
          <Grid
            container
            alignItems="center"
            component="article"
            direction="row"
            justify="center"
          >
            <CardDocVet {...doctor} id_veterinary={id_vet} onDoctorDeactivate={onDoctorDeactivate} />
          </Grid>
        </GridList>
      ))}
    </Grid>
  );
};

ListDocsVets.propTypes = {
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      image: PropTypes.string
    })
  ),
};

export default ListDocsVets;
