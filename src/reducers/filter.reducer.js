export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
export const SET_CUISINE_CALORICITY = 'SET_CUISINE_CALORICITY'

export const initialState = {
  searchValue: '',
  caloricity: [100, 1200],
  cuisine: {
    caribbean: true,
    greek: true,
    french: true,
    indian: true,
    chinese: true
  }
}

export const filterReducer = (state, action) => {
  switch(action.type) {
    case SET_SEARCH_VALUE:
      return {
        ...state, searchValue: action.payload
      }

    case SET_CUISINE_CALORICITY: {
      return {
        ...action.payload
      }
    }

    default:
      return state
  }
}

// ACTION CREATORS
export const setSearchValue = (payload) => ({type: SET_SEARCH_VALUE, payload})
export const setCuisineCaloricity = (payload) => ({type: SET_CUISINE_CALORICITY, payload })