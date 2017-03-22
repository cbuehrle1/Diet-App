if (window.FC === undefined) { window.FC = {}; }

(() => {

  class DailyDietComponent extends React.Component {

    constructor() {
      super()
      this.state = { diet: {} };
    }

    componentDidMount() {

      var cb = (noop, diets, noop2) => {

        var active;

        diets.diets.forEach((diet) => {
          if (diet.active) {
            active = diet;
          }
        });
        console.log(active)
        this.setState({
          diet: active
        })
      }

      FC.dietData.registerCallback(cb);
    }

    render() {

      var display;

      if (this.props.show) {
        display = <div><ul><li>{this.state.diet.diet}</li>
        <li>{"Calories: " + this.state.diet.calories}</li>
        <li>{"Fat: " + this.state.diet.fat}</li>
        <li>{'Carbs: ' + this.state.diet.carbs}</li>
        <li>{'Protein: ' + this.state.diet.protein}</li>
        </ul></div>
      }

      return <div className="fixed-diet-window">{display}</div>;
    }
  }

  FC.DailyDietComponent = DailyDietComponent;
})()
