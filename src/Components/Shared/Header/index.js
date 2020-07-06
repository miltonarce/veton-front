import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { AppContext } from "../../../Store";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Menu,
  MenuItem,
  Avatar,
} from "@material-ui/core";
import {
  Pets,
  AccountCircle,
  StoreOutlined,
  HomeOutlined,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import {URL_IMAGES} from "../../../Utils/globals";

const Header = ({ classes }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const dataUser = React.useContext(AppContext);
  const {user} = dataUser.auth;
  const userImage = user.image;

  return (
    <AppBar position="static">
      <nav>
        <Toolbar className={classes.Appbar}>
          <Container fixed className={classes.ContainerFlex}>
            <div className={classes.ContentLogo}>
              <Typography noWrap className={classes.Logo} variant="h1">
                Vet On
              </Typography>
            </div>
            <Link className={classes.ContentLink} to="/user">
              <HomeOutlined className={classes.Icons} />
              Inicio
            </Link>
            <Link className={classes.ContentLink} to="/user/appointments">
              <StoreOutlined className={classes.Icons} />
              Turnos
            </Link>
            <Link className={classes.ContentLink} to="/user/pets">
              <Pets className={classes.Icons} />
              Mascotas
            </Link>
            <div className={classes.ContentLink}>
              <div>
                {userImage
                  ? <Avatar 
                  alt={user.name + user.last_name} 
                  src={URL_IMAGES + user.image}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  />
                  : <AccountCircle
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  className={classes.ContentIcon}
                  onClick={handleClick}
                  />
                }
              </div>
              <Menu
                keepMounted
                anchorEl={anchorEl}
                id="simple-menu"
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link className={classes.ContentLink} to="/user/profile">
                  <MenuItem onClick={handleClose}>Perfil</MenuItem>
                </Link>
                <Link className={classes.ContentLink} to="/">
                  <MenuItem onClick={() => {
                    localStorage.clear();
                    handleClose();
                  }}>Salir</MenuItem>
                </Link>
              </Menu>
            </div>
            <div className={classes.ContentWelcome}>
              <p>Bienvenido/a:</p>
              <p className={classes.ContentUserData}>{user.email}</p>
            </div>
          </Container>
        </Toolbar>
      </nav>
    </AppBar>
  );
};

//Header.contextType = AppContext;

export default withStyles(styles)(withRouter(props => <Header {...props} />));


/*function UserProfile() {
  const album = React.useContext(AlbumOfTheWeek);
  React.useEffect(() => {
    if (album) {
      document.title = album.title;
    }
  }, [album]);
  return (
    <section>
      <h1>Hi I'm Osman and this is my album of the week:</h1>
      {album && (
        <dl>
          <dt>Title:</dt>
          <dd>{album.title}</dd>
          <dt>Artist:</dt>
          <dd>{album.artist}</dd>
          <dt>Genre:</dt>
          <dd>{album.genre}</dd>
        </dl>
      )}
    </section>
  );
}*/
