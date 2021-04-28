import React, {useEffect, useState} from 'react';
import {Button, FormControlLabel, Grid, Input, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Search as SearchIcon, Cancel} from '@material-ui/icons';
import {setSearchValue} from "../reducers/filter.reducer";
import headerBackground from '../assets/images/cover.jpg'
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
  headerContent: {
    backgroundImage: `url(${headerBackground})`,
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '150px',
    paddingBottom: '280px',
    ['@media (max-width:780px)']: {
      paddingTop: '45px',
      paddingBottom: '45px',
    }
  },
  descr: {
    color: '#82786A',
    marginBottom: '32px'
  },
  inputWrapper: {
    marginLeft: '0px',
    position: 'relative',
    border: '1px solid #DDDDDD',
    borderRadius: '28px',
    maxWidth: '276px',
    width: '100%',
    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    '&:focus, &:hover': {
      borderColor: '#A9A9A9'
    },
    ['@media (max-width:480px)']: {
      maxWidth: '180px',
    }
  },
  searchIcon: {
    color: '#A9A9A9',
    position: 'absolute',
    top: '15px',
    left: '15px',
  },
  searchClear: {
    fill: '#A9A9A9',
    color: '#ffffff',
    position: 'absolute',
    top: '19px',
    right: '19.5px',
    width: '16px',
    height: '16px'
  },
  search: {
    color: '#000000',
    fontSize: '16px',
    lineHeight: '24px',
    padding: '11px 35px',
    paddingLeft: '55px',
    paddingRight: '15px'
  },
  filterIcon: {
    border: '1px solid #DDDDDD',
    borderRadius: '28px',
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '0px',
    minWidth: '1px',
    marginLeft: '16px',
  },
  searchWrapper: {
    '& .MuiGrid-container': {
      paddingLeft: '0px',
      paddingRight: '0px',
    }
  }

});

const Header = ({filterRecipes, setFilterRecipes, getRecipes, setModalOpen}) => {
  const [clearClicked, setClearClicked] = useState(false);
  const [localSearchValue, setLocalSearchValue] = useState(filterRecipes.searchValue)
  const history = useHistory();
  const classes = useStyles();

  const changeHandler = (e) => {
    setLocalSearchValue(e.target.value)
  }

  const clearSearchValue = () => {
    setFilterRecipes(setSearchValue(''));
    setLocalSearchValue('');
    setClearClicked((prev) => !prev)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setFilterRecipes(setSearchValue(localSearchValue));
    history.push(`/`);
  }

  useEffect(() => {
    getRecipes();
  }, [clearClicked, filterRecipes.searchValue, getRecipes])




  return (
    <header className={classes.headerContent}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1">Air Recipes</Typography>
          <Typography variant="body1" className={classes.descr}>
            Best Recipes for Best People
          </Typography>
        </Grid>
        <Grid className={classes.searchWrapper} item xs={12}>
          <form  onSubmit={submitHandler} noValidate autoComplete="off">

            <Grid container>
              <Grid item >
                <FormControlLabel className={classes.inputWrapper} control={
                  <>
                    <SearchIcon className={classes.searchIcon} />
                    <Input
                      placeholder='Search'
                      disableUnderline={true}
                      className={classes.search}
                      value={localSearchValue}
                      onChange={changeHandler} />
                    {localSearchValue.trim() &&
                    <Cancel onClick={clearSearchValue} className={classes.searchClear} /> }
                  </>}>
                </FormControlLabel>
              </Grid>
              <Grid item>
                <Button className={classes.filterIcon} onClick={() => setModalOpen(true)}><FilterListIcon /></Button>
              </Grid>
            </Grid>


          </form>
        </Grid>
      </Grid>
    </header>

  )
}

export default Header;