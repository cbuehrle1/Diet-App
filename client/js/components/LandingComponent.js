if (window.FC === undefined) { window.FC = {}; }

(() => {

  class LandingComponent extends React.Component {

    render() {
      return <div className="content-container"><h1>What would you like to do?</h1>
        <h1>Create a <a href="abc.com">diet</a></h1>
        <h1>Search for <ReactRouter.Link to={"/RecipeSearch"}>recipes</ReactRouter.Link></h1>
        <h1>Search for recipes by <a href="abc.com">nutritional targets</a></h1>
      </div>
    }

  }

  FC.LandingComponent = LandingComponent;
})()
