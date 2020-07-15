import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { AppContext } from "../../../Store";
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider
} from "@material-ui/core";
import {
  Pets,
  AccountCircle,
  StoreOutlined,
  HomeOutlined,
} from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import {URL_IMAGES} from "../../../Utils/globals";
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: "white"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#ff2e93",
    ['@media (min-width: 960px)']: { 
      display: 'none'
      }
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  listItem:{
    marginTop: "1.5rem",
  }
}));

const Header = ({ classes }) => {
  const classes2 = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const dataUser = React.useContext(AppContext);
  const {user} = dataUser.auth;
  const userImage = user.image;
 
  const [open, setOpen] = React.useState(false);

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <>
    <AppBar position="static">
      <nav>
        <Toolbar className={classes.Appbar}>
        <IconButton
            color="inherit"
            aria-label="open menu"
            onClick={handleOpenMenu}
            edge="start"
            className={clsx(classes2.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.ContentLogo}>
              <Typography noWrap className={classes.Logo} variant="h1">
                Vet On
              </Typography>
            </div>
          <Container fixed className={classes.ContainerFlex}>
          <div className={classes.ContentLogo}></div>
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
          </Container>
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
                <Link className={classes.ContentLinkMenu} to="/user/profile">
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
         
        </Toolbar>
      </nav>
    </AppBar>
    <Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="left"
    open={open}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.drawerHeader} style={{display: "flex", justifyContent: "flex-end"}}>
      <IconButton onClick={handleCloseMenu}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
    <Divider />
    <List>
        <ListItem button key={1} className={classes2.listItem}>
        <Link className={classes.ContentLink} to="/user" onClick={handleCloseMenu}>
              <HomeOutlined className={classes.Icons} />
              Inicio
            </Link>
        </ListItem>
        <ListItem button key={2} className={classes2.listItem} >
            <Link className={classes.ContentLink} to="/user/appointments" onClick={handleCloseMenu}>
              <StoreOutlined className={classes.Icons} />
              Turnos
            </Link>
            </ListItem>
            <ListItem button key={3} className={classes2.listItem} >
            <Link className={classes.ContentLink} to="/user/pets" onClick={handleCloseMenu}>
              <Pets className={classes.Icons} />
              Mascotas
            </Link>
            </ListItem>
    </List>
  </Drawer>
  </>
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
