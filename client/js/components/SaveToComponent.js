if (window.FC === undefined) { window.FC = {}; }

(() => {

  class SaveToComponent extends React.Component {

    constructor() {
      super();
      this.state = { info: { catagoryInfo: { catagories: [] }, recipeInfo: [] }, click: false }
    }

    componentDidMount() {

      var data = FC.dietData.sendRecipeInfo();

      this.setState({
        info: data,
        click: false
      });

    }

    componentWillUnmount() {
      FC.dietData.recipeInfo = []
    }

    clicked() {

      if (this.state.click === false) {
        this.setState({
          info: this.state.info,
          click: true
        });
      }
      else {
        this.setState({
          info: this.state.info,
          click: false
        })
      }

    }

    saveCatagory(evt) {
      console.log(this.state.info.recipeInfo[0])
      var postData = {
        name: this.state.info.recipeInfo[0].title,
        servings: this.state.info.recipeInfo[0].servings,
        readyInMinutes: this.state.info.recipeInfo[0].readyInMinutes,
        image: this.state.info.recipeInfo[0].image,
        nutrients: this.state.info.recipeInfo[0].nutrition.nutrients,
        extendedIngredients: this.state.info.recipeInfo[0].extendedIngredients,
        analyzedInstructions: this.state.info.recipeInfo[0].analyzedInstructions
      }
      $.ajax({
        url: "/api/catagory/" + evt.target.id + "/recipe",
        method: "POST",
        data: JSON.stringify(postData),
        contentType: "application/json",
        dataType: "json"
      })
      .done((req, res) => {
        FC.dietData.loadUser();
        ReactRouter.browserHistory.goBack();
      })
    }

    render() {
      var dropDown;

      if (this.state.click === true){
        dropDown = <ul>{this.state.info.catagoryInfo.catagories.map((catagory, index) => {
          return <li key={index} id={catagory.id} onClick={(evt) => { this.saveCatagory(evt); }}>{catagory.name}</li>
        })}</ul>
      }

      return <div><button onClick={() => { this.clicked(); }}>Save Me</button>{dropDown}</div>
    }

  }

FC.SaveToComponent = SaveToComponent;

})();
