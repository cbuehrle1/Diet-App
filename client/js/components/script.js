if (window.FC === undefined) { window.FC = {}; }

(() => {

  class AppComponent extends React.Component {

    renderChildren() {
      this.setState({
        show: "show"
      });
    }

    render() {
      var children;

      if (this.state !== null && this.state.show === "show") {
         children = this.props.children;
         console.log(children);
      }

      return <div><FC.NavBar callback={() => { this.renderChildren(); }}/>
        {children}
      </div>
    }
  }

  FC.AppComponent = AppComponent;

})()
