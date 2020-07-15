import React, {useState, useContext} from "react";
import { Container, Grid, CircularProgress} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { AppointmentForm } from "../../../Components/Appointments";
import { AppContext } from "../../../Store";
import { Api } from "../../../Services";
import TitlePages from "../../../Components/Shared/TitlePages";
import { withRouter } from "react-router-dom";
import styles from "./styles";
import { useSnackbar } from "notistack";

const AddAppointment = (props) => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: null,
    msg: null,
    openModal: false,
    errors: [],
  });
  const { auth: { user: {id_user} } } = useContext(AppContext);
   const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = async request => {
    
    const requestAppointment = { ...request, id_user };
    try {
      setState({ ...state, isLoading: true });
      const {
        data: { msg, success },
      } = await Api.appointments.register(requestAppointment);
      if (success) {
        enqueueSnackbar(msg, { variant: "success" });
       setState({
          ...state,
          hasError: null,
          msg,
        });
          props.history.push(`/user/appointments`);
      } else {
        enqueueSnackbar(msg, { variant: "error" });
        setState({
          ...state,
          isLoading: false,
          hasError: true,
          msg,
        });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const { errors } = err.response.data;
        enqueueSnackbar(errors, { variant: "error" });
        setState({ ...state, isLoading: false, errors });
      } else {
        enqueueSnackbar("Se produjo un error al reservar el turno", { variant: "error" });
        setState({
          ...state,
          isLoading: false,
          hasError: true,
          openModal: true,
          msg: "Se produjo un error al reservar el turno",
        });
      }
    }
  };
  const { isLoading, errors } = state;
    return (
      <Container fixed component="section">
        <TitlePages
          subtitle="Aquí podrás reservar un turno en cualquier veterinaria."
          title="Reserva de turnos"
        />
       {isLoading ?
        <Container fixed>
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  justify="center"
                  className={props.classes.ContentSpinner}
                >
                  <CircularProgress color="secondary" />
                </Grid>
              </Container> :  <AppointmentForm onSubmit={handleOnSubmit} errors={errors} /> } 
      </Container>
    );
}


export default withStyles(styles)(withRouter(props => <AddAppointment {...props} />));
