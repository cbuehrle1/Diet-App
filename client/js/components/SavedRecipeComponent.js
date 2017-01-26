if (window.FC === undefined) { window.FC = {}; }

(() => {

  class SavedRecipeComponent extends React.Component {

    render() {

      return <div>{this.props.recipes.map((recipe, index) => {
        return <p key={index} className="recipes">{recipe.name}</p>
      })}</div>
    }
  }
FC.SavedRecipeComponent = SavedRecipeComponent
})()
