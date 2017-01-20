if (window.FC === undefined) { window.FC = {}; }

(() => {

  class RecipeSearchComponent extends React.Component {

    constructor() {
      super()
      this.state = { data: {
        results: []
      }, form: true }
    }

    callSearch(evt) {
      evt.preventDefault();
      var queryStr = this.queryInput.value;
      console.log(this.queryInput.value);
      $.ajax({
      	url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=10&offset=0&query=" + queryStr + "&ranking=1&type=main+course",
      	type: 'GET',
      	beforeSend: function (xhr) {
      		xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
          xhr.setRequestHeader("Accept", "application/json");
      	}
      })
      .done((data) => {

        this.setState({
          data: data,
          form: false
        });

      })

    }

    render() {
      console.log(this.state.data);
      var searchForm;
      var searchResults;
      var imageUrl;

      if (this.state.form === true) {
        searchForm = <form><input ref={(input) => { this.queryInput = input }} placeholder="Search" /><button onClick={(evt) => { this.callSearch(evt); }}>Search</button></form>
      } else if (this.state.form === false) {
        imageUrl = this.state.data.baseUri
        searchForm = <form><input ref={(input) => { this.queryInput = input }} placeholder="Search" /><button onClick={(evt) => { this.callSearch(evt); }}>Search</button></form>
        searchResults = <div><h1>Search results for "{this.queryInput.value}"</h1>
         <ul className="search-results">
          {this.state.data.results.map((recipe) => {
            return <li><img src={imageUrl + recipe.image} />
            <p>{recipe.title}</p><p>Ready in {recipe.readyInMinutes} minutes</p></li>
          })}
         </ul>
         </div>
      }

      return <div className="search-container">{searchForm}{searchResults}</div>
    }
  }

  FC.RecipeSearchComponent = RecipeSearchComponent;
})()
