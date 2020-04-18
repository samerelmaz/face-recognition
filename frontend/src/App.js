import React from 'react';
import Login from './Login';
import Register from './Register';
import Home from './Home';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevView: 'welcome',
            view: 'welcome',
            userInfo: {}
        }
        this.handleViewChange = this.handleViewChange.bind(this);
        this.handleGetUserInfo = this.handleGetUserInfo.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }
    handleViewChange(newView) {
        this.setState(prevState => {
            return {
                prevView: prevState.view,
                view: newView
            }
        })
    }
    handleGetUserInfo(userInfo) {
        this.setState({
            userInfo: userInfo
        })
    }
    handleBackClick() {

    }
    render() {
        return (
            <Fragment >
                {this.state.view === 'welcome'? <Welcome handleViewChange={this.handleViewChange}/> :
                 this.state.view === 'register'? <Register handleViewChange={this.handleViewChange} handleGetUserInfo={this.handleGetUserInfo}/> :
                 this.state.view === 'login'? <Login handleViewChange={this.handleViewChange} handleGetUserInfo={this.handleGetUserInfo}/> :
                 <Home handleViewChange={this.handleViewChange} userInfo={this.state.userInfo}/>}
            </Fragment>
        )
    }
}

export default App;
