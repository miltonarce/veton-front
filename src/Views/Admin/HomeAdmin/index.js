import React from "react";
import {
  CircularProgress,
  CssBaseline,
  Container,
  Grid,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import  ListVets   from "../../../Components/Veterinaries/ListVets";
import { ApiAdminVet } from "../../../Services";
import { AppContext } from "../../../Store";
import { Spinner } from "../../../Components/Notifications";
import styles from "./styles";
import  {ContainerMain } from "./styles";

class HomeAdmin extends React.Component {
  state = {
    vetsList: []
  };

  async componentDidMount () {
    const {
      auth: {user},
    } = this.context;

    try {
      const data = await ApiAdminVet.veterinaries.fetch(user.id_user);
      console.log(data)
      if (data.status === 200) {
        this.setState({...this.state, vetsList: data.data.veterinary});
      }else {
       console.log("Algo salio mal, vuelva a intentar", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*constructor(props) {
    super(props);
    this.state = {
      vetsList: [],
    };
  }

  async componentDidMount() {
    try {
      this.setState({ ...this.state });
      const {
        auth: { user },
      } = this.context;
      const data = await ApiAdminVet.veterinaries.fetch(user.id_user);
      if (data.success) {
        this.setState({...this.state, vetsList: data.data.veterinary});
      } else {
        this.setState({ ...this.state, vetsList: [] });
      }
    } catch (err) {
      this.setState({ ...this.state, vetsList: [] });
    }
  }*/
 
  render() {
    const {vetsList} = this.state;
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />
        <Container fixed component="section">
          <Grid container direction="row" justify="center" spacing={2}>
            <Grid item md={8} xl={9} xs={12} component="section">
            <div>
            <h2 className={classes.title}>
              Listados de Veterinarias
            </h2>
            </div>
            <div>{vetsList.length > 0 ? (
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
HomeAdmin.contextType = AppContext;

export default withStyles(styles)(HomeAdmin);