import React, { Component } from 'react';
import Sidebar from './Sidebar';
class Nav extends Component {
    render() {
        const { active, onActive, locations, markers, infowindow, openInfoWindow } = this.props;
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="#">
                        <img src="decade-logo.svg" alt="DecadeLogo"  />
                    </a>

                    <a 
                        role="button" 
                        className={`navbar-burger  ${active} `} 
                        aria-label="menu" aria-expanded="false"
                        onClick={() => onActive() }
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className={`navbar-menu ${active}`}>
                    <Sidebar
                        locations={locations} 
                        markers={markers}
                        infowindow={infowindow}
                        openInfoWindow={openInfoWindow}
                    />
                </div>
            </nav>
        )
    }
}

export default Nav;