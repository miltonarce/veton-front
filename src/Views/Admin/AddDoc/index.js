import React from "react";
import {withRouter} from "react-router-dom";
import {Container, CssBaseline, Grid} from "@material-ui/core";
import AddDocForm from "../../../Components/Users/AddDocForm";
import TitlePages from "../../../Components/Shared/TitlePages";

class AddDoc extends React.Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Container fixed>
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
