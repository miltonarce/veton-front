import { makeStyles } from "@material-ui/core/styles";
import {URL_IMAGES_ASSETS} from "../../../Utils/globals";
const useStyles = makeStyles({
    Content: {
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        backgroundImage: `url('${URL_IMAGES_ASSETS}assets/pattern-veton.jpg')`,
        backgroundSize: "cover",
    },
    PaperLogin: {
        padding: "2rem",
        borderRadius: "23px",
    },
    TitleRegister: {
        padding: "1rem",
        textAlign: "center",
        fontSize: "2rem",
    },
    TitlesForm: {
        textAlign: "center",
        margin: "2rem",
        color: "#5c2299",
        fontWeight: 500,
    },
});


export default useStyles;