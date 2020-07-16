import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { AppContext } from "../../../../Store";
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
import {URL_IMAGES} from "../../../../Utils/globals";

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
            <Link className={classes.ContentLink} to="/admin-vet">
              <HomeOutlined className={classes.Icons} />
              Inicio
            </Link>
            <Link className={classes.ContentLink} to="/admin-vet/vetslist">
              <StoreOutlined className={classes.Icons} />
              Mis Veterinarias
            </Link>
            <div className={classes.ContentWelcome}>
              <p>Bienvenido/a:</p>
              <p className={classes.ContentUserData}>{user.email}</p>
            </div>
            <div className={classes.ContentLink}>
              <div>
                {userImage
                  ? <Avatar 
                  alt={user.name + user.last_name} 
                  src={URL_IMAGES + user.image}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={classes.ContentAvatar}
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
                <Link className={classes.ContentLinkMenu} to="/admin-vet/profile">
                  <MenuItem onClick={handleClose}>Perfil</MenuItem>
                </Link>
                <Link className={classes.ContentLinkMenu} to="/">
                  <MenuItem onClick={() => {
                    localStorage.clear();
                    handleClose();
                  }}>Salir</MenuItem>
                </Link>
              </Menu>
            </div>
          </Container>
        </Toolbar>
      </nav>
    </AppBar>
  );
};

export default withStyles(styles)(withRouter(props => <Header {...props} />));
