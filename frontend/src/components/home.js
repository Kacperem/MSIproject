import React, { Component } from 'react';
import registration from './auth/Registration';

class home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <registration/>
            </div>
        );
    }
}

export default home;
