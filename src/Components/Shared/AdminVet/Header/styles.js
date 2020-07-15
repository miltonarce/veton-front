import {URL_IMAGES_ASSETS} from "../../../../Utils/globals";

export default {
    Appbar: {
        background: "white",
    },
    Logo: {
        width: "121px",
        height: "42px",
        backgroundImage: `url('${URL_IMAGES_ASSETS}assets/Logo.png')`,
        fontSize: 0,
    },
    ContentLogo: { flexGrow: 1 },
    ButtonLogout: {
        color: "#999999",
    },
    ContentLink: {
        marginRight: "2rem",
        textDecoration: "none",
        cursor: "pointer",
        color: "#999999",
        "&:hover": {
            color: "#5c2299",
            transition: ".5s",
        },
    fontSize: "1rem",
    textTransform: "uppercase",
    fontWeight: "700",
    display: "flex",
    alignItems: "center"
    },
    ContentLinkMenu: {
        textDecoration: "none",
        color: "#999999",
        "&:hover": {
            color: "#5c2299",
            transition: ".5s",
        },
    },
    ContentWelcome:{
        color: "#999999",
        display: "flex",
        marginRight: "1rem",
        marginLeft: "3rem",
        fontSize: ".8rem",
        flexDirection: "column",
        alignItems: "center",
        "& p:first-child":{
            margin: 0
        }
    },
    ContentUserData:{
        color: "#5c2299",
        fontSize: ".8rem",
        margin: 0
    },
    ContentIcon: { marginRight: ".5rem", cursor: "pointer" },
    ContainerFlex: {
        display: "flex",
        position: "relative",
        alignItems: "center",
    },
    Icons: {
        verticalAlign: "text-bottom",
        marginRight: "10px",
    },
    ContentAvatar:{
        border: "1.5px solid #FF2E93",
        padding: "3px",
        "& img": {
            borderRadius: "50%"
        }
    }
};