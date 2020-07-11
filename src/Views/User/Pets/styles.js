import { Link } from "react-router-dom";
import { styled } from "@material-ui/core/styles";

const PetLink = styled(Link)({
    textDecoration: "none",
});

const ContainerMain = styled("div")({
    marginTop: "3rem",
});

const ContainerMain2 = styled("div")({
    marginTop: "8rem",
});

export {
    PetLink,
    ContainerMain,
    ContainerMain2
};