import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {URL_IMAGES} from "../../../Utils/globals";
import { DialogConfirmation } from "../../Notifications";
import useStyles from "./styles";

const ItemUserDoctor = ({ name, last_name, email, image, onUserSelected }) => {
    const classes = useStyles();
    return (
    <ListItem button alignItems="center" >
        <ListItemAvatar>
            <Avatar
                alt={name}
                src={
                    image
                        ? `${URL_IMAGES}${image}`
                        : "https://via.placeholder.com/300x200"
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
        <DialogConfirmation
            text="Quedará asignado a ella y podrá atender pacientes"
            textButton="Agregar"
            title="¿Estás seguro de agregar este médico a tu veterinaria?"
            onClickConfirm={() => {
                {onUserSelected()};
            }}
          />
        <Divider component="li" variant="inset" />
    </ListItem>
    )
        };

export default ItemUserDoctor;