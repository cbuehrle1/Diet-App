if (window.FC === undefined) { window.FC = {}; }

(() => {

  var localStorageValue = localStorage.getItem("show");

  if (localStorageValue === null) { localStorage.setItem("show", "app-header-main") }

  localStorageValue = localStorage.getItem("show");

  class AppComponent extends React.Component {

    constructor() {
      super();
      this.state = { show: false }
    }

    renderChildren() {
      localStorage.setItem("show", "app-header");
      this.setState({
        show: true,
        appHeader: "app-header"
      });
    }

    passShowProp() {

      if (localStorageValue === "app-header") {
        return true;
      }
      else {
        return this.state.show;
      }

    }

    render() {
      var children;
      var headerStyle;
      var headerLinks;
      var showProp = this.passShowProp();

      if (this.state !== null && this.state.show === true) {
        children = this.props.children;
        headerStyle = this.state.appHeader;
        headerLinks = <ul className="ul-left"><li className='left-header-li'><ReactRouter.Link to={"/"}>Chads App</ReactRouter.Link></li>
        <li className='left-header-li'><ReactRouter.Link to={"/RecipeSearch"}>Search Recipes</ReactRouter.Link></li>
        <li className="nutrients-search"><ReactRouter.Link to={"/NutrientsSearch"}>Search by Nutrients</ReactRouter.Link></li>
        <li className="left-header-li"><ReactRouter.Link to={"/CreateDiet"}>Create Diet</ReactRouter.Link></li>
        <li className='left-header-li'><ReactRouter.Link to={'/MealPlan'}>Meal Plan</ReactRouter.Link></li></ul>;
      }
      else if (localStorageValue === "app-header") {
        children = this.props.children;
        headerStyle = localStorageValue;
        headerLinks = <ul className="ul-left"><li className='left-header-li'><ReactRouter.Link to={"/"}>Chads App</ReactRouter.Link></li>
        <li className='left-header-li'><ReactRouter.Link to={"/RecipeSearch"}>Search Recipes</ReactRouter.Link></li>
        <li className="nutrients-search"><ReactRouter.Link to={"/NutrientsSearch"}>Search by Nutrients</ReactRouter.Link></li>
        <li className="left-header-li"><ReactRouter.Link to={"/CreateDiet"}>Create Diet</ReactRouter.Link></li>
        <li className='left-header-li'><ReactRouter.Link to={'/MealPlan'}>Meal Plan</ReactRouter.Link></li></ul>;
      }
      else if (this.state.show === false) {
        headerStyle = "app-header-main";
      }

      return <div><header className={headerStyle}><ul>
        <li><a href="/logout">logout</a></li></ul>
        {headerLinks}
      </header>
        <FC.NavBar callback={() => { this.renderChildren(); }}/>
        {children}
        <FC.DailyDietComponent show={showProp} />
    </div>
    }
  }

  FC.AppComponent = AppComponent;

})()
