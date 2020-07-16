import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Grid, TextField, Button, InputLabel, MenuItem, Select } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { InvalidField } from "../../Notifications";
import styles from "./styles";

class ConsultationForm extends React.Component {
  state = {
    form: {
      comments: "",
      id_user: null,
      afflictions_procedures: "",
      id_vaccine: "16",
      id_dewormer: "8",
    },
  };

  componentDidMount() {
    const { props } = this;
    const { form } = this.state;
    this.setState({
      form: { ...form, id_user: props.user.id_user },
    });
  }

  /**
   * Handle submit event, call callback parent
   * @param {Event} event
   * @returns {void}
   */
  handleOnSubmit = event => {
    const { props, state } = this;
    event.preventDefault();
    props.onSubmit(state.form);
    console.log(state.form)
  };

  /**
   * Method to check handle on change in form inputs
   * @param {Event} event
   * @returns {void}
   */
  handleOnChange = event => {
    const { state } = this;
    const { name, value } = event.target;
    this.setState({ form: { ...state.form, [name]: value } });
  };

  render() {
    const { title, classes, errors,  vaccinesData, dewormersData } = this.props;
    const {
      form: { comments, afflictions_procedures, id_vaccine, id_dewormer },
    } = this.state;
    const { handleOnSubmit, handleOnChange } = this;

    return (
      <>
        <Paper className={classes.Paper}>
          <Typography
            className={classes.TitleForm}
            color="secondary"
            component="h3"
          >
            {title}
          </Typography>
          <form onSubmit={handleOnSubmit}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="comments"
                label="Comentarios"
                margin="normal"
                name="comments"
                type="text"
                value={comments}
                onChange={handleOnChange}
              />
              <InvalidField errors={errors} field="comments" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="afflictions_procedures"
                label="Aflicciones"
                margin="normal"
                name="afflictions_procedures"
                type="text"
                value={afflictions_procedures}
                onChange={handleOnChange}
              />
              <InvalidField errors={errors} field="afflictions_procedures" />
            </Grid>
            <Grid item xs={12} className={classes.GridButton}>
            <InputLabel id="vaccines">Vacunas</InputLabel>
                <Select
                  labelId="vaccines"
                  id="id_vaccine"
                  value={id_vaccine}
                  name="id_vaccine"
                  className={classes.Select}
                  onChange={handleOnChange}
                >
                  {vaccinesData.map(v =>  <MenuItem key={v.id_vaccine} value={v.id_vaccine}>{v.name}</MenuItem>)}
                </Select>
            </Grid>
            <Grid item xs={12} className={classes.GridButton}>
            <InputLabel id="dewormers">Desparasitantes</InputLabel>
                <Select
                  labelId="dewormers"
                  id="id_dewormer"
                  value={id_dewormer}
                  name="id_dewormer"
                  className={classes.Select}
                  onChange={handleOnChange}
                >
                  {dewormersData.map(d =>  <MenuItem key={d.id_dewormer} value={d.id_dewormer}>{d.name}</MenuItem>)}
                </Select>
            </Grid>
            <Grid item className={classes.GridButton} xs={12}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="space-around"
              >
                <Grid item xs={5}>
                  <span>(*) Datos obligatorios.</span>
                </Grid>
                <Grid item xs={3}>
                  <Button color="primary" type="submit" variant="contained">
                    AGREGAR
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </>
    );
  }
}

ConsultationForm.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(ConsultationForm);
