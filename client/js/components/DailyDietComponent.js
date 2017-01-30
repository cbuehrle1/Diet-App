if (window.FC === undefined) { window.FC = {}; }

(() => {

  class DailyDietComponent extends React.Component {
    pullDiets() {
      return FC.dietData.getDietInfo();
    }

    render() {
      var diets = FC.dietData.getDietInfo();
      console.log(diets);
      return <div>Daily Diet Component</div>
    }
  }

  FC.DailyDietComponent = DailyDietComponent;
})()
