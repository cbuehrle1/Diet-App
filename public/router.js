"use strict";

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var mountNode = document.querySelector("#react-root");

  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;

  var router = React.createElement(
    Router,
    { history: ReactRouter.hashHistory },
    React.createElement(
      Route,
      { path: "/", component: FC.AppComponent },
      React.createElement(ReactRouter.IndexRoute, { component: FC.LandingComponent }),
      React.createElement(Route, { path: "/RecipeSearch", component: FC.RecipeSearchComponent }),
      React.createElement(Route, { path: "/NutrientsSearch", component: FC.NutrientsSearchComponent }),
      React.createElement(Route, { path: "/CreateDiet", component: FC.CreateDietComponent }),
      React.createElement(Route, { path: "/recipe/:recipeId", component: FC.RecipeDetailComponent }),
      React.createElement(Route, { path: "/diet/:dietId", component: FC.EditDietComponent }),
      React.createElement(Route, { path: "/catagory/:catagoryId/recipe/:recipeId", component: FC.SavedRecipeDetailComponent })
    )
  );

  ReactDOM.render(router, mountNode);
})();
//# sourceMappingURL=router.js.map
