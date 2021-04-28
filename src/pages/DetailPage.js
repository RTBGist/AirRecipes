import React, {useCallback, useEffect, useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useParams} from "react-router-dom";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import UnionEasy from "../assets/images/Union_easy.svg";
import UnionMedium from "../assets/images/Union_medium.svg";
import UnionHard from "../assets/images/Union_hard.svg";
import CaloriesIcon from "../assets/images/caloriesIcon.svg";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LanguageIcon from '@material-ui/icons/Language';
import ImageCarousel from "../components/ImageCarousel";
import {useHttp} from "../hooks/http.hook";


const recipeDifficult = (difficult) => {
  if(difficult.toLowerCase() === 'easy') {
    return UnionEasy
  }
  if(difficult.toLowerCase() === 'medium') {
    return UnionMedium
  }
  if(difficult.toLowerCase() === 'hard') {
    return UnionHard
  }
}

const useStyles = makeStyles({
  detailWrap: {
    paddingTop: '80px',
    paddingBottom: '96px',
    '& img': {
      display: 'block',
      maxWidth: '100%',
    },
    '& ul': {
      '& li': {
        color: '#000000',
        fontSize: '16px',
        lineHeight: '24px',
        marginBottom: '12px'
      }
    },
    detailList: {
      paddingLeft: '16px'
    }
  },
  detailDescripton: {
    marginBottom: '16px'
  },
  detailInfoIcn: {
    alignItems: 'center',
    display: 'flex',
    marginRight: '33px',
    marginBottom: '10px',
    '& img, & svg': {
      marginRight: '9px',
      color: '#C8C8C8'
    },
    '&.easy': {
      color: '#2FB65D'
    },
    '&.medium': {
      color: '#EB8A31'
    },
    '&.hard': {
      color: '#EB3C31'
    },
  },
  detailList: {
    margin: '0',
    padding: '0',
    listStyleType: 'none',
    marginTop: '17px',
    marginBottom: '30px',
    '& li': {
      position: 'relative',
    }
  },
  detailInfo: {
    marginBottom: '24px'
  },
  detailNumList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    marginTop: '17px',
    marginBottom: '30px',
    '& li': {
      display: 'flex'
    }
  },
  detailNumber: {
    border: '1px solid #DDDDDD',
    borderRadius: '50%',
    fontSize: '9px',
    color: '#000000',
    minWidth: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8px',
    position: 'relative',
    top: '3px'
  },
  detailImage: {
    '& img': {
      display: 'block',
      maxWidth: '100%',
      width: '100%'
    }
  }
});

const DetailPage = () => {
  const classes = useStyles();
  const recipeId = useParams().id;
  const [recipe, setRecipe] = useState(null);
  const {request} = useHttp();


  const getRecipe = useCallback( async () => {
    try {
      const fetched = await request(`https://test.kode-t.ru/detail_${recipeId}.json`);
      setRecipe(fetched.recipe)
    } catch (e) {
      console.log(e.message)
    }
  }, [recipeId, request])

  useEffect(() => {
    getRecipe()
  }, [request, getRecipe])

  if(!recipe) {
    return (
      <>Загрузка...</>
    )
  }

  return (
    <Grid container className={classes.detailWrap}>
      <Grid item xs={12} md={6}>

        <Typography variant="h2" gutterBottom>{recipe.title}</Typography>
        <Typography variant="body1" className={classes.detailDescripton}>{recipe.description}</Typography>

        <Grid className={classes.detailInfo} container alignItems="center">
          <Grid className={classes.detailInfoIcn + ` ${recipe.difficulty}`} item>
            <img src={recipeDifficult(recipe.difficulty)} alt="Union"/>
            {recipe.difficulty[0].toUpperCase() + recipe.difficulty.slice(1)}
          </Grid>
          <Grid className={classes.detailInfoIcn} item>
            <AccessTimeIcon />
            {`${(recipe.cookTime / 60) > 60 ? recipe.cookTime / 60 / 60 + ' hours' : recipe.cookTime / 60 + ' min'}`}
          </Grid>
          <Grid className={classes.detailInfoIcn} item>
            <img src={CaloriesIcon} alt="caloriesIcon"/>
            {`${recipe.caloricity} kCal`}
          </Grid>
          <Grid className={classes.detailInfoIcn} item>
            <LanguageIcon />
            {recipe.cuisine.title}
          </Grid>
        </Grid>


        <Typography variant="h3" gutterBottom>Ingredients</Typography>
        <ul className={classes.detailList}>
          {recipe.ingredients.length && recipe.ingredients.map((ing) => {
            return (
              <li key={ing}>• {ing}</li>
            )
          })}
        </ul>


        <Typography variant="h3" gutterBottom>Instructions</Typography>
        <ul className={classes.detailNumList}>
          {recipe.instructions.length && recipe.instructions.map((ins, i) => {
            return (
              <li key={ins}><span className={classes.detailNumber}>{i+1}</span> {ins}</li>
            )
          })}
        </ul>

      </Grid>
      <Grid item xs={12} md={6}>
        {recipe.images && recipe.images.length > 1 &&
          <ImageCarousel recipe={recipe} />
        }

        {recipe.images && recipe.images.length <= 1 &&
          <div className={classes.detailImage}>
            <img src={recipe.images[0]} alt="recipe"/>
          </div>
        }
      </Grid>
    </Grid>
  )
}

export default DetailPage;