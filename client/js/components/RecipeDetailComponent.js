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
        xhr.setRequestHeader("X-Mashape-Key", FC.apiKey.mashKey);
        xhr.setRequestHeader("Accept", "application/json");
      }
    })
    .done((data) => {
      console.log(data);
      FC.dietData.storeRecipeInfo(data);
      var diets = FC.dietData.getDietInfo();
      var activeDiet = {};

      diets.diets.map((diet) => {
        if (diet.active === true) {
          activeDiet = diet
        }
      });

      var instructions;

      if (data.analyzedInstructions.length === 0) {
        instructions = data.instructions;
      }
      else {
        instructions = data.analyzedInstructions[0].steps
      }

      this.setState({
        data: data,
        instructions: instructions,
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

    var instructions;
    console.log(this.state.instructions);
    if (typeof this.state.instructions === "string") {
      instructions = <p>{this.state.instructions}</p>
    }
    else if (this.state.instructions === null) {
      instructions;
    }
    else {
      instructions = <div className="instructions"><h2>instructions</h2><ul className="">
        {this.state.instructions.map((step, index) => {
          return <li key={index}>{step.step}</li>;
        })}
      </ul></div>
    }

    var saveComponent;

    if (this.state.diet.diet !== undefined) {
      saveComponent = <FC.SaveToComponent data={this.state.data}/>
    }
    else {
      saveComponent = <h2>Activate a Diet to add catagories</h2>;
    }

    return <div className="detail-container"><div className="position-me-relative">{saveComponent}</div><h1 className="react-detail-h1">{this.state.data.title}</h1>
      <div className="detail-float">
      <img className="detail-img" src={this.state.data.image} />
      </div>
      <div className="detail-float">
      <h2>Nutrition Per Serving</h2>
      <ul>
        {nutrientsArray.map((nutrient, index) => {
          return <li key={index}>{nutrient.title + ": " + nutrient.amount + " " + nutrient.unit}</li>
        })}
      </ul>
      <h2>ingredients</h2>
      <ul className="">{this.state.data.extendedIngredients.map((ingredient, index) => {
        return <li key={index} >{ingredient.originalString}</li>;
      })}
      </ul>
      </div>
      {instructions}
    </div>
  }
}

FC.RecipeDetailComponent = RecipeDetailComponent;
})()
