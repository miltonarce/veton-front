import { styled } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {  Grid  } from "@material-ui/core";

const styles = {
    TitleAppointment: {
        fontWeight: 500,
        marginBottom: "1rem",
        textAlign: "center",
    },
};

const AppointmentLink = styled(Link)({
    textDecoration: "none",
    ['@media (max-width: 960px)']: {
        marginTop: "2rem",
        marginBottom: "2rem"
     }
});

const ContentSpinner = styled(Grid)({
    paddingTop: "10rem",
    paddingBottom: "3rem"
});
export {
    styles,
    AppointmentLink,
    ContentSpinner
}