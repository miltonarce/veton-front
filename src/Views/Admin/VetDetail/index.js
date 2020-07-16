import React from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {Add} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {ApiAdminVet} from "../../../Services";
import {URL_IMAGES} from "../../../Utils/globals";
import ListDocsVets from "../../../Components/Users/ListDocsVets";
import {AppContext} from "../../../Store";
import TitlePages from "../../../Components/Shared/TitlePages";
import styles, {ContainerMain, DocLink} from "./styles";

class VetDetail extends React.Component {
  state = {
    dataVet: [],
    docsList: [],
    isLoading: true,
    error: null,
  };
  

  getInfo = async () => {
    const {match} = this.props;
    const {state} = this;
    try {
      const {data} = await ApiAdminVet.veterinary.fetch(match.params.id);
      console.log(data)
      this.setState({
        ...state,
        dataVet: data.veterinary,
        docsList: data.doctors,
        isLoading: false,
      });
    } catch (error) {
      this.setState({...state, isLoading: false, error: true});
    }
  }
  // Retrieve detail vet by id
  async componentDidMount() {
    this.getInfo();
  }

  formatter = new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  render() {
    const {classes} = this.props;
    const {dataVet, docsList, isLoading, error} = this.state;
    const id_vet = dataVet.id_veterinary;
    const {
       auth: {user},
    } = this.context;
    if (isLoading) {
      return (
        <Container fixed>
          <Grid
            container
            alignItems="center"
            className={classes.spinner}
            direction="row"
            justify="center"
          >
            <CircularProgress color="secondary" />
          </Grid>
        </Container>
      );
    }
    if (error) {
      return <p>Se produjo un error</p>;
    }
    return (
      <>
        <CssBaseline />
        <Container fixed component="section">
          <header>
            <TitlePages
              subtitle="Aquí podés ver los detalles de tu veterinaria incluyendo los médicos veterinarios que trabajan en ella."
              title="Detalle de tu Veterinaria"
            />
          </header>
          <Grid
            container
            alignItems="flex-start"
            direction="row"
            justify="center"
            spacing={3}
          >
            <Grid item className={classes.DatosVet} component="section" xs={12}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="space-between"
                spacing={3}
              >
                <Grid
                  item
                  className={classes.ContentCardVet}
                  component="article"
                  lg={8}
                  xs={12}
                >
                  <Paper className={classes.Paper}>
                    <Grid
                      container
                      alignItems="center"
                      direction="row"
                      justify="space-around"
                      spacing={3}
                    >
                      <Grid
                        item
                        className={classes.contenImage}
                        component="figure"
                        lg={3}
                        md={3}
                        xs={12}
                      >
                        <img
                          alt={dataVet.name}
                          className={classes.ImageVet}
                          src={
                            dataVet.image
                              ? `${URL_IMAGES}${dataVet.image}`
                              :  "/assets/no-image.png"
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        className={classes.Paper}
                        lg={6}
                        md={6}
                        xs={12}
                      >
                        <Grid
                          container
                          alignItems="center"
                          direction="row"
                          justify="flex-start"
                          spacing={3}
                        >
                          <Grid
                            item
                            className={classes.ContentCardText}
                            xs={12}
                          >
                            <Grid item xs={12}>
                              <Typography
                                className={classes.vetName}
                                component="h3"
                                variant="h3"
                              >{`${dataVet.business_name}`}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid
                                container
                                alignItems="center"
                                direction="row"
                                justify="flex-start"
                                spacing={3}
                              >
                                <Grid item xs={5}>
                                  <Grid item xs={12}>
                                    <Typography color="secondary" component="p">
                                      RAZON SOCIAL
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    {dataVet.business_name || "Sin registro."}
                                  </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                  <Grid item xs={12}>
                                    <Typography color="secondary" component="p">
                                      NOMBRE FANTASÍA
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    {dataVet.fantasy_name}
                                  </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                  <Grid item xs={12}>
                                    <Typography color="secondary" component="p">
                                      CUIT
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    {dataVet.cuit_cuil}
                                  </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                  <Grid item xs={12}>
                                    <Typography color="secondary" component="p">
                                      REGISTRADA EL DIA
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    {this.formatter.format(
                                      new Date(dataVet.created_at)
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid
                                container
                                alignItems="center"
                                direction="row"
                                justify="flex-start"
                                spacing={3}
                              >
                                <Grid item xs={5}>
                                  <Grid item xs={12}>
                                    <Typography color="secondary" component="p">
                                      DIRECCION
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    {dataVet.street}
                                  </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                  <Grid item xs={12}>
                                    <Typography color="secondary" component="p">
                                      ENTRE CALLES
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    {dataVet.between_streets}
                                  </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                  <Grid item xs={12}>
                                    <Typography color="secondary" component="p">
                                      TELEFONO 1
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    {dataVet.phone1}
                                  </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                  <Grid item xs={12}>
                                    <Typography color="secondary" component="p">
                                      TELEFONO 2
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    {dataVet.phone2}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item  xs={12}>
                                  <Grid
                                    container
                                    alignItems="center"
                                    direction="row"
                                    justify="flex-end"
                                  >
                                    <DocLink
                                      to={{
                                        pathname: `/admin-vet/edit-vet/${id_vet}`,
                                        state: id_vet,
                                      }}
                                    >
                                      <Button
                                        color="secondary"
                                        variant="contained"
                                      >
                                        EDITAR
                                      </Button>
                                    </DocLink>
                                  </Grid>
                                </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {docsList.length > 0 ? (
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="space-between"
              spacing={2}
            >
              <Grid item component="section" md={9} xl={9} xs={12}>
                <div>
                  <h2 className={classes.title}>
                    Médicos Veterinarios en {dataVet.fantasy_name}
                  </h2>
                </div>
              </Grid>
              <Grid item md={3} xs={12}>
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  justify="center"
                >
                  <DocLink
                    to={{
                      pathname: `/admin-vet/add-doc`,
                      state: id_vet,
                    }}
                  >
                    <Button
                      color="secondary"
                      endIcon={<Add />}
                      variant="contained"
                    >
                      Agregar médico
                    </Button>
                  </DocLink>
                </Grid>
              </Grid>
              <ContainerMain>
                <ListDocsVets doctors={docsList} id_vet={id_vet} onDoctorDeactivate={this.getInfo} />
              </ContainerMain>
            </Grid>
          ) : (
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="space-between"
              spacing={2}
            >
              <Grid item component="section" md={9} xl={9} xs={12}>
                <div>
                  <h2 className={classes.title}>
                    No hay Médicos Veterinarios registrados en{" "}
                    {dataVet.fantasy_name}
                  </h2>
                </div>
              </Grid>
              <Grid item md={3} xs={12}>
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  justify="center"
                >
                  <DocLink
                    to={{
                      pathname: `/admin-vet/add-doc`,
                      state: id_vet, 
                    }}
                  >
                    <Button
                      color="secondary"
                      endIcon={<Add />}
                      variant="contained"
                    >
                      Agregar médico
                    </Button>
                  </DocLink>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Container>
      </>
    );
  }
}

// Add context to get all data from provider...
VetDetail.contextType = AppContext;

export default withStyles(styles)(VetDetail);
