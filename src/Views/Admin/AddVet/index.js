import React from "react";
import {withRouter} from "react-router-dom";
import {Container, CssBaseline, Grid} from "@material-ui/core";
import AddVetForm from "../../../Components/Veterinaries/AddVetForm";
import TitlePages from "../../../Components/Shared/TitlePages";

class AddVet extends React.Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Container fixed>
          <TitlePages
            subtitle=" Recordá completar los datos solicitados."
            title="Registrá una nueva veterinaria"
          />
          <Grid container alignItems="center" direction="row" justify="center">
            <Grid item lg={7} xs={12}>
              <AddVetForm />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

// Add router to handle history push go to other page...
export default withRouter(props => <AddVet {...props} />);
