import React, { useState, useEffect } from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { Badge } from "@material-ui/core";
import { Api } from "../../../Services";
import "moment/locale/es";
import { makeStyles } from "@material-ui/core/styles";

moment.locale("es");

const useStyles =  makeStyles(() => ({
  Badge:{
    '& span': {
      fontSize: '10px'
    }
  }
}));

const AppointmentDatePickerUser = ({ idUser }) => {
  const [date, changeDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const classes = useStyles();
  /**
   * Fetch all appointments by the user to show in Datepicker
   * @returns {Promise<void>}
   */
  const getAppointmentsByUser = async () => {
    const {
      data: { data, success },
    } = await Api.appointments.fetchByUserFuture(idUser);
    if (success) {
      const appointmentsDates = data.map(appointment => appointment.date);
      setAppointments(appointmentsDates);
    }
  };

  useEffect(() => {
    getAppointmentsByUser();
    // eslint-disable-next-line
  }, []);

  return (
    <MuiPickersUtilsProvider libInstance={moment} locale="es" utils={MomentUtils} >
      <DatePicker autoOk value={date} variant="static" onChange={changeDate} style={{width: "200px"}} renderDay={(day, _selectedDate, _isInCurrentMonth, dayComponent) => {
        const dateDatepicker = moment(day).format("YYYY-MM-DD");
        const isAppointmentForUser = appointments.includes(dateDatepicker);
        if (isAppointmentForUser) {
          return (
            <Link to="/user/appointments">
              <Badge badgeContent="Turno" className={classes.Badge} color="secondary" style={{ backgroundColor: "#ddd", borderRadius: "80%"}}>
                {dayComponent}
              </Badge>
            </Link>
          );
        }
        return <Badge>{dayComponent}</Badge>;
      }}
      />
    </MuiPickersUtilsProvider>
  );
};

AppointmentDatePickerUser.propTypes = {
  idUser: PropTypes.number.isRequired,
};

export default AppointmentDatePickerUser;
