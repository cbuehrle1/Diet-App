if (window.FC === undefined) { window.FC = {}; }

(() => {

  class SingleRecipeComponent extends React.Component {

    constructor() {
      super();
      this.state = { showDelete: false }
    }

    showDelete() {

      this.setState({
        showDelete: true
      })
    }

    hideDelete() {

      this.setState({
        showDelete: false
      })
    }

    deleteRecipe() {

      $.ajax({
        url: "/api/catagory/" + this.props.catagoryId + "/recipe/" + this.props.recipe.id,
        method: "POST",
        data: {
          id: this.props.recipe.id
        }
      })
      .done((data) => {
        FC.dietData.loadUser();
      })

    }

    render() {
      var deleteIcon;

      if (this.state.showDelete === true) {
        deleteIcon = <i onClick={() => { this.deleteRecipe(); }} className="material-icons" style={ { verticalAlign: "middle", cursor: "pointer" } }>delete_forever</i>
      }

      return <div onMouseOver={() => { this.showDelete(); }} onMouseLeave={() => { this.hideDelete(); }}><ReactRouter.Link key={this.props.id} to={"/catagory/" + this.props.catagoryId + "/recipe/" + this.props.recipe.id}>
      <p>{this.props.recipe.name}</p></ReactRouter.Link>{deleteIcon}</div>
    }
  }

  FC.SingleRecipeComponent = SingleRecipeComponent;

})();
