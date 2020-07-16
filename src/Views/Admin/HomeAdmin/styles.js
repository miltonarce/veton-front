import { Link } from "react-router-dom";
import { styled } from "@material-ui/core/styles";

const VetLink = styled(Link)({
    textDecoration: "none",
});

const ContainerMain = styled("div")({
    marginTop: "1rem",
});

export {
    VetLink,
    ContainerMain,
    
};

export default {
    Paper: {
        borderRadius: "23px",
        padding: "1rem",
        minHeight: "488px"
    },
    title: {
        color: "#5C2299",
        fontSize: "2rem",
        padding: "12px",
        margin: "2rem 0",
    }
}