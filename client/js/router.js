if (window.FC === undefined) { window.FC = {}; }

(() => {
  var mountNode = document.querySelector("#react-root");

  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;

  var router = <Router history={ReactRouter.hashHistory}>
    <Route path="/" component={FC.AppComponent}>
      <ReactRouter.IndexRoute component={FC.LandingComponent} />
      <Route path="/RecipeSearch" component={FC.RecipeSearchComponent} />
      <Route path="/NutrientsSearch" component={FC.NutrientsSearchComponent} />
      <Route path="/CreateDiet" component={FC.CreateDietComponent} />
      <Route path="/recipe/:recipeId" component={FC.RecipeDetailComponent} />
    </Route>
  </Router>;

  ReactDOM.render(router, mountNode);

})()
