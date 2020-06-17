import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Vet from "../Vet";
import { GridList, styles } from "./styles";

const ListVets = ({ vets }) => {
  return (
    <Grid container alignItems="flex-start" direction="row" justify="flex-start" spacing={2} component="ol" style={styles}>
      {vets.map((vet, i) => (
        <GridList key={i} item lg={4} md={6} xl={4} xs={12} component="li">
          <Grid container alignItems="center" direction="row" justify="center" component="article">
            <Vet {...vet} />
          </Grid>
        </GridList>
      ))}
    </Grid>
  );
}

ListVets.propTypes = {
  vets: PropTypes.arrayOf(
    PropTypes.shape({
      business_name: PropTypes.string,
      image: PropTypes.string
    })
  ),
};

export default ListVets;