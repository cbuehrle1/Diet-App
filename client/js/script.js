var mountNode = document.querySelector('#react-root');

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = { user: {
      displayName: ""
    }, sidebar: "main-landing"
    }
  }

  componentDidMount() {
    var cb = (data) => {
      this.setState({
        user: data,
        sidebar: this.state.sidebar,
        height: window.innerHeight
      });
    }

    $.ajax({
      url: "/api/user"
    })
    .done(function(data) {
      cb(data);
    });

  }

  moveToSideBar() {
    this.setState({
      user: this.state.user,
      sidebar: "side-bar"
    });
  }

  render() {
    var navBar;

    if (this.state.sidebar === "side-bar") {
      navBar = <div className={this.state.sidebar} style={ { height: this.state.height } }>
        <h1>{this.state.user.displayName + "'"}s Pairings</h1>
      </div>
    } else {
      var top = (this.state.height/2) - 131;
      navBar = <div className={this.state.sidebar} style={ { height: this.state.height, paddingTop: top } }><div style={{ width: "620px", margin: "0 auto" }}><h1>Welcome {this.state.user.displayName}</h1>
      <p>This is an app designed around food pairing. Press Enter to start exploring new custom recipies today!</p>
      <div className="start-button" onClick={() => { this.moveToSideBar(); }}>Enter</div></div>
      </div>;
    }

    return <div>{navBar}</div>
  }
}

ReactDOM.render(<AppComponent />, mountNode);
