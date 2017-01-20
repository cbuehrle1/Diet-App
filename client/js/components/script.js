if (window.FC === undefined) { window.FC = {}; }

(() => {

  class AppComponent extends React.Component {

    renderChildren() {
      this.setState({
        show: true,
        appHeader: "app-header"
      });
    }

    render() {
      var children;
      var headerStyle;
      var headerLinks;

      if (this.state !== null && this.state.show === true) {
        children = this.props.children;
        headerStyle = this.state.appHeader;
        headerLinks = <ul className="ul-left"><li className='left-header-li'><ReactRouter.Link to={"/"}>Chads App</ReactRouter.Link></li>
        <li className='left-header-li'><ReactRouter.Link to={"/RecipeSearch"}>Search Recipes</ReactRouter.Link></li>
        <li className="nutrients-search"><ReactRouter.Link to={"/NutrientsSearch"}>Search by Nutrients</ReactRouter.Link></li>
        <li className="left-header-li"><ReactRouter.Link to={"/CreateDiet"}>Create Diet</ReactRouter.Link></li></ul>;
      }
      else if (this.state === null) {
        headerStyle = "app-header-main";
      }

      return <div><header className={headerStyle}><ul>
        <li><a href="/logout">logout</a></li></ul>
        {headerLinks}
      </header>
        <FC.NavBar callback={() => { this.renderChildren(); }}/>
        {children}
      </div>
    }
  }

  FC.AppComponent = AppComponent;

})()
