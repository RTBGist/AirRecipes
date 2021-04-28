import React, {useEffect, useState} from 'react';
import {
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  FormGroup, Grid,
  makeStyles,
  Modal,
  Paper,
  Slider,
  Typography
} from "@material-ui/core";
import {initialState, setCuisineCaloricity} from "../reducers/filter.reducer";
import CloseIcon from '@material-ui/icons/Close';
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiSlider-root': {
      color: '#82786A',
      width: '100%'
    }
  },
  modalTitle: {
    marginBottom: '20px'
  },
  modalContent: {
    padding: '30px 31px 30px 31px',
    maxWidth: '440px',
    width: '100%',
    position: 'relative',
    outline: 'none'
  },
  modalClose: {
    position: 'absolute',
    right: '15px',
    top: '15px',
    cursor: 'pointer'
  },
  modalSliderWrap: {
    marginTop: '55px',
    marginBottom: '57px',
    '& .MuiFormControlLabel-root': {
      borderBottom: 0
    },
    '& .MuiTypography-root': {
      marginTop: '-3px'
    }
  },
  modalItem: {
    display: 'block',
    width: '100%',
    margin: 0,
    borderBottom: '1px solid rgba(33, 33, 33, 0.08)',
    paddingBottom: '3px',
    marginBottom: '2px',
  },
  modalShow: {
    background: '#82786A',
    color: '#ffffff',
    transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1), background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      color: '#000000'
    }
  },
  checkbox: {
    color: '#82786A',
    '&.MuiIconButton-colorSecondary:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    '&.MuiCheckbox-colorSecondary.Mui-checked': {
      color: '#82786A',
    }
  }
}));


const ModalForm = ({filterRecipes, setFilterRecipes, modalOpen, setModalOpen, getRecipes}) => {
  const classes = useStyles()
  const history = useHistory();
  const [showClearButton, setShowClearButton] = useState(false)
  const [localFilterRecipes, setLocalFilterRecipes] = useState({...filterRecipes})


  const handleSubmit = () => {
    setModalOpen(false)
    setFilterRecipes(setCuisineCaloricity(localFilterRecipes))
    history.push(`/`);
  }

  const handleClose = () => {
    setModalOpen(false)
    setLocalFilterRecipes({...filterRecipes})
  };

  const handleClear = () => {
    setLocalFilterRecipes({...initialState})
    setShowClearButton(false)
  }

  useEffect(() => {
    getRecipes()
  }, [filterRecipes.cuisine, filterRecipes.caloricity, getRecipes])


  const handleChange = (event, newValue) => {
    if(event.target.type === 'checkbox') {
      setLocalFilterRecipes({
        ...localFilterRecipes,
        cuisine: {
          ...localFilterRecipes.cuisine,
          [event.target.name]: event.target.checked
        }
      })

    } else {
      setLocalFilterRecipes({
        ...localFilterRecipes,
        caloricity: newValue
      })
    }
    setShowClearButton(true);
  };

  return (
    <Modal open={modalOpen}
           onClose={handleClose}
           className={classes.modal}
           aria-labelledby="simple-modal-title"
           aria-describedby="simple-modal-description">

      <Fade in={modalOpen}>
        <Paper className={classes.modalContent}>
          <CloseIcon onClick={handleClose} className={classes.modalClose}></CloseIcon>
          <Typography className={classes.modalTitle} variant="h3">Filter</Typography>

          {Object.keys(localFilterRecipes.cuisine).map((cuisine) => {
            return (
              <FormGroup row key={cuisine}>
                <FormControlLabel className={classes.modalItem}
                                  control={
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="body1">{cuisine[0].toUpperCase() + cuisine.slice(1)}</Typography>
                    </Grid>
                    <Grid item>
                      <Checkbox
                        checked={localFilterRecipes.cuisine[cuisine]}
                        className={classes.checkbox}
                        onChange={handleChange}
                        name={cuisine}
                      />
                    </Grid>
                  </Grid>

                }
                />
              </FormGroup>
            )
          })}


          <FormGroup row className={classes.modalSliderWrap}>
            <FormControlLabel className={classes.modalItem}
              control={
                <Grid container>
                  <Grid item xs={12}>
                    <Slider
                      min={100}
                      max={1200}
                      step={1}
                      value={localFilterRecipes.caloricity}
                      onChange={handleChange}
                      valueLabelDisplay="on"
                      aria-labelledby="range-slider"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">Calories, kCal</Typography>
                  </Grid>
                </Grid>
              }
            />
          </FormGroup>

          <Grid container justify="space-between">

            <Grid item>
              {showClearButton &&
              <Button onClick={handleClear} variant="outlined">Clear</Button>}
            </Grid>
            <Grid item><Button onClick={handleSubmit} className={classes.modalShow} variant="contained">Show recipes</Button></Grid>
          </Grid>

        </Paper>
      </Fade>
    </Modal>
  )
};

export default ModalForm;