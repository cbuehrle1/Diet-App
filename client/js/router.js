if (window.FC === undefined) { window.FC = {}; }

(() => {
  var mountNode = document.querySelector("#react-root");

  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;

  var router = <Router history={ReactRouter.hashHistory}>
    <Route path="/" component={FC.AppComponent}>
      <ReactRouter.IndexRoute component={FC.LandingComponent} />
    </Route>
  </Router>;

  ReactDOM.render(router, mountNode);

})()
