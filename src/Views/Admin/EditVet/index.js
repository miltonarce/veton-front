import React from "react";
import {withRouter} from "react-router-dom";
import {Container, CssBaseline, Grid} from "@material-ui/core";
import EditVetForm from "../../../Components/Veterinaries/EditVetForm";
import TitlePages from "../../../Components/Shared/TitlePages";

class EditVet extends React.Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Container fixed>
          <TitlePages
            subtitle=" Recordá completar los datos solicitados."
            title="Editá tu veterinaria"
          />
          <Grid container alignItems="center" direction="row" justify="center">
            <Grid item lg={7} xs={12}>
              <EditVetForm />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

// Add router to handle history push go to other page...
export default withRouter(props => <EditVet {...props} />);
