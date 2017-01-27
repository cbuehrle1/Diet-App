if (window.FC === undefined) { window.FC = {}; }

(() => {

  class SavedRecipeDetailComponent extends React.Component {

    constructor() {
      super();
      this.state = { recipe: { analyzedInstructions: [],
      extendedIngredients: [], nutrients: [] } }
    }

    componentDidMount() {
      var recipe = FC.dietData.getSavedRecipe(this.props.params.catagoryId, this.props.params.recipeId);

      this.setState({
        recipe: recipe
      });

    }

    componentWillReceiveProps() {
      var recipe = FC.dietData.getSavedRecipe(this.props.params.catagoryId, this.props.params.recipeId);

      this.setState({
        recipe: recipe
      });

    }

    render() {
      console.log(this.state.recipe);
      return <div className="search-container">Reached Saved Recipe Detail Page</div>
    }

  }

  FC.SavedRecipeDetailComponent = SavedRecipeDetailComponent
})()
