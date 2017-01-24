if (window.FC === undefined) { window.FC = {}; }

(() => {

  class NavBar extends React.Component {

    constructor() {
      super();
      this.state = { user: {
        displayName: ""
      }, sidebar: "main-landing",
      height: window.innerHeight,
      diet: { diets: [] },
      addCat: false,
      catagory: { catagories: [] }
      }
    }

    componentDidMount() {

      var cb = (user, diet, catagory) => {

        this.setState({
          user: user,
          sidebar: this.state.sidebar,
          height: window.innerHeight,
          diet: diet,
          addCat: false,
          catagory: catagory
        });

      }

      FC.dietData.registerCallback(cb);

      FC.dietData.loadUser();

    }

    moveToSideBar() {
      this.props.callback();
      this.setState({
        user: this.state.user,
        sidebar: "side-bar"
      });
    }

    createCatagory() {

      this.setState({
        user: this.state.user,
        sidebar: this.state.sidebar,
        height: window.innerHeight,
        diet: this.state.diet,
        addCat: true
      });

    }

    saveCatagory(evt) {

      evt.preventDefault();

      $.ajax({
        url: "/api/catagory",
        method: "POST",
        data: {
          dietId: this.state.diet.diets[0].id,
          name: this.catagoryName.value
        }
      })
      .done((data) => {
        FC.dietData.loadUser();
      })

    }

    render() {
      var navBar;
      var top = (this.state.height/2) - 151;
      var theHeight = this.state.height - 36;
      var catagories;

      if (this.state.addCat === false) {
        catagories = <p onClick={() => { this.createCatagory(); }} >add catagory</p>
      } else {
        catagories = <form onSubmit={(evt) => { this.saveCatagory(evt); }}><input ref={(input) => { this.catagoryName = input }} placeholder="Catagory Name" /></form>
      }

      if (this.state.sidebar === "side-bar") {
        navBar = <div className={this.state.sidebar} style={ { height: theHeight } }>
          <h1>{this.state.user.displayName + "'"}s Pairings</h1>
          {this.state.diet.diets.map((diet) => {
            return <div key={diet.id}><h1>{diet.diet}</h1><p><ReactRouter.Link to={"/diet/" + diet.id}>Edit</ReactRouter.Link></p><p onClick={() => { FC.dietData.deleteDiet(diet.id); }}>Delete</p></div>
          })}
          {catagories}
        </div>
      } else {
        navBar = <div className={this.state.sidebar} style={ { height: theHeight } }><div style={{ width: "620px", margin: "0 auto", paddingTop: top }}><h1>Welcome {this.state.user.displayName}</h1>
        <p>This is an app designed around food pairing. Press Enter to start exploring new custom recipies today!</p>
        <div className="start-button" onClick={() => { this.moveToSideBar(); }}>Enter</div></div>
        </div>;
      }

      return <div>{navBar}</div>
    }


  }

  FC.NavBar = NavBar
})()
