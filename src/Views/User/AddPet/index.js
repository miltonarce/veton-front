import React, {useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import {Container, CssBaseline, Grid, CircularProgress} from "@material-ui/core";
import {AddPetForm} from "../../../Components/Pets";
import {Api} from "../../../Services";
import TitlePages from "../../../Components/Shared/TitlePages";
import {ModalMsg, Spinner} from "../../../Components/Notifications";
import { useSnackbar } from "notistack";



const AddDoc = (props) => {

  const [value, setValue]= useState({
    hasMsg: null,
    openMsg: false,
    success: false,
    isLoading: false,
    breeds: [],
    types: [],
    statusPet: {},
    errors: [],
  });

  const { enqueueSnackbar } = useSnackbar();

  // Get breeds and type to populate form
  // Promise all to better solution
  useEffect(() => {
    try {
     const fetchInitData = async () => {
      const [breeds, types] = await Promise.all([
        Api.breeds.fetch(),
        Api.types.fetch(),
      ]);
      setValue({
        ...value,
        breeds: breeds.data,
        types: types.data,
        isLoading: false,
      });
     }
     fetchInitData();
    } catch (err) {
      setValue({...value, isLoading: false});
    }
  }, []);
   
 

  /**
   * Method to handle submit pet
   * @param {object} pet
   * @returns {void}
   */
  const handleOnSubmit = async pet => {
    const {history} = props;
    setValue({...value, isLoading: true});
    try {
      setValue({...value, isLoading: true});
      const {data} = await Api.pets.createPet(pet);
      if (data.success) {
        enqueueSnackbar(data.msg, { variant: "success" });
          history.push(`/user/pets`);
      } else {
        setValue({
          ...value,
          isLoading: false,
        });
        enqueueSnackbar(data.msg, { variant: "error" });
       
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const {errors} = err.response.data;
        setValue({...value, isLoading: false, errors});
      } else {
        setValue({
          ...value,
          isLoading: false,
        });
        enqueueSnackbar("Se produjo un error al registarse, por favor verifique sus datos.", { variant: "error" });
      }
    }
  };


    return (
      <>
        <CssBaseline />
        <Container fixed>
          <TitlePages
            subtitle=" Aquí podrás agrgar una nueva mascota, recordá completar los datos solicitados."
            title="Agregar nueva mascota"
          />
          <Grid container alignItems="center" direction="row" justify="center">
            <Grid item lg={7} xs={12}>
              {value.isLoading  ? 
               <Grid
               container
               direction="row"
               justify="center"
               alignItems="center"
              >
          <CircularProgress color="secondary" />
          </Grid>
               :
               <AddPetForm
                breeds={value.breeds}
                errors={value.errors}
                title="Ingrese los datos de la mascota Mascota"
                types={value.types}
                onSubmit={handleOnSubmit}
              />
            }
            </Grid>
          </Grid>
          {/* {openMsg ? <ModalMsg msg={hasMsg} success={success} /> : ""} */}
        </Container>
      </>
    );
              }
// Add router to handle history push go to other page...
export default withRouter(props => <AddDoc {...props} />);
