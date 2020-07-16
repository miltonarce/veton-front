import React from "react";
import {Route} from "react-router-dom";
import {CssBaseline} from "@material-ui/core";
import {styled} from "@material-ui/core/styles";

// Admin Veterinary all Views
import HomeAdmin from "./HomeAdmin";
import VetsList from "./VetsList";
import VetDetail from "./VetDetail";
import AddDoc from "./AddDoc";
import AddVet from "./AddVet";
import EditVet from "./EditVet";
import Header from "../../Components/Shared/AdminVet/Header";
import Footer from "../../Components/Shared/Footer";
import Profile from "./Profile";
import {URL_IMAGES_ASSETS} from "../../Utils/globals";

const ContentMain = styled("div")({
  width: "100%",
  top: "0",
  bottom: "0",
  position: "absolute",
  height: "100vh",
  overflowX: "hidden",
  backgroundImage: `url('${URL_IMAGES_ASSETS}assets/pattern-veton2.png')`,
  backgroundSize: "cover",
});

const ContainerMain = styled("main")({
  height: "auto",
  minHeight: "-webkit-fill-available",
});

class Admin extends React.Component {
  state = {
    userSelected: null,
  };

  /**
   * Method to handle when user select any user from autocomplete component
   * @param {object} userSelected
   * @returns {void}
   */
  handleOnUserSelected = userSelected =>
    this.setState({ ...this.state, userSelected });

  render() {
    const {
      props: {match},
      handleOnUserSelected,
      state: {userSelected},
    } = this;
    return (
      <ContentMain>
        <CssBaseline />
        <Header onUserSelected={handleOnUserSelected} />
        <ContainerMain>
          <Route
            exact
            path={match.path}
            render={() => <HomeAdmin userSelected={userSelected} />}
          />
          <Route component={VetsList} path={`${match.path}/vetslist`} />
          <Route component={VetDetail} path={`${match.path}/veterinary/:id`} />
          <Route component={Profile} path={`${match.path}/profile`} />
          <Route component={AddDoc} path={`${match.path}/add-doc`} />
          <Route component={AddVet} path={`${match.path}/add-vet`} />
          <Route component={EditVet} path={`${match.path}/edit-vet/:id`} />
          </ContainerMain>
        <Footer />
      </ContentMain>
    );
  }
}

export default Admin;
