import {CardContent, CardMedia, Chip, Grid, Paper, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
  media: {
    height: 196,
    position: 'relative'
  },
  paper: {
    height: '100%',
    overflow: 'hidden',
  },
  chipItems: {
    position: 'absolute',
    padding: '16px',
    bottom: '0px',
    width: '100%',
  },
  card: {
    marginBottom: '8px',
    '& a': {
      textDecoration: 'none'
    }
  },
  content: {
    paddingTop: '24px'
  },
  chipItem: {
    marginLeft: '8px',
    '& .MuiChip-root': {
      color: '#000000',
      fontSize: '12px',
      backgroundColor: '#ffffff'
    }
  }
});

const Recipe = ({rec}) => {
  const classes = useStyles();

  return (
    <Grid className={classes.card} item xs={12} sm={6} md={4}>
      <Link to={`/detail/${rec.id}`}>
        <Paper className={classes.paper}>
          <CardMedia
            className={classes.media}
            image={rec.thumbnail}
            title="Paella dish"
          >
            <Grid container className={classes.chipItems} justify="flex-end">
              <Grid className={classes.chipItem} item>
                <Chip label={`${(rec.cookTime / 60) > 60 ? rec.cookTime / 60 / 60 + ' hours' : rec.cookTime / 60 + ' min'}`} />
              </Grid>
              <Grid className={classes.chipItem} item>
                <Chip label={`${rec.caloricity} kCal`} />
              </Grid>
              <Grid className={classes.chipItem} item>
                <Chip label={`${rec.cuisine.title}`} />
              </Grid>
            </Grid>
          </CardMedia>
          <CardContent className={classes.content}>
            <Typography variant="h3" gutterBottom>{rec.title}</Typography>
            <Typography variant="body1">{rec.description.length > 147 ? rec.description.slice(0, 147) + '...' : rec.description}</Typography>
          </CardContent>
        </Paper>
      </Link>
    </Grid>
  )
}

export default Recipe;
