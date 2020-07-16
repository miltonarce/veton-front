import React from "react";
import List from "@material-ui/core/List";
import ItemUserDoctor from "../ItemUserDoctor";
import useStyles from "./styles";

const ListItemUsersDoctor = ({ users, onUserSelected }) => {
  const classes = useStyles();
  console.log("LIST", users);
  return (
    <List className={classes.root} component="nav">
      {users.map((user, index) => (
        <ItemUserDoctor
          {...user}
          key={index}
          onUserSelected={() => onUserSelected(user)}
        />
      ))}
    </List>
  );
}

export default ListItemUsersDoctor;