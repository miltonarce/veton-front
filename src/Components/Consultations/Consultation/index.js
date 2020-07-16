import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import ModalConsultation from "../ModalConsultation";
import useStyles from "./styles";

const Consultation = ({ dataConsultation, user }) => {
  console.log("consulta", dataConsultation)
  const classes = useStyles();
  const [values, setValues] = React.useState({
    id_consultation: dataConsultation.id_consultation,
    id_user: user.id_user,
    id_history: dataConsultation.id_history,
    created_at: dataConsultation.created_at,
    updated_at: dataConsultation.updated_at,
    afflictions_procedures: dataConsultation.afflictions_procedures,
    comments: dataConsultation.comments,
    hasError: null,
    hasDisabled: user.id_role !== 3,
    openModal: false,
  });

  React.useEffect(() => {
    if (user.id_role === 3) {
      setValues({
        hasDisabled: false,
        afflictions_procedures: dataConsultation.afflictions_procedures,
        comments: dataConsultation.comments,
      });
    }
    // eslint-disable-next-line
  }, []);

  /***
   * Handle action open modal state
   * @returns {void}
   */
  const handleOpenModal = () => {
    setValues({ ...values, openModal: !values.openModal });
  };

  const formatter = new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  
  return (
    <>
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={user.id_role === 3 ? 10 : 12}>
          <div className={classes.consultList} onClick={handleOpenModal}>
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="center"
            >
              <Grid item className={classes.centerElements} xs={4}>
                <span>
                  N° {dataConsultation.id_consultation} -- {formatter.format(new Date(dataConsultation.created_at))}
                 </span>
              </Grid>
              <Grid item className={classes.centerElements} xs={4}>
               {dataConsultation.id_vaccine ? <Check /> : <Close />} 
              </Grid>
              <Grid item className={classes.centerElements} xs={4}>
              {dataConsultation.id_dewormer ? <Check /> : <Close />} 
              </Grid>
            </Grid>
          </div>
        </Grid>
        {user.id_role === 3 && user.id_user == dataConsultation.id_user ? (
          <Grid item xs={2}>
            <Link
              className={classes.ContentLink}
              to={`/veterinary/edit-consultation/${dataConsultation.id_consultation}`}
            >
              <Button
                className={classes.button}
                color="primary"
                size="small"
                type="submit"
                variant="contained"
              >
                Editar
              </Button>
            </Link>
          </Grid>
        ) : (
            ""
          )}
      </Grid>
      <ModalConsultation
        close={handleOpenModal}
        data={dataConsultation}
        open={values.openModal}
      />
    </>
  );
};

Consultation.propTypes = {
  dataConsultation: PropTypes.shape({}),
  user: PropTypes.shape({})
};

export default Consultation;
