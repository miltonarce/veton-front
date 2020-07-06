import { styled } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const ContainerMain = styled("div")({
    marginTop: "2rem",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
});

const DocLink = styled(Link)({
    textDecoration: "none",
});

export {ContainerMain, DocLink};

export default {
    root: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        borderRadius: "23px",
        padding: "2rem",
        minHeight: "400px",
    },
    ContainerTypo: {
        marginTop: "1rem",
        marginBottom: "1rem",
        fontSize: "2rem",
        color: "#5c2299",
        fontWeight: 600,
    },
    Paper: {
        borderRadius: "23px",
        padding: "1rem",
    },
    PaperMedic: {
        background: "#5c2299",
        borderRadius: "23px",
    },
    ContentCardVet: {
        marginTop: ".5rem",
    },
    contenImage: {
        position: "relative",
        textAlign: "center",
    },
    ImageVet: {
        top: "-0.7rem",
        width: "250px",
        height: "250px",
        boxShadow: "0px 3px 11px 5px rgba(0, 0, 0, 0.16)",
        borderRadius: "123px",
        left: "2rem",
    },
    vetName: {
        color: "#4E4E4E",
        fontSize: "1.87rem",
        fontWeight: 600,
        marginBottom: "1rem",
    },
    ContentCardText: {
        paddingTop: 0,
        "& p, h3, div": {
            overflow: "visible",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
        },
    },
    DatosVet: {
        marginTop: "1rem",
    },
    divRel: {
        width: "100%",
        height: "47px",
    },
    ContentLink: {
        textDecoration: "none",
    },
    title: {
        color: "#5C2299",
        fontSize: "2rem",
        padding: "12px",
        margin: "2rem 0",
    },
    noHistory: {
        fontSize: "2rem",
        color: "#CDCDCD",
        textAlign: "center",
        marginTop: "2rem",
    },
    ups: {
        maxWidth: "400px",
        display: "block",
        margin: "0 auto",
    },
    button: {
        paddingLeft: "20px",
        paddingRight: "20px",
    },
    spinner: {
        marginTop: "200px",
    },
    comment: {
        wordBreak: "break-all",
    },
};