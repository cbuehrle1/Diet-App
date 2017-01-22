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
      this.setState({
        data: data,
        instructions: data.analyzedInstructions[0].steps
      });
      console.log(data);
    });
  }

  render() {

    return <div className="search-container"><h1>{this.state.data.title}</h1>
      <ul>{this.state.data.extendedIngredients.map((ingredient) => {
        return <li>{ingredient.originalString}</li>;
      })}
      </ul>
      <ol>
        {this.state.instructions.map((step) => {
          return <li>{step.step}</li>;
        })}
      </ol>
    </div>
  }
}

FC.RecipeDetailComponent = RecipeDetailComponent;
})()
