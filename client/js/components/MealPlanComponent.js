if (window.FC === undefined) { window.FC = {}; }

(() => {

  class MealPlanComponent extends React.Component {

    render() {
      console.log("Reached Meal Plan Component")
      return <div className='detail-container'><h1 className='react-detail-h1'>Reached Meal Plan Component</h1></div>
    }
  }

  FC.MealPlanComponent = MealPlanComponent;

})();
