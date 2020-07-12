import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Grid,
  CssBaseline,
  CircularProgress,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ConsultationForm } from "../../../Components/Consultations";
import { ApiVet, Api } from "../../../Services";
import TitlePages from "../../../Components/Shared/TitlePages";
import { AppContext } from "../../../Store";

const AddConsultation = props => {
  const [values, setValues] = useState({
    isLoading: false,
    errors: [],
    vaccines: [],
    dewormers: [],
  });

  /**
   * Hook para componentDidUpdate
   */
  useEffect(  () => {
    setValues({ ...values, isLoading: true });
    try {
      async function fetchMedicines() {
      const vaccines = await ApiVet.vaccines.fetch();
      const dewormers = await ApiVet.dewormers.fetch();
  
      if(vaccines.data.success && dewormers.data.success){
        setValues({ ...values, vaccines: vaccines.data.vaccines , dewormers: dewormers.data.dewormers, isLoading: false });
      }else{
        enqueueSnackbar("Algo salio mal, vuelva a intentar", { variant: "error" });
        setValues({ ...values, isLoading: false });
      }
    }
     fetchMedicines();
    } catch (err) {
      if (err.response && err.response.data) {
        const { errors } = err.response.data;
        setValues({ ...values, errors });
      }
    }
  }, []);
  /**
   * Hook para context
   */
  const {
    auth: { user },
  } = useContext(AppContext);

  /**
   * Hook para notificaciones
   */
  const { enqueueSnackbar } = useSnackbar();
  /**
   * Method to handle submit from form, create new consultation
   * @param {object} request
   * @returns {void}
   */
  const handleOnSubmit = async request => {
    console.log(props);

    try {
      setValues({ ...values, isLoading: true });
      const { data } = await ApiVet.consultations.create(
        props.match.params.idHistory,
        request
      );
      if (data.success) {
        enqueueSnackbar(data.msg, { variant: "success" });
        setValues({ isLoading: true });
        setTimeout(() => {
          props.history.goBack();
        }, 3000);
      } else {
        enqueueSnackbar(data.msg, { variant: "error" });
        setValues({ isLoading: false });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const { errors } = err.response.data;
        setValues({ ...values, errors });
      }
    }
  };


  return (
    <>
      <CssBaseline />
      <Container fixed>
        <TitlePages
          subtitle=" Aquí podrás agregar una nueva consulta a la mascota."
          title="Agregar nueva consulta"
        />
        <Grid container alignItems="center" direction="row" justify="center">
          <Grid item xs={12} md={7}>
            {values.isLoading ? (
              <Container fixed>
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  justify="center"
                >
                  <CircularProgress color="secondary" />
                </Grid>
              </Container>
            ) : (
                <ConsultationForm
                  title="Registrar Consulta"
                  user={user}
                  onSubmit={handleOnSubmit}
                  vaccinesData={values.vaccines}
                  dewormersData={values.dewormers}
                  errors={values.errors}
                />
              )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddConsultation;
