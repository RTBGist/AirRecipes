export const recipesFilter = (recipes, ftr) => {
  const filteredRecipes = [];

  const selectedCuisineArr = Object.keys(ftr.cuisine).filter((cuisine) => {
    if(ftr.cuisine[cuisine]) {
      return cuisine
    }
  });

  recipes.forEach((recipe) => {
    if((ftr.searchValue.trim() === '' || // string check
      recipe.title.toLowerCase().includes(ftr.searchValue.toLowerCase())) &&
      selectedCuisineArr.includes(recipe.cuisine.title.toLowerCase()) && // cuisine check
      ftr.caloricity[0] <= recipe.caloricity && // min/max caloricity check
      recipe.caloricity <= ftr.caloricity[1]
    ) {
      filteredRecipes.push(recipe);
    }
  })

  return filteredRecipes;
}