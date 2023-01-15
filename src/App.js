import 'antd/dist/reset.css';
import './App.css';
import { Component, Fragment } from 'react';
import { Card } from './Components/Card';
import { Modal } from './Components/Modal';
import { Route, Routes } from "react-router-dom";
import { ProductsDet } from './Components/ProductsDet';
import { List } from 'antd';
class App extends Component {
  constructor() {
    super();
    this.state = {
      rockets: [],
      selectedHeight: 0
    };
  }
  componentDidMount() {
    fetch("https://api.spacexdata.com/v4/rockets")
      .then((response) => response.json())
      .then((rockets) => this.setState({ rockets: rockets }));
  }
  handleChange = (e) => {
    this.setState({ selectedHeight: e.target.value });
  }

  render() {
    const { rockets, selectedHeight } = this.state;
    const filteredRockets = rockets.filter((list) =>
      list.height.feet > selectedHeight
    );
    return (
      <div className="container">
        <h1>SpaceX Rockets</h1>
        <Modal onChange={this.handleChange} />
        <div className="row">

          <Routes>
            <Route path='/' element=
              {filteredRockets.map((rocket) => (
                <Fragment>
                  <Card rocket={rocket} />


                  <div
                    className="modal fade"
                    id={"popup${rocket.id}"}
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog Modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Modal title
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div>
                    </div></div>
                </Fragment>
              ))}
            ></Route>
            <Route path="/:id" element={<ProductsDet />}></Route>
          </Routes>

        </div>
      </div>

    );
  }
}
export default App;

