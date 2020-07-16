import React from "react";
import {withRouter} from "react-router-dom";
import { CircularProgress, TextField, Container, Grid } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import ListItemUsersDoctor from "../ListItemUsersDoctor";
import { ApiVet }  from "../../../Services";
import styles from "./styles";

class AutocompleteDoctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      docsListWorking: [],
      showListUsers: false,
      loading: false,
      hasMsg: null,
      openMsg: false,
      success: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleUserSelected = this.handleUserSelected.bind(this);
  }

  async componentDidMount() {
      const {idVet} = this.props;
      const {state} = this;
      try {
        const {data} = await ApiVet.users.doctorVetAlreadyWorking(idVet);
        this.setState({
          ...state,
          docsListWorking: data.doctors,
          isLoading: false,
        });
      } catch (error) {
        this.setState({...state, isLoading: false, error: true});
      }

}

  /**
   * Method to handle when change value to fetch new users by input
   * @param {Event} event
   * @returns {void}
   */
  async handleOnChange(event) {
    const { value } = event.target;
    if (value.length >= 1) {
      try {
        this.setState({ ...this.state, loading: true });
        
        const {data} = await ApiVet.users.autocompleteDoctor(value);
        if(data.length > 0){

          const dataUser = data.map(u => {
            if (this.state.docsListWorking.some(d => d.dni === u.dni)){
              return {...u ,working: "yes"};
            }else{
              return {...u ,working: "no"};
            }
          });

          this.setState({...this.state, users: dataUser, loading: false});

      }else{
        this.setState({ ...this.state, users: [], loading: false });
      }
      } catch (err) {
        this.setState({ ...this.state, users: [], loading: false });
      }
    } else {
      this.setState({ ...this.state, users: [], });
    }
  }

  /**
   * Method to handle when user click any item in list, call callback to parent...
   * @param {object} user
   * @returns {void}
   */
  handleUserSelected = async (user) => {
    const {history} = this.props;
    const idUser = user.id_user;
    const {idVet} = this.props;
    const request = {
      idUser,
      idVet,
    };
    // this.setState({...this.state, loading: true, user: []});
    try {
     this.setState({...this.state, loading: true});
      const {data} = await ApiVet.veterinaries.createDocBySearch(request);
      if (data.success) {
        this.setState({
          ...this.state,
          loading: false,
          openMsg: true,
          hasMsg: data.msg,
          success: data.success,
        });
        const idVetToNavigate = this.props.idVet;
        setTimeout(() => {
          history.push(`/admin-vet/veterinary/${idVetToNavigate}`);
        }, 1000);
      } else {
        this.setState({
          ...this.state,
          loading: false,
          hasMsg: data.msg,
          openMsg: true,
          success: data.success,
        });
        setTimeout(() => {
          this.setState({
            ...this.state,
            openMsg: false,
          });
        }, 3000);
      }
    } catch (err) {
      this.setState({
        ...this.state,
        loading: false,
        hasMsg:
          "Se produjo un error al agregar al médico.",
        openMsg: true,
      });
      setTimeout(() => {
        this.setState({
          ...this.state,
          openMsg: false,
        });
      }, 3000);
    }
  };

  /**
   * Handle event input to add preview image in form
   * @param {Event} event
   * @returns {void}
   */
  handleInputFile = event => {
    if (event.target.files.length > 0) {
      const [imagePath] = event.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(imagePath);
      reader.onloadend = () =>
        this.setState({
          ...this.state,
          previewImage: reader.result,
          imageSrc: imagePath,
        });
    } else {
      this.setState({...this.state, previewImage: null, imageSrc: null});
    }
    //const idUser = user.id_user
    //const idVet = this.props.idVet
    //console.log(idUser)
    //console.log(idVet)
    //this.props.onUserSelected(user);
    //this.setState({ ...this.state, users: [] });
  }

  render() {
    const {
      state: { users, loading },
      handleOnChange,
      handleFocus,
      handleUserSelected,
      props: { placeholder },
    } = this;
    const { classes } = this.props;
    return (
      <>
        <TextField
          fullWidth
          required
          id="autocomplete_veton"
          className={classes.Search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined color="primary"/>
              </InputAdornment>
            ),
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="start">
              {loading && (
                <Container fixed>
                  <Grid
                    container
                    alignItems="center"
                    className={classes.spinner}
                    direction="row"
                    justify="center"
                  >
                    <CircularProgress color="secondary" size={20}/>
                  </Grid>
                </Container>
              )}
              </InputAdornment>
            )
          }}
          placeholder={placeholder}
          onBlur={handleFocus}
          onChange={handleOnChange}
          onFocus={handleFocus}
        />
        <label htmlFor="autocomplete_veton" style={{visibility: "hidden"}} />
        
        <ListItemUsersDoctor users={users} onUserSelected={handleUserSelected} />
      </>
    );
  }
}

//export default withStyles(styles)(AutocompleteDoctor);

export default withStyles(styles)(
  withRouter(props => <AutocompleteDoctor {...props} />)
);
