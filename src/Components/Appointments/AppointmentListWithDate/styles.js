import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    title: {
        color: "rgb(254, 48, 144)",
        textAlign: "center",
        marginTop: "31px",
        marginBottom: "26px"
    },
    icons: {
        color: "#fff",
    },
    icons2: {
        color: "#fff",
        fontSize: "14px",
        fontWeight: 600,
        borderRadius: "8px",
        padding: ".1rem 1rem",
    },
    listHours: {
        padding: "10px",
        borderRadius: "0 0 18px 18px",
        backgroundColor: "#fff",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    ctnDateSelection: {
        padding: "10px",
        backgroundColor: "rgb(254, 48, 144)",
        borderRadius: "18px 18px 0 0",
        textAlign: "center",
        fontWeight: 600,
        fontSize: "18px",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
    },
    date: {
        fontSize: "14px",
    },
    datePicker: {
        position: "absolute",
        marginTop: "3.6rem",
        marginLeft: "2rem",
        zIndex: 99
    }
}));

export default useStyles;