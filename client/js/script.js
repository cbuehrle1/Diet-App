var mountNode = document.querySelector('#react-root');

class AppComponent extends React.Component {
  render() {return <div>REACHED THE SPA</div>;
  }
}

ReactDOM.render(<AppComponent />, mountNode);
