import { Component } from "react";
import "bulma/css/bulma.min.css";
import "./App.css";

let inputStyle = {
  color: "blue",
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      userSubmit: [],
      userOptions: [
        {
          name: "All",
          value: null,
        },
        {
          name: "Completed",
          value: this.handleComplete,
        },
        {
          name: "Uncompleted",
          value: this.handleAdd,
        },
      ],
    };
  }

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };

  handleAdd = () => {
    let { userSubmit, userInput } = this.state;
    userSubmit.push(userInput);
    this.setState({
      userSubmit: userSubmit,
      userInput: "",
    });
  };

  handleComplete = (name) => {
    let styleInput = { color: "red" };
    this.setState((state) => ({
      userSubmit: state.userSubmit.map((item, index) => {
        if (item === name) {
          return (
            <p key={index} style={styleInput}>
              {item}
            </p>
          );
        }
        return item;
      }),
    }));
  };

  handleSelect = (e) => {
    const index = e.target.value;
    const getOptions = this.state.userOptions[index];
    this.setState({
      userSubmit: getOptions.value,
    });
  };

  render() {
    console.log("submit =>", this.state.userSubmit);
    const { userSubmit } = this.state;
    let newSub = userSubmit.map((item, index) => {
      return (
        <p key={index} style={inputStyle}>
          {item}
          <button
            type="button"
            className="button"
            onClick={() => this.handleComplete(item)}
          >
            complete
          </button>
        </p>
      );
    });
    return (
      <div>
        <section className="section">
          <div className="container">
            <h1 className="header">
              <strong>Enter your activities</strong>
            </h1>
            <input
              className="input"
              type="text"
              value={this.state.userInput}
              onChange={this.handleChange}
            />
            <button className="button" onClick={this.handleAdd}>
              Submit
            </button>
            <div className="select">
              <select onChange={this.handleSelect}>
                {this.state.userOptions.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <div>
              <h3 className="header">
                <strong>My "To-Do" List</strong>
              </h3>
              {newSub}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
