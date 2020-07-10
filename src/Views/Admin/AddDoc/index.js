import React from "react";
import {withRouter} from "react-router-dom";
import {Container, CssBaseline, Grid} from "@material-ui/core";
import AddDocForm from "../../../Components/Users/AddDocForm";
import AutocompleteDoctor from "../../../Components/Users/AutocompleteDoctor";
import TitlePages from "../../../Components/Shared/TitlePages";

class AddDoc extends React.Component {
  render() {
    const idVet = this.props.location.state;
    return (
      <>
        <CssBaseline />
        <Container fixed>
          <TitlePages
            subtitle=" Quedará asignado a tu veterinaria "
            title="Podés buscar un médico que ya esté registrado en Vet On..."
          />
          <Grid container alignItems="center" direction="row" justify="center">
            <Grid item lg={7} xs={12}>
              <AutocompleteDoctor placeholder="Buscar médicos" idVet={idVet} />
            </Grid>
          </Grid>
          <TitlePages
            subtitle=" Recordá completar los datos solicitados."
            title="... O podés agregar uno nuevo!"
          />
          <Grid container alignItems="center" direction="row" justify="center">
            <Grid item lg={7} xs={12}>
              <AddDocForm />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

// Add router to handle history push go to other page...
export default withRouter(props => <AddDoc {...props} />);
