import React from "react";
import { Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";
import {URL_IMAGES} from "../../../Utils/globals";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const History = ({ dataHistory, user }) => {
  const classes = useStyles();
  const [, setValues] = React.useState({
    id_History: dataHistory.id_history,
    created_at: dataHistory.created_at,
    updated_at: dataHistory.updated_at,
    afflictions_procedures: dataHistory.afflictions_procedures,
    comments: dataHistory.comments,
    hasDisabled: user.id_role !== 3,
  });

  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    if (user.id_role === 3) {
      setValues({ hasDisabled: false });
    }

    for(const prop in dataHistory){
      console.log(prop)
      if('image_1' == prop){
        setImages(images => [...images, {
          original: `${URL_IMAGES}historiesimages/${dataHistory[prop]}`,
          thumbnail: `${URL_IMAGES}historiesimages/${dataHistory[prop]}`}]);
      }
      if('image_2' == prop){
        setImages(images => [...images, {
          original: `${URL_IMAGES}historiesimages/${dataHistory[prop]}`,
          thumbnail: `${URL_IMAGES}historiesimages/${dataHistory[prop]}`}]);
      }
      if('image_3' == prop){
        setImages(images => [...images, {
          original: `${URL_IMAGES}historiesimages/${dataHistory[prop]}`,
          thumbnail: `${URL_IMAGES}historiesimages/${dataHistory[prop]}`}]);
      }
      if('image_4' == prop){
        setImages(images => [...images, {
          original: `${URL_IMAGES}historiesimages/${dataHistory[prop]}`,
          thumbnail: `${URL_IMAGES}historiesimages/${dataHistory[prop]}`}]);
      }
      if('image_5' == prop){
        setImages(images => [...images, {
          original: `${URL_IMAGES}historiesimages/${dataHistory[prop]}`,
          thumbnail: `${URL_IMAGES}historiesimages/${dataHistory[prop]}`}]);
      }
   
    }
    
  }, [dataHistory]);

  const formatter = new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });


  console.log(user);
  return (
    <Grid container alignItems="center" direction="row" justify="space-between">
      <Grid item xs={8}>
        <Grid item className={classes.Paper} xs={12}>
          <Grid item className={classes.ContentCardText} xs={12}>
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="flex-start"
              >
                <Grid item xs={3}>
                  <Grid item xs={12}>
                    <Typography color="secondary" component="p">
                      HISTORIA N°
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <p>{dataHistory.id_history}</p>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid item xs={12}>
                    <Typography color="secondary" component="p">
                      INICIO HISTORIA CLÍNICA
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <p>{formatter.format(new Date(dataHistory.created_at))}</p>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid item xs={12}>
                    <Typography color="secondary" component="p">
                      ÚLTIMA ACTUALIZACIÓN
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <p>{formatter.format(new Date(dataHistory.updated_at))}</p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.dense} xs={12}>
              <Grid
                container
                alignItems="flex-start"
                direction="row"
                justify="flex-start"
              >
                <Grid item xs={5}>
                  <Grid item xs={12}>
                    <Typography color="secondary" component="p">
                      AFLICCIONES
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <p>{dataHistory.afflictions_procedures}</p>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid item xs={12}>
                    <Typography color="secondary" component="p">
                      OBSERVACIONES
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <p>{dataHistory.comments}</p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid item xs={12}>
          <Grid container alignItems="center" direction="row" justify="center">
            <Typography color="secondary" component="p">
              IMAGENES GENERALES DE HISTORIA
            </Typography>
          </Grid>
        </Grid>
        <Grid item className={classes.rowImg} xs={12}>
          <Grid container alignItems="center" direction="row" justify="center">
            {images.length > 0 ?
            <ImageGallery items={images} /> :<img
              alt="No hay imágenes cargadas todavía."
              className={classes.hisImg}
              src="/assets/no-image.png"
            /> }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default History;
