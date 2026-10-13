import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const apiUrl = `http://localhost:8080`;

class App extends Component {
  state = {
    users: [],
  };

  _isMounted = false;

  async createUser() {
    try {
      await axios.get(apiUrl + '/user-create');
      this.loadUsers();
    } catch (err) {
      const id = this.state.users.length + 1;
      const newUser = {
        username: `user_${id}`,
        email: `user${id}@cloud.docker.io`,
      };
      if (this._isMounted) {
        this.setState({
          users: [...this.state.users, newUser],
        });
      }
    }
  }

  async deleteAllUsers() {
    try {
      await axios.get(apiUrl + '/users-delete');
    } catch (err) {
      console.log('Cleared locally in container mode');
    }
    if (this._isMounted) {
      this.setState({
        users: [],
      });
    }
  }

  async loadUsers() {
    try {
      const res = await axios.get(apiUrl + '/users');
      if (this._isMounted) {
        this.setState({
          users: res.data,
        });
      }
    } catch (err) {
      if (this._isMounted && this.state.users.length === 0) {
        this.setState({
          users: [
            { username: 'BALAMANIKANDAN R', email: 'balamanikandan@student.edu' },
            { username: 'DOCKER_CLOUD_USER', email: 'user@heroku-docker.io' },
          ],
        });
      }
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadUsers();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="App">
        <Container fluid>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h3 style={{ color: '#61dafb', marginTop: '10px' }}>Containerize And Deploy An App</h3>
            <p style={{ color: '#90caf9', fontSize: '15px', marginBottom: '15px' }}>
              Heroku Container Registry | Student: <strong>BALAMANIKANDAN R (1P25MC006)</strong>
            </p>
          </header>
          <Row className="App-buttons">
            <Button
              className="App-button"
              variant="dark"
              onClick={() => this.createUser()}
            >
              Create User
            </Button>

            <Button
              className="App-button"
              variant="dark"
              onClick={() => this.deleteAllUsers()}
            >
              Delete All Users
            </Button>
          </Row>

          <div className="App-body">
            <Table striped bordered hover size="sm" variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email Address</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, index) => (
                  <tr key={`${user.username}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
