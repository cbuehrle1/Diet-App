if (window.FC === undefined) { window.FC = {}; }

(() => {

class RecipeDetailComponent extends React.Component {

  constructor() {
    super();
    this.state = { data: { extendedIngredients: [] }, instructions: [] }
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

      this.setState({
        data: data,
        instructions: data.analyzedInstructions[0].steps
      });

    });
  }

  render() {

    return <div className="search-container"><FC.SaveToComponent data={this.state.data}/><h1>{this.state.data.title}</h1>
      <img className="detail-img" src={this.state.data.image} />
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
