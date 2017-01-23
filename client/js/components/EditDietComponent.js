if (window.FC === undefined) { window.FC = {}; }

(() => {

  class EditDietComponent extends React.Component {

    constructor() {
      super();
      this.state = { diet: {} }
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

    render() {
      console.trace(this.state.diet);
      return <div className="search-container">Edit Diet Component</div>
    }
  }

FC.EditDietComponent = EditDietComponent;
})();
