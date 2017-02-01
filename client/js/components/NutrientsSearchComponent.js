if (window.FC === undefined) { window.FC = {}; }

(() => {

  class NutrientsSearchComponent extends React.Component {

    constructor() {
      super();
      this.state = { form: true, results: [], offset: 0, searchParams: {}, query: "" }
      this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
      FC.dietData.deleteCurrentSearch();
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;

      if (windowBottom >= docHeight) {

        var queryStr = this.state.searchParams.queryStr;
        var offsetAmt = this.state.offset;
        var maxCalories = this.state.searchParams.maxCalories;
        var maxFat = this.state.searchParams.maxFat;
        var maxCarbs = this.state.searchParams.maxCarbs;
        var maxProtein = this.state.searchParams.maxProtein;

        $.ajax({
          url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?limitLicense=false" + maxCalories + maxCarbs +  maxFat +  maxProtein + "&number=10&offset=" + offsetAmt + queryStr + "&ranking=1",
          type: 'GET',
        	beforeSend: function (xhr) {
        		xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
            xhr.setRequestHeader("Accept", "application/json");
        	}
        })
        .done((data) => {
          var concatRecipes = this.state.results.concat(data.results);

          this.setState({
            form: false,
            results: concatRecipes,
            offset: this.state.offset + 10,
            searchParams: this.state.searchParams
          });

        });
      }
    }

    validateSearchParams(string, value) {

      if (value === "" ) {
        return "";
      }
      else {
        return string + value;
      }

    }

    callSearch(evt) {
      evt.preventDefault();
      var offsetAmt = "&offset="+ this.state.offset;
      var queryStr = this.validateSearchParams("&query=", this.queryInput.value);
      var maxCalories = this.validateSearchParams("&maxCalories=", this.maxCalories.value);
      var maxFat = this.validateSearchParams("&maxFat=", this.maxFat.value);
      var maxCarbs = this.validateSearchParams("&maxCarbs=", this.maxCarbs.value);
      var maxProtein = this.validateSearchParams("&maxProtein=", this.maxProtein.value);
      console.log("making ajax call")

      $.ajax({
        url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?limitLicense=false" + maxCalories + maxCarbs +  maxFat + maxProtein + "&number=10" + offsetAmt + queryStr + "&ranking=1",
        type: 'GET',
      	beforeSend: function (xhr) {
      		xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
          xhr.setRequestHeader("Accept", "application/json");
      	}
      })
      .done((data) => {

        var params = {
          queryStr: queryStr,
          maxCalories: maxCalories,
          maxFat: maxFat,
          maxCarbs: maxCarbs,
          maxProtein: maxProtein
        }

        this.setState({
          form: false,
          results: data.results,
          offset: this.state.offset + 10,
          searchParams: params,
          query: this.queryInput.value
        });
        console.log(data);
      });

    }

    backToSearch() {
      this.setState({
        form: true,
        searchParams: {},
        query: "",
        offset: 0
      });
    }

    render() {
      var searchForm;
      var searchResults;

      if (this.state.form === true) {
        searchForm = <form onSubmit={(evt) => { this.callSearch(evt)}}><input ref={(input) => { this.queryInput = input }} placeholder="Recipe Keyword" />
        <input ref={(input) => { this.maxCalories = input}} placeholder="Max Calories" />
        <input ref={(input) => { this.maxFat = input}} placeholder="Max Fat" />
        <input ref={(input) => { this.maxCarbs = input}} placeholder="Max Carbohydrates" />
        <input ref={(input) => { this.maxProtein = input}} placeholder="Max Protein" />
        <button>Search</button></form>
      } else {

        searchForm = <div><button onClick={() => { this.backToSearch(); }}>New Search</button></div>
        searchResults = <div><h1>Search results for "{this.state.query}"</h1>
        <ul className="search-results">
          {this.state.results.map((recipe, index) => {
            return <li key={index}><img src={recipe.image} />
            <ReactRouter.Link to={"/recipe/" + recipe.id}><p>{recipe.title}</p></ReactRouter.Link></li>
          })}
        </ul></div>
      }

      return <div className="search-container"><h1>Nutrients Search Thing</h1>
      {searchForm}{searchResults}</div>
    }
  }

  FC.NutrientsSearchComponent = NutrientsSearchComponent;

})()
