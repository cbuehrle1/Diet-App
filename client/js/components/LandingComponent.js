if (window.FC === undefined) { window.FC = {}; }

(() => {

  class LandingComponent extends React.Component {

    render() {
      return <div className="content-container"><h1>What would you like to do?</h1>
        <h1>Create a <a href="">diet</a></h1>
        <h1>Search for <a href="">recipies</a></h1>
        <h1>Search for recipes by nutritional targets</h1>
      </div>
    }

  }

  FC.LandingComponent = LandingComponent;
})()
