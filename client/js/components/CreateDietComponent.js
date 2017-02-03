if (window.FC === undefined) { window.FC = {}; }

(() => {

  class CreateDietComponent extends React.Component {

    componentDidMount() {
      FC.dietData.deleteCurrentSearch();
    }

    saveDiet(evt) {
      evt.preventDefault();

      $.ajax({
        url: "/api/diet",
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
      return <div className="search-container"><h1 className="react-form-h1">Create a Diet</h1>
      <form className="react-form" onSubmit={(evt) => { this.saveDiet(evt); }}>
        <input ref={(input) => { this.dietName = input }} placeholder="Diet Name" />
        <input ref={(input) => { this.calories = input }} placeholder="Target Calorie Count" />
        <input ref={(input) => { this.fats = input }} placeholder="Target Fat Count" />
        <input ref={(input) => { this.carbs = input }} placeholder="Target Carb Count" />
        <input ref={(input) => { this.protein = input }} placeholder="Target Protein Count" />
        <button>Create Diet</button>
      </form>
      </div>
    }
  }

  FC.CreateDietComponent = CreateDietComponent;

})()
