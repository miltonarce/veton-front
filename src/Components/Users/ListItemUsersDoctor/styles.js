import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: "#e8e8e8",
        color: "#212121",
        padding: 0,
        position: "absolute",
        border: "0 20px 0 20px",
        borderRadius: "0 20px",
        zIndex: 2,
        marginTop: "-1rem",
        marginLeft: "4rem"
    },
    inline: {
        display: "inline",
    },
}));

export default useStyles;