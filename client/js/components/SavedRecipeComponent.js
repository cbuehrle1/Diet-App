if (window.FC === undefined) { window.FC = {}; }

(() => {

  class SavedRecipeComponent extends React.Component {

    constructor() {
      super();
    }

    render() {

      var catagoryId;
      return <ul>{this.props.catagory.map((catagory, index) => {
        
        catagoryId = catagory.id;
        return<li key={index}><h3>{catagory.name}</h3>
        {catagory.recipes.map((recipe, index) => {
          return <FC.SingleRecipeComponent key={index} id={index} catagoryId={catagoryId} recipe={recipe} />
        })}</li>
      })}</ul>
    }
  }
FC.SavedRecipeComponent = SavedRecipeComponent
})()
