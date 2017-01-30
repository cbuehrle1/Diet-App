if (window.FC === undefined) { window.FC = {}; }

(() => {

  class NutrientsSearchComponent extends React.Component {

    constructor() {
      super();
      this.state = { form: true, advancedForm: false }
    }

    callSearch(evt) {
      evt.preventDefault();

      var queryStr = this.queryInput.value;
      var maxCalories = this.maxCalories.value;
      var maxFat = this.maxFat.value;
      var maxCarbs = this.maxCarbs.value;
      var maxProtein = this.maxProtein.value;

      $.ajax({
        url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?limitLicense=false&maxCalories=" + maxCalories + "&maxCarbs=" + maxCarbs + "&maxFat=" + maxFat + "&maxProtein=" + maxProtein + "&number=10&offset=0&query=" + queryStr + "&ranking=1",
        type: 'GET',
      	beforeSend: function (xhr) {
      		xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
          xhr.setRequestHeader("Accept", "application/json");
      	}
      })
      .done((data) => {
        console.log(data.results);
        this.setState({
          form: false
        });

      });

    }

    render() {
      var searchForm;

      if (this.state.form === true) {
        searchForm = <form onSubmit={(evt) => { this.callSearch(evt)}}><input ref={(input) => { this.queryInput = input }} placeholder="Recipe Keyword" />
        <input ref={(input) => { this.maxCalories = input}} placeholder="Max Calories" />
        <input ref={(input) => { this.maxFat = input}} placeholder="Max Fat" />
        <input ref={(input) => { this.maxCarbs = input}} placeholder="Max Carbohydrates" />
        <input ref={(input) => { this.maxProtein = input}} placeholder="Max Protein" />
        <button>Search</button></form>
      } else {
        searchForm = <div>Search Results</div>
      }

      return <div className="search-container"><h1>Nutrients Search Thing</h1>
      {searchForm}</div>
    }
  }

  FC.NutrientsSearchComponent = NutrientsSearchComponent;

})()
