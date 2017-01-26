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

        if (catagory === undefined) {
          this.setState({
            user: user,
            sidebar: this.state.sidebar,
            height: window.innerHeight,
            diet: diet,
            addCat: false,
            catagory: this.state.catagory
          });
          
        } else {

          this.setState({
            user: user,
            sidebar: this.state.sidebar,
            height: window.innerHeight,
            diet: diet,
            addCat: false,
            catagory: catagory
          });

        }

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

      var dietIdParam = () => {
        var activeId;

        this.state.diet.diets.forEach((diet) => {

          if (diet.active === true) {
            activeId = diet.id;
            console.log(diet.id)
          }

        });

        return activeId;
      }


      $.ajax({
        url: "/api/catagory",
        method: "POST",
        data: {
          dietId: dietIdParam(),
          name: this.catagoryName.value
        }
      })
      .done((data) => {
        console.log(data);
        FC.dietData.loadUser();
      });

    }

    makeActive(evt) {

      $.ajax({
        url: "/api/makeactive/" + evt.target.id,
        method: "POST",
        data: {}
      })
      .done((data) => {
        FC.dietData.loadUser();
      })

    }

    render() {
      var navBar;
      var top = (this.state.height/2) - 151;
      var theHeight = this.state.height - 36;
      var active;

      if (this.state.sidebar === "side-bar") {

        navBar = <div className={this.state.sidebar} style={ { height: theHeight } }>
          <h1 className="title-h1">{this.state.user.displayName + "'"}s Pairings</h1>
          {this.state.diet.diets.map((diet) => {

            var catagories;

            if (diet.active === false) {
              active = <p id={diet.id} onClick={(evt) => { this.makeActive(evt); }}>Activate</p>;
            }
            else {
              active = undefined;

              if (this.state.addCat === false) {
                catagories = <div><p className="add-catagory" onClick={() => { this.createCatagory(); }} >add catagory</p>
                <ul>{this.state.catagory.catagories.map((catagory, index) => {
                  return <li key={index}>{catagory.name}</li>
                })}
                </ul></div>
              }
              else {
                catagories = <div><form onSubmit={(evt) => { this.saveCatagory(evt); }}><input ref={(input) => { this.catagoryName = input }} placeholder="add catagory" /></form>
                <ul>{this.state.catagory.catagories.map((catagory, index) => {
                  return <li key={index}>{catagory.name}</li>
                })}</ul>
                </div>
              }
            }

            return <div key={diet.id}><h1>{diet.diet}</h1><p><ReactRouter.Link to={"/diet/" + diet.id}>Edit</ReactRouter.Link>
            </p><p onClick={() => { FC.dietData.deleteDiet(diet.id); }}>Delete</p>{active}{catagories}</div>
          })}
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
