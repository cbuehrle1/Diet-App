if (window.FC === undefined) { window.FC = {}; }

(() => {

  class SavedRecipeDetailComponent extends React.Component {

    constructor() {
      super();
      this.state = { recipe: { analyzedInstructions: [],
      extendedIngredients: [], nutrients: [] }, diets: { diets: [] } }
    }

    componentDidMount() {
      var cb = () => {
        var recipe = FC.dietData.getSavedRecipe(this.props.params.catagoryId, this.props.params.recipeId);
        var diets = FC.dietData.getDietInfo();
        console.log("did mount")
        this.setState({
          recipe: recipe,
          diets: diets
        });
      }

      FC.dietData.registerCallback(cb);
      FC.dietData.loadUser();
    }

    componentWillReceiveProps() {

        var recipe = FC.dietData.getSavedRecipe(this.props.params.catagoryId, this.props.params.recipeId);
        var diets = FC.dietData.getDietInfo();
        console.log("received props")
        this.setState({
          recipe: recipe,
          diets: diets
        });
      }

    componentWillUnmount() {

      var cb = () => {
        var recipe = FC.dietData.getSavedRecipe(this.props.params.catagoryId, this.props.params.recipeId);
        var diets = FC.dietData.getDietInfo();

        this.setState({
          recipe: recipe,
          diets: diets
        });
      }

      FC.dietData.onUnmount(cb);
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

      return <div className="detail-container"><h1 className="react-detail-h1">{this.state.recipe.name}</h1>
      <div className="float-container">
        <div className="detail-float"><img className="detail-img" src={this.state.recipe.image} />
          <FC.BarChartComponent percents={percents} />
        </div>
      <div className="detail-float">
        <h2>Servings: {this.state.recipe.servings}</h2>
        <h2>Ready in {this.state.recipe.readyInMinutes} minutes</h2>
        <h2>Nutritional Information</h2>
        <ul>
          {nutrients.map((nutrient, index) => {
            return <li key={index}>{nutrient.title + ": " + nutrient.amount + " " + nutrient.unit}</li>
          })}
        </ul>
        <h2>Ingredients</h2>
        <ul>
          {this.state.recipe.extendedIngredients.map((ingredient, index) => {
            return <li key={index} >{ingredient.originalString}</li>
          })}
        </ul>
      </div>
      </div>
      <div className="instructions">
        <h2>Instructions</h2>
        {this.state.recipe.analyzedInstructions.map((recipe, index) => {
          return <ul key={index} >{recipe.steps.map((step, index) => {
            return <li key={index} >{step.step}</li>
          })}</ul>
        })}
      </div>
      </div>
    }

  }

  FC.SavedRecipeDetailComponent = SavedRecipeDetailComponent
})()
