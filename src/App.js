import React, {useCallback, useEffect, useReducer, useState} from 'react';
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import ModalForm from "./components/ModalForm";
import {recipesFilter} from "./utils/recipesFilter";
import {CssBaseline} from "@material-ui/core";
import {filterReducer, initialState} from "./reducers/filter.reducer";
import DetailPage from "./pages/DetailPage";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {useHttp} from "./hooks/http.hook";


const App = () => {
  const [recipes, setRecipes] = useState(null);
  const [filterRecipes, setFilterRecipes] = useReducer(filterReducer, initialState)
  const [modalOpen, setModalOpen] = useState(false);
  const {request} = useHttp();

  const getList = useCallback( async ()=> {
    try {
      const fetched = await request('https://test.kode-t.ru/list.json');
      setRecipes(fetched.recipes)
    } catch (e) {
      console.log(e.message)
    }
  }, [request])


  useEffect(  () => {
    getList()
  }, [getList, request])

  const getRecipes = useCallback( async () => {
    try {
      const fetched = await request('https://test.kode-t.ru/list.json');
      setRecipes(recipesFilter(fetched.recipes, filterRecipes))
    } catch (e) {
      console.log(e.message)
    }
  }, [filterRecipes, request])


  return (
    <BrowserRouter>
      <div>
        <CssBaseline />
        <Header
          getRecipes={getRecipes}
          filterRecipes={filterRecipes}
          setFilterRecipes={setFilterRecipes}
          setModalOpen={setModalOpen}
        />
        <ModalForm
          getRecipes={getRecipes}
          filterRecipes={filterRecipes}
          setFilterRecipes={setFilterRecipes}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
        />

        <Switch>
          <Route path='/' exact>
            <HomePage recipes={recipes} />
          </Route>
          <Route path='/detail/:id'>
            <DetailPage />
          </Route>
          <Redirect to='/' />
        </Switch>

      </div>
    </BrowserRouter>
  );
};

export default App;
