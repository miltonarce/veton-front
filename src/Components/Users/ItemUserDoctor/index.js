import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {URL_IMAGES} from "../../../Utils/globals";
import { DialogConfirmation } from "../../Notifications";
import useStyles from "./styles";

const ItemUserDoctor = ({ name, last_name, email, image, onUserSelected, working }) => {
    const classes = useStyles();
    return (
    <ListItem button alignItems="center" >
        <ListItemAvatar>
            <Avatar
                alt={name}
                src={
                    image
                        ? `${URL_IMAGES}${image}`
                        :  "/assets/no-image.png"
                }
            />
        </ListItemAvatar>
        <ListItemText
            primary={
                name && last_name ? `${last_name}, ${name}` : "Sin nombre registrado."
            }
            secondary={email}
            className={classes.root}
        />
        {working === 'no' && (
        <DialogConfirmation
            text="Quedará asignado a ella y podrá atender pacientes"
            textButton="Agregar"
            title="¿Estás seguro de agregar este médico a tu veterinaria?"
            onClickConfirm={() => {
                {onUserSelected()};
            }}
          />
        )}
        {working === 'yes' && (
        <Grid container alignItems="flex-start" justify="center" direction="row">
            <Button color="primary" size="medium" variant="disabled">
                AGREGADO
            </Button>
        </Grid>
        )}        
        <Divider component="li" variant="inset" />
    </ListItem>
    )
};

export default ItemUserDoctor;