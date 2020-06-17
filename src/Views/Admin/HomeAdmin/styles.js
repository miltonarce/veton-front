import { Link } from "react-router-dom";
import { styled } from "@material-ui/core/styles";

const VetLink = styled(Link)({
    textDecoration: "none",
});

const ContainerMain = styled("div")({
    marginTop: "2rem",
});

export {
    VetLink,
    ContainerMain,
    
};

export default {
    title: {
        color: "#5C2299",
        paddingTop: "1rem",
        paddingBottom: "1rem",
    }
}