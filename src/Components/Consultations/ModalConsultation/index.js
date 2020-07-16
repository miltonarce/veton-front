import React, { useEffect } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Tabs,
  Tab,
  Typography,
  Grid,
} from "@material-ui/core";
import { AssignmentOutlined, ColorizeOutlined, BugReportOutlined } from "@material-ui/icons";
import TabPanel from "../TabPanel";
import useStyles from "./styles";
import {ApiVet} from "../../../Services";

const ModalConsultation = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [extras, setExtras] = React.useState({
    vac: [],
    dew: [],
  });
  const { data } = props;
  useEffect(()=> {
  
      const getExtras = async () => {
        try {
          const {data: dew} = await ApiVet.dewormers.fetch();
          const {data: vac} = await ApiVet.vaccines.fetch();
          if(dew.success && vac.success){
            setExtras({
              dew: dew.dewormers,
              vac: vac.vaccines,
            })
          }
      }catch (error) {
        console.log(error);
      }
    } 
    getExtras();
  },[]);
  const handleChange = (event, newValue) => setValue(newValue);

  console.log("STATE", extras);
  return (
    <Modal
      closeAfterTransition
      aria-describedby="transition-modal-consultation"
      aria-labelledby="transition-modal-consultation-detail"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
      open={props.open}
      onClose={props.close}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <Tabs
            centered
            className={classes.tabs}
            indicatorColor="primary"
            textColor="primary"
            value={value}
            onChange={handleChange}
          >
            <Tab aria-label="Consultation" icon={<AssignmentOutlined />} />
            <Tab aria-label="Vacunas" icon={<ColorizeOutlined />} />
            <Tab aria-label="Desparasitantes" icon={<BugReportOutlined />} />
          </Tabs>
          {/*CONSULTATION */}
          <TabPanel index={0} value={value}>
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="center"
            >
              <Grid item xs={12}>
                <h4 className={classes.title}>
                  DATOS GENERALES DE LA CONSULTA
                </h4>
              </Grid>
              <Grid item className={classes.filas} xs={12}>
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={12} md={4}>
                    <Grid item xs={12}>
                      <Typography color="secondary" component="p">
                        #ID CONSULTA
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>{data.id_consultation}</Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Grid item xs={12}>
                      <Typography color="secondary" component="p">
                        FECHA DE CONSULTA
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>{data.created_at}</Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Grid item xs={12}>
                      <Typography color="secondary" component="p">
                        ULTIMA ACTUALIZACIÓN
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>{data.updated_at}</Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.filas} xs={12}>
                <Grid item xs={12}>
                  <Typography color="secondary" component="p">
                    AFLICCIONES
                  </Typography>
                </Grid>
                <Grid item xs={12}>{data.afflictions_procedures}</Grid>
              </Grid>
              <Grid item className={classes.filas} xs={12}>
                <Grid item xs={12}>
                  <Typography color="secondary" component="p">
                    COMENTARIOS
                  </Typography>
                </Grid>
                <Grid item xs={12}>{data.comments}</Grid>
              </Grid>
            </Grid>
          </TabPanel>
       
          {/*Vacunas */}
          <TabPanel index={1} value={value}>
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="center"
            >
              <Grid item xs={12}>
                <h4 className={classes.title}>
                  VACUNA APLICADAS
                </h4>
              </Grid>
              <Grid item className={classes.filas} xs={12}>
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={12} md={12}>
                    <Grid item xs={12}>
                      <Typography color="secondary" component="p">
                        NOMBRE VACUNA
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>{data.id_vaccine && extras.vac.length > 0 ? extras.vac.map((v, i) => {
                      if(v.id_vaccine === data.id_vaccine){
                      return (<p key={`v-${i}`}>{v.name}</p>);
                      }
                    }) : "No aplicada"}</Grid>
                  </Grid>
                  </Grid>
              </Grid>
              </Grid>
          </TabPanel>
       
         {/*desparazitantes */}
         <TabPanel index={2} value={value}>
         <Grid
              container
              alignItems="center"
              direction="row"
              justify="center"
            >
              <Grid item xs={12}>
                <h4 className={classes.title}>
                  DESPARASITANTES APLICADOS
                </h4>
              </Grid>
              <Grid item className={classes.filas} xs={12}>
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={12} md={12}>
                    <Grid item xs={12}>
                      <Typography color="secondary" component="p">
                        NOMBRE DESPARASITANTE
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>{data.id_dewormer && extras.vac.length > 0 ? extras.vac.map((d, i) => {
                      if(d.id_dewormer === data.id_dewormer){
                      return (<p key={`d-${i}`}>{d.name}</p>);
                      }
                    }) : "No aplicado"}</Grid>
                  </Grid>
                  </Grid>
              </Grid>
              </Grid>
          </TabPanel>
      
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalConsultation;
