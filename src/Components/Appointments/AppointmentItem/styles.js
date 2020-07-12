import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    ctn: {
        margin: "8px 0",
    },
    paperTimeDescription: {
        padding: theme.spacing(3, 2),
        backgroundColor: "#FE3090",
        color: "#fff",
        borderRadius: "23px",
        height: "100%",
        userSelect: "none",
    },
    paperTimeDescriptionOff:{
        padding: theme.spacing(3, 2),
        backgroundColor: "#999999",
        color: "#fff",
        borderRadius: "23px",
        height: "100%",
        userSelect: "none",
    },  
    paperHourOrDate: {
        backgroundColor: "#fff",
        color: "#FE3090",
        padding: theme.spacing(3, 2),
        borderRadius: 0,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
    borderRadius:" 0px 23px 23px 0px"
    },
    paperHourOrDateOff:{
        backgroundColor: "#fff",
        color: "#999999",
        padding: theme.spacing(3, 2),
        borderRadius: 0,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
    borderRadius:" 0px 23px 23px 0px"
    },
    fontHour: {
        fontWeight: 800,
        userSelect: "none",
        fontSize: "16px",
    },
    reason: {
        fontSize: "14px",
    },
}));

export default useStyles;