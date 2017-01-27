if (window.FC === undefined) { window.FC = {}; }

(() => {

  class SavedRecipeComponent extends React.Component {

    constructor() {
      super();
    }

    render() {
      console.log('rendering SavedRecipeComponent');
      var catagoryId;
      return <ul>{this.props.catagory.map((catagory, index) => {
        catagoryId = catagory.id;
        return<li key={index}><h3>{catagory.name}</h3>
        {catagory.recipes.map((recipe, index) => {
          return <ReactRouter.Link key={index} to={"/catagory/" + catagoryId + "/recipe/" + recipe.id}><p>{recipe.name}</p></ReactRouter.Link>
        })}</li>
      })}</ul>
    }
  }
FC.SavedRecipeComponent = SavedRecipeComponent
})()
