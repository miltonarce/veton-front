import React from "react";
import {
  CircularProgress,
  CssBaseline,
  Container,
  Grid,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ListPets } from "../../../Components/Pets";
import { AppointmentListWithDate } from "../../../Components/Appointments";
import { Api, ApiVet } from "../../../Services";
import { AppContext } from "../../../Store";
import styles from "./styles";
import ModalVets from "../../../Components/Notifications/ModalVets";


class HomeVet extends React.Component {
  state = {
    isLoading: false,
    petsByUser: [],
    userSelected: null,
    lastPetsAttended: [],
    isLoadingLastPets: true,
    veterinariesForUser: null,
    idVet: null,
  };

  // // If change prop userSelected, fetch again pets by the new user...
  // async componentDidUpdate(prevProps) {
    
  // }

  // Retrieve the last pets atendend by veterinary...
  async componentDidMount() {
    try {
      const {
        auth: { user },
        veterinary_id
      } = this.context;
      this.setState({ ...this.state, isLoadingLastPets: true });

        const {data: {success , veterinariesForUser}} = await ApiVet.veterinaries.fetchForUser(user.id_user);
        
        if(success){
          this.setState({
                ...this.state,
                veterinariesForUser
              });
        } else {
            this.setState({
              ...this.state,
              veterinariesForUser: [],
            });
          }

          if(veterinary_id){
 
            const {
            data: { success, pets },
          } = await Api.pets.lastPetsByVet(user.id_user, veterinary_id);
          if (success) {
            this.setState({
              ...this.state,
              isLoadingLastPets: false,
              lastPetsAttended: pets,
            });
          } else {
            this.setState({
              ...this.state,
              isLoadingLastPets: false,
              lastPetsAttended: [],
            });
          }
        }
    } catch (err) {
      console.error("err", err);
      this.setState({
        ...this.state,
        veterinariesForUser: [],
      });
    }
  }

 async  componentDidUpdate(prevProps, prevState){
  if (prevProps.userSelected !== this.props.userSelected) {
    await this.fetchPetsByUser(this.props.userSelected);
  }
   if(prevState.idVet !== this.state.idVet){
    try{
      const {
        auth: { user },
        veterinary_id
      } = this.context;
     if(veterinary_id){
 
        const {
        data: { success, pets },
      } = await Api.pets.lastPetsByVet(user.id_user, veterinary_id);
      if (success) {
        this.setState({
          ...this.state,
          isLoadingLastPets: false,
          lastPetsAttended: pets,
        });
      } else {
        this.setState({
          ...this.state,
          isLoadingLastPets: false,
          lastPetsAttended: [],
        });
      }
    }
    }catch (err) {
      console.error("err", err);
      this.setState({
        ...this.state,
        isLoadingLastPets: false,
        lastPetsAttended: [],
      });
    }
   }
   
    
  }

  /**
   * Method to fetch pets by user_id
   * @param {object} user
   * @returns {void}
   */
  fetchPetsByUser = async user => {
    try {
      this.setState({ ...this.state, isLoading: true, userSelected: user });
      const { data } = await Api.pets.fetch(user.id_user);
      this.setState({ ...this.state, petsByUser: data, isLoading: false });
    } catch (err) {
      this.setState({ ...this.state, petsByUser: [], isLoading: false });
    }
  };

  setVet = idVet => {
    const {setVeterinary} = this.context;
    this.setState({...this.state, idVet})
    setVeterinary(idVet);
  }


  render() {
    const {
      petsByUser,
      isLoading,
      userSelected,
      isLoadingLastPets,
      lastPetsAttended,
    } = this.state;
    const { classes } = this.props;
    const {
      auth: {
        user: { id_veterinary },
      },
      veterinary_id
    } = this.context;

    const {veterinariesForUser} = this.state;

console.log("jaja", lastPetsAttended)
    if(!veterinary_id){
      return (
        <>
          <CssBaseline />
        <Container fixed component="section">
          <ModalVets data={veterinariesForUser} onClickConfirm={this.setVet}/>
        </Container>
        </>
      )
    }


    return (
      <>
        <CssBaseline />
        <Container fixed component="section">
          <Grid container direction="row" justify="center" spacing={2}>
            <Grid item md={4} xs={12} component="aside">
              <AppointmentListWithDate idVet={id_veterinary} />
            </Grid>
            <Grid item md={8} xs={12} component="section">
              {isLoadingLastPets && (
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
              )}

              {!isLoadingLastPets &&
                lastPetsAttended.length > 0 &&
                !userSelected && (
                  <React.Fragment>
                    <h2 className={classes.title}>
                      Últimas consultas realizadas
                    </h2>{" "}
                    <ListPets pets={lastPetsAttended} />
                  </React.Fragment>
                )}
              {!isLoadingLastPets &&
                lastPetsAttended.length === 0 &&
                !userSelected && (
                  <p>No existen consultas registradas esta semana</p>
                )}
              {userSelected && (
                <div>
                  <h2 className={classes.title}>
                    Mascotas del usuario {userSelected.name}
                  </h2>
                  {isLoading && <Container fixed>
                  <Grid
                    container
                    alignItems="center"
                    className={classes.spinner}
                    direction="row"
                    justify="center"
                  >
                    <CircularProgress color="secondary" />
                  </Grid>
                </Container>}
                  {!isLoading && petsByUser.length > 0 && (
                    <ListPets pets={petsByUser} />
                  )}
                  {!isLoading && petsByUser.length === 0 && (
                    <p>No existen mascotas registradas</p>
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

// Add context to get all data from provider...
HomeVet.contextType = AppContext;

export default withStyles(styles)(HomeVet);
