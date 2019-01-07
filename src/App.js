import React, {Component} from 'react'
import axios from 'axios'
import {Button} from '@material-ui/core'
import {Rides} from './Rides'
import RideForm from './RideForm'
import './css/App.css'
import Header from './Header'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.listRides()
  }

  done = (errorMessage) => {
    this.setState({
      errorMessage: errorMessage,
      enteringRide: false
    })
    this.listRides()
  }

  listRides = () => {
    const config = {
      baseURL: `https://${process.env.REACT_APP_API_HOST}/${process.env.REACT_APP_API_STAGE}`,
      url: 'rides',
      method: 'get',
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY
      }
    }
    axios(config)
      .then(
        (res) => {
          this.setState({
            rides: res.data,
            enteringRide: false
          })
      })
      .catch(
        (err) => {
          this.setState({
            enteringRide: false,
            errorMessage: `cannot retrieve rides - ${err}`
          })
      })
  }

  addRide = () => {
    this.setState({
      enteringRide: true
    })
  }

  render() {
    return (
      <div className="App">
          <Header/>
          {!this.state.enteringRide &&
              <Button onClick={this.addRide}>
                Share another ride
              </Button>
          }
          {this.state.enteringRide &&
            <RideForm method='post' done={this.done}/>
          }
          <Rides list={this.state.rides}
                update={this.done}
                />
          {this.state.errorMessage &&
            <p className='error'>
              {this.state.errorMessage}
            </p>
          }
        <h3>
          Ride sharing is the future. Check out some of the other initiatives.
        </h3>
        <iframe
          title='background information'
          width="560"
          height="615"
          src="https://www.gocarma.com/news/"
          frameBorder="0"
        />
      </div>
    )
  }
}

export default App
