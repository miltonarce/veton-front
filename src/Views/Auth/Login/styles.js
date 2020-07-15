import {URL_IMAGES_ASSETS} from "../../../Utils/globals";

export default {
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
    ContentLogin: {
        ['@media (min-width: 600px)']: { 
        marginTop: "2rem",
        }
    },
    SpanError: {
        display: "flex",
        alignItems: "center",
    },
    Register: {
        marginTop: "1rem",
    },
    LinkReg: {
        marginTop: "2rem",
    },
    TitleForm: {
        fontWeight: 500,
        marginBottom: "1rem",
        textAlign: "center",
        fontSize: "2rem",
        ['@media (max-width: 600px)']: { 
            fontSize: "1rem"
          }
    },
    Cimg1: {
        maxHeight: "155px",
        ['@media (max-width: 960px)']: { 
            maxWidth: "50%",
        }
    },
    Cimg2: {
        maxHeight: "270px",
        ['@media (max-width: 960px)']: { 
            maxWidth: "70%",
        }
    },
    Fimg1:{
        textAlign: "center",
        margin: "0px 0px",
        marginBottom: "20px",
    },
    Fimg2:{
        textAlign: "center",
        margin: "0px 0px",
        ['@media (max-width: 600px)']: { 
            display: "none",
        }
    },
    contentPaper:{
        ['@media (max-width: 600px)']: { 
        padding: "2rem 0rem"
        },
        ['@media (min-width: 600px)']: { 
            padding: "4rem 0rem"
            }
    }
};