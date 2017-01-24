if (window.FC === undefined) { window.FC = {}; }

(() => {

  class EditDietComponent extends React.Component {

    constructor() {
      super();
      this.state = { diet: { diet: [] } }
    }

    componentDidMount() {
      var cb = (data) => {
        this.setState({
          diet: data
        });
      }

      $.ajax({
        url: "/api/diet/" + this.props.params.dietId
      })
      .done((data) => {
        cb(data);
      });

    }

    editDiet(evt) {

      evt.preventDefault();

      $.ajax({
        url: "/api/diet/" + this.props.params.dietId,
        method: "POST",
        data: {
          diet: this.dietName.value,
          calories: this.calories.value,
          fats: this.fats.value,
          carbs: this.carbs.value,
          protein: this.protein.value
        }
      })
      .done((data) => {
        FC.dietData.loadUser();
        ReactRouter.browserHistory.goBack();
      })

    }

    render() {
      console.log(this.state.diet.diet);
      return <div className="search-container"><h1>Edit Diet Component</h1>
      {this.state.diet.diet.map((diet, index) => {
        return <form key={index} className="update-diet" onSubmit={(evt) => { this.editDiet(evt); }}><input ref={(input) => { this.dietName = input }} defaultValue={diet.name}></input>
          <input ref={(input) => { this.calories = input }} defaultValue={diet.calories}></input>
          <input ref={(input) => { this.fats = input }} defaultValue={diet.fat}></input>
          <input ref={(input) => { this.carbs = input }} defaultValue={diet.carbohydrates}></input>
          <input ref={(input) => { this.protein = input }} defaultValue={diet.protein}></input>
          <button>Save Changes</button>
        </form>
      })}
      </div>
    }
  }

FC.EditDietComponent = EditDietComponent;
})();
