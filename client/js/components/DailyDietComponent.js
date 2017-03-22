if (window.FC === undefined) { window.FC = {}; }

(() => {

  class DailyDietComponent extends React.Component {

    render() {
      return <div className="fixed-diet-window">Daily Diet Component</div>;
    }
  }

  FC.DailyDietComponent = DailyDietComponent;
})()
