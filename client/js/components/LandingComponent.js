if (window.FC === undefined) { window.FC = {}; }

(() => {

  class LandingComponent extends React.Component {

    render() {
      return <div className="content-container"><h1>What would you like to do?</h1>
        <h1>Create a <ReactRouter.Link to={"/CreateDiet"}>diet</ReactRouter.Link></h1>
        <h1>Search for <ReactRouter.Link to={"/RecipeSearch"}>recipes</ReactRouter.Link></h1>
        <h1>Search for recipes by <ReactRouter.Link to={"/NutrientsSearch"}>nutritional targets</ReactRouter.Link></h1>
      </div>
    }

  }

  FC.LandingComponent = LandingComponent;
})()
