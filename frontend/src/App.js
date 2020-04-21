import React, {Fragment} from 'react';
import Welcome from './Welcome';
import Home from './Home';
import Particles from 'react-particles-js';
import styles from './app.module.css';

const particlesParams = {
    "particles": {
      "number": {
        "value": 125,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": '#ffffff'
      },
      "shape": {
        "type": "polygon",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            isLogged: true
        }
        this.handleChangeLogStatus = this.handleChangeLogStatus.bind(this);
    }
    handleChangeLogStatus(userInfo, isLogged) {
        this.setState({
          userInfo: userInfo,
          isLogged: isLogged
        })
    }
    render() {
        return (
            <Fragment>
                <Particles params={particlesParams} className={styles.particles}/>
                {this.state.isLogged? <Home handleChangeLogStatus={this.handleChangeLogStatus} userInfo={this.state.userInfo} />:
                <Welcome handleChangeLogStatus={this.handleChangeLogStatus}/>}
            </Fragment>
        )
    }
}

export default App;
