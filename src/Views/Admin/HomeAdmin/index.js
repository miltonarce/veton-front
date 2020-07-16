import React from "react";
import {Container, Grid, CircularProgress, Paper} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import PercentageConsultation  from "../../../Components/Consultations/PercentageConsultation";
import TitlePages from "../../../Components/Shared/TitlePages";
import {AppContext} from "../../../Store";
import {ApiAdminVet} from "../../../Services";
import styles from "./styles";

class HomeAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      statistics: [],
    };
  }

  async componentDidMount() {
    try {
      this.setState({...this.state, isLoading: true});
      const {
        auth: {user},
      } = this.context;
      const {data} = await ApiAdminVet.consultations.fetch(user.id_user);
       if (data.success) {
        let result = [];

        data.data.map(v => {
          let c = result.find(r => r.name === v.Veterinaria);
          if (c) {
           let newResult = result.filter(e => c.name !== e.name);
            result = newResult;
            c.data.push(v.Cant);
            result = result.concat(c)
          } else {
            result = [...result, {name: v.Veterinaria, data: [v.Cant]}];
          }
        });

        this.setState({...this.state, statistics: result, isLoading: false});
      } else {
        this.setState({...this.state, statistics: []});
      }
    } catch (err) {
      this.setState({...this.state, statistics: []});
    }
  }

  render() {
    const {statistics, isLoading} = this.state;
    const {classes} = this.props;
    const {
      auth: {user},
    } = this.context;
    return (
      <>
        <Container
          fixed
          component="section"
          style={{padingTop: "20px !important"}}
        >
          <TitlePages
            subtitle="Aquí podrás encontrar la cantidad de consultas por mes de tus veterinarias"
            title="Inicio"
          />
          <Paper className={classes.Paper}>
            <Grid
              container
              className={classes.paddingTop}
              direction="row"
              justify="center"
              spacing={2}
              style={{marginTop: "3rem"}}
            >
              <Grid item md={9} xs={12}>
                {isLoading ? <Container fixed>
                    <Grid
                      container
                      alignItems="center"
                      direction="row"
                      justify="center"
                    >
                      <CircularProgress color="secondary" />
                    </Grid>
                  </Container>
                : statistics.length > 0 ? 
                  <PercentageConsultation series={statistics} />
                : 
                  <section className={classes.marginNot}>
                    <p>No hay consultas registradas para mostrar estadisticas.</p>
                  </section>
                }
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </>
    );
  }
}

// Add context to get all data from provider...
HomeAdmin.contextType = AppContext;

export default withStyles(styles)(HomeAdmin);

