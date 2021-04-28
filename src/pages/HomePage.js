import React from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Recipe from "../components/Recipe";

const useStyles = makeStyles({
  homeWrapper: {
    paddingTop: '32px',
    paddingBottom: '72px'
  }
});

const HomePage = ({recipes}) => {
  const classes = useStyles();

  if(!recipes) {
    return (
      <>
        <Grid className={classes.homeWrapper} container>
          <Grid item xs={12}>Загрузка...</Grid>
        </Grid>
      </>
    )
  }

  if(!recipes.length) {
    return (
      <>
        <Grid className={classes.homeWrapper} container>
          <Grid item xs={12}>По вашему запросу ничего не найдено</Grid>
        </Grid>
      </>
    )
  }

  return (
    <>
      <Grid className={classes.homeWrapper} container spacing={2}>
        {recipes &&
          recipes.map((rec) => {
            return (
              <Recipe key={rec.id} rec={rec} />
            )
          })
        }
      </Grid>


    </>
  )
};

export default HomePage;