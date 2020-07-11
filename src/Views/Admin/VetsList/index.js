import React from "react";
import {CssBaseline, Container, Grid, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {Add} from "@material-ui/icons";
import ListVets from "../../../Components/Veterinaries/ListVets";
import {ApiAdminVet} from "../../../Services";
import {AppContext} from "../../../Store";
import {Spinner} from "../../../Components/Notifications";
import styles, {ContainerMain, VetLink} from "./styles";

class VetsList extends React.Component {
  state = {
    vetsList: [],
  };

  async componentDidMount() {
    const {
      auth: {user},
    } = this.context;

    try {
      const data = await ApiAdminVet.veterinaries.fetch(user.id_user);
      if (data.status === 200) {
        this.setState({...this.state, vetsList: data.data.veterinary});
      }else {
        console.log("Algo salio mal, vuelva a intentar", {variant: "error"});
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {vetsList} = this.state;
    const {classes} = this.props;
    const {
      auth: {user},
    } = this.context;
    return (
      <>
        <CssBaseline />
        <Container fixed component="section">
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="space-between"
            spacing={2}
          >
            <Grid item component="section" md={9} xl={9} xs={12}>
              <div>
                <h2 className={classes.title}>Listado de tus Veterinarias</h2>
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="center"
              >
                <VetLink
                  to={{
                    pathname: `/admin-vet/add-vet`,
                    state: user.id_user,
                  }}
                >
                  <Button
                    color="secondary"
                    endIcon={<Add />}
                    variant="contained"
                  >
                    Agregar Veterinaria
                  </Button>
                </VetLink>
              </Grid>
            </Grid>
            <Grid item component="section" md={12} xl={9} xs={12}>
              <div>
                {vetsList.length > 0 ? (
                  <ContainerMain>
                    <ListVets vets={vetsList} />
                  </ContainerMain>
                ) : (
                  <ContainerMain>
                    <Spinner />
                  </ContainerMain>
                )}
              </div>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

// Add context to get all data from provider...
VetsList.contextType = AppContext;

export default withStyles(styles)(VetsList);
