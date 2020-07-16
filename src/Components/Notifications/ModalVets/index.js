import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import {URL_IMAGES} from "../../../Utils/globals";
import {
    CircularProgress,
    Container,
    Grid
  } from "@material-ui/core";

const useStyles =  makeStyles(() => ({
  cardVet:{
      border: "2px solid #ff2e93",
      borderStyle: "dashed",
      borderRadius: "8px",
      margin: "1rem",
      padding: ".5rem",
      cursor: "pointer",
    '& span': {
      fontSize: '10px'
    }
  },
  ImageVet: {
    top: "-0.7rem",
    width: "80px",
    height: "80px",
    boxShadow: "0px 3px 11px 5px rgba(0, 0, 0, 0.16)",
    borderRadius: "123px",
    left: "2rem",
},
title:{
    color:"#5c2299"
},
nameVet:{
    color: "black",
    margin: 0,
    textAlign: "center"
},
streetVet:{
    fontSize: "12px",
    margin: 0,
    textAlign: "center"
},
contentVets:{
    display: "flex",
    flexDirection:" row",
    justifyContent: "center",
    alignItems: "center"
},
noVets: {
  textAlign: "center"
},
Close:{
  textAlign: "center"
}
}));


const ModalVets = ({  onClickConfirm, data }) => {
    const classes = useStyles();
  const handleClose = () => window.location.reload();
  
    return (
            <Dialog open={true}>
                <DialogTitle className={classes.title}>¿En que veterinaria deseas trabajar hoy?</DialogTitle>
                <DialogContent>
                    <DialogContentText> {
                    data ?
                    data.length > 0 ?
                    (<><Grid container direction="column" justify="center"  spacing={2}><div className={classes.contentVets}> {data.map(v => (
                      
                    <Grid item xs={12}>
                    <div className={classes.cardVet} onClick={() => onClickConfirm(v.id_veterinary)}>
                            <figure>
                                <img  className={classes.ImageVet} src={
                            v.image
                              ? `${URL_IMAGES}${v.image}`
                              :  "/assets/no-image.png"
                          } alt={v.business_name} />
                            </figure>
                        <p className={classes.nameVet}>{v.fantasy_name}</p>
                        <p className={classes.streetVet}>En <em>{v.street}</em></p>
                            </div>
                            </Grid>
                            ))}</div>
                            </Grid>
                            <div className={classes.Close}><Button type="button" color="Primary" onClick={() => {localStorage.clear();handleClose();}}>Salir</Button></div></>) :
                           (
                             <>
                            <p className={classes.noVets}>Aún no  cuenta con veterinarias asignadas</p>
                            <div className={classes.Close}><Button type="button" color="Primary" onClick={() => {localStorage.clear();handleClose();}}>Salir</Button></div></>
                           ) : (
                            <Container fixed>
                            <Grid
                              container
                              alignItems="center"
                              direction="row"
                              justify="center"
                            >
                              <CircularProgress color="secondary" />

                            </Grid>
                          </Container>
                           )}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
    );
}

export default ModalVets;