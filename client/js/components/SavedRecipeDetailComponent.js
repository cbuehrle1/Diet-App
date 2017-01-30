if (window.FC === undefined) { window.FC = {}; }

(() => {

  class SavedRecipeDetailComponent extends React.Component {

    constructor() {
      super();
      this.state = { recipe: { analyzedInstructions: [],
      extendedIngredients: [], nutrients: [] }, diets: { diets: [] } }
    }

    componentWillReceiveProps() {

      var recipe = FC.dietData.getSavedRecipe(this.props.params.catagoryId, this.props.params.recipeId);
      var diets = FC.dietData.getDietInfo();

      this.setState({
        recipe: recipe,
        diets: diets
      });

    }

    findNutrients(item, itemTwo, itemThree, itemFour) {

      var nutrientsArray = []

      this.state.recipe.nutrients.map((nutrient) => {

        if (nutrient.title.indexOf(item) !== -1) {
          nutrientsArray.push(nutrient);
        }
        else if (nutrient.title === itemTwo) {
          nutrientsArray.push(nutrient);
        }
        else if (nutrient.title.indexOf(itemThree) !== -1) {
          nutrientsArray.push(nutrient);
        }
        else if (nutrient.title.indexOf(itemFour) !== -1) {
          nutrientsArray.push(nutrient);
        }

      });

      return nutrientsArray;
    }

    findActiveDiet() {
      var activeDiet = {}
      var dailyValueArray = []
      this.state.diets.diets.map((diet) => {
        if (diet.active === true) {
          activeDiet = diet
        }
      });

      dailyValueArray.push(activeDiet.calories);
      dailyValueArray.push(activeDiet.fat);
      dailyValueArray.push(activeDiet.carbs);
      dailyValueArray.push(activeDiet.protein);

      return dailyValueArray;
    }


    render() {

      var diet = this.findActiveDiet();
      var nutrients = this.findNutrients("Calories", "Fat", "Carbohydrates", "Protein");
      var percents = []

      for (var i = 0; i < nutrients.length; i++) {

        var item = {
          title: "",
          percent: (nutrients[i].amount / diet[i]) * 100
        }
        percents.push(item);
      }

      if (percents[0] !== undefined) {

        percents[0].title = "Calories";
        percents[1].title = "Fat";
        percents[2].title = "Carbohydrates";
        percents[3].title = "Protein";

      }

      return <div className="search-container"><h1>{this.state.recipe.name}</h1>
      <img className="detail-img" src={this.state.recipe.image} />
      <h2>Servings: {this.state.recipe.servings}</h2>
      <h2>Ready in {this.state.recipe.readyInMinutes} minutes</h2>
      <div>
        <h2>Nutritional Information</h2>
        <ul>
          {nutrients.map((nutrient, index) => {
            return <li key={index}>{nutrient.title + ": " + nutrient.amount + " " + nutrient.unit}</li>
          })}
        </ul>
        <h2>Percent of Daily Diet</h2>
        <ul>
          {percents.map((nutrient, index) => {
            return <li key={index}>{nutrient.title + ": " + nutrient.percent.toFixed(1) + "%"}</li> 
          })}
        </ul>
      </div>
      <div>
      <h1>ingredients</h1>
      <ul className="search-results">
        {this.state.recipe.extendedIngredients.map((ingredient, index) => {
          return <li key={index} >{ingredient.originalString}</li>
        })}
      </ul>
      </div>
      <div>
        <h1>Instructions</h1>
        {this.state.recipe.analyzedInstructions.map((recipe, index) => {
          return <ul className="search-results" key={index} >{recipe.steps.map((step, index) => {
            return <li key={index} >{step.step}</li>
          })}</ul>
        })}
      </div>
      </div>
    }

  }

  FC.SavedRecipeDetailComponent = SavedRecipeDetailComponent
})()
