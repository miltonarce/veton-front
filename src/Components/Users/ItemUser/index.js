import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {URL_IMAGES} from "../../../Utils/globals";

const ItemUser = ({ name, last_name, email, image, onUserSelected }) => (
    <ListItem button alignItems="flex-start" onClick={onUserSelected}>
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
        />
        <Divider component="li" variant="inset" />
    </ListItem>
);

export default ItemUser;