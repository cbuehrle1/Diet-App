if (window.FC === undefined) { window.FC = {}; }

(() => {

class RecipeDetailComponent extends React.Component {

  constructor() {
    super();
    this.state = { data: { extendedIngredients: [] }, instructions: [], nutrients: [], diet: {} }
  }

  componentDidMount() {


    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + this.props.params.recipeId + "/information?includeNutrition=true",
      type: 'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
        xhr.setRequestHeader("Accept", "application/json");
      }
    })
    .done((data) => {

      FC.dietData.storeRecipeInfo(data);
      var diets = FC.dietData.getDietInfo();
      var activeDiet = {};

      diets.diets.map((diet) => {
        if (diet.active === true) {
          activeDiet = diet
        }
      });

      this.setState({
        data: data,
        instructions: data.analyzedInstructions[0].steps,
        nutrients: data.nutrition.nutrients,
        diet: activeDiet
      });

    });
  }

  findNutrients(item, itemTwo, itemThree, itemFour) {

    var nutrientsArray = []

    this.state.nutrients.map((nutrient) => {

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

  render() {

    var nutrientsArray = this.findNutrients("Calories", "Fat", "Carbohydrates", "Protein");

    return <div className="search-container"><FC.SaveToComponent data={this.state.data}/><h1>{this.state.data.title}</h1>
      <img className="detail-img" src={this.state.data.image} />
      <h1>Nutrition Per Serving</h1>
      <ul>
        {nutrientsArray.map((nutrient, index) => {
          return <li key={index}>{nutrient.title + ": " + nutrient.amount + " " + nutrient.unit}</li>
        })}
      </ul>
      <h1>ingredients</h1>
      <ul className="search-results">{this.state.data.extendedIngredients.map((ingredient, index) => {
        return <li key={index} >{ingredient.originalString}</li>;
      })}
      </ul>
      <h1>instructions</h1>
      <ol className="search-results">
        {this.state.instructions.map((step, index) => {
          return <li key={index}>{step.step}</li>;
        })}
      </ol>
    </div>
  }
}

FC.RecipeDetailComponent = RecipeDetailComponent;
})()
