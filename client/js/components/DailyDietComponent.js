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

        if (active === undefined) {
          this.setState({
            diet: {}
          });
        }
        else {
          this.setState({
            diet: active
          });
        }

      }

      FC.dietData.registerCallback(cb);
    }

    componentWillUnmount() {

      var cb = (noop, diets, noop2) => {

        var active;

        diets.diets.forEach((diet) => {
          if (diet.active) {
            active = diet;
          }
        });

        if (active === undefined) {
          this.setState({
            diet: {}
          });
        }
        else {
          this.setState({
            diet: active
          });
        }

      }

      FC.dietData.onUnmount(cb);
    }

    render() {

      var display;

      if (this.props.show && this.state.diet.diet !== undefined) {
        display = <div><ul><li className="list-diet-title">{this.state.diet.diet}</li>
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
