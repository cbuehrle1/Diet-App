if (window.FC === undefined) { window.FC = {}; }

(() => {

  class SavedRecipeDetailComponent extends React.Component {

    constructor() {
      super();
      this.state = { recipe: { analyzedInstructions: [],
      extendedIngredients: [], nutrients: [] } }
    }

    componentWillReceiveProps() {

      var recipe = FC.dietData.getSavedRecipe(this.props.params.catagoryId, this.props.params.recipeId);

      this.setState({
        recipe: recipe
      });

    }

    render() {
      var nutrientsArray = []

      this.state.recipe.nutrients.map((nutrient) => {

        if (nutrient.title.indexOf("Calories") !== -1) {
          nutrientsArray.push(nutrient);
        }
        else if (nutrient.title.indexOf("Fat") !== -1) {
          nutrientsArray.push(nutrient);
        }
        else if (nutrient.title.indexOf("Carbohydrates") !== -1) {
          nutrientsArray.push(nutrient);
        }
        else if (nutrient.title.indexOf("Protein") !== -1) {
          nutrientsArray.push(nutrient);
        }

      });


      console.log(this.state.recipe);

      return <div className="search-container"><h1>{this.state.recipe.name}</h1>
      <img className="detail-img" src={this.state.recipe.image} />
      <h2>Servings: {this.state.recipe.servings}</h2>
      <h2>Ready in {this.state.recipe.readyInMinutes} minutes</h2>
      <div>
        <h2>Nutritional Information</h2>
        <ul>
          {nutrientsArray.map((nutrient, index) => {
            return <li key={index}>{nutrient.title + ": " + nutrient.amount + " " + nutrient.unit}</li>
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
