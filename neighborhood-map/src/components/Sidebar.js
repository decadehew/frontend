import React, { Component } from 'react';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            filterMakers: []
        }
    }

    componentDidMount() {
        this.setState({
            filterMakers: this.props.markers
        })
    }


    search = (query) => {
        const { markers, infowindow } = this.props;
        const filterMarkers = [];
        this.setState({
            query: query
        });
        infowindow.close();
        markers.map((marker) => {
            if (marker.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                filterMarkers.push(marker)
                marker.setVisible(true);
                
            } else marker.setVisible(false);
        })
        this.setState({
            filterMakers: filterMarkers
        })

    }
    
    render() {
        const { locations, markers, openInfoWindow, infowindow } = this.props;
        const { filterMakers } = this.state;
        console.log(markers)
        console.log(locations)
        return (
            <div className="options-box">
                <h1>Find Taichung City</h1>
                <aside className="menu">
                    <p>
                        <input 
                            role="search"
                            aria-labelledby="filter"
                            className="input" 
                            type="text" 
                            placeholder="Search" 
                            value={this.state.query}
                            onChange={ (e) => this.search(e.target.value) }
                        />
                    </p>
                    <p className="menu-label">
                        Taichung
                    </p>
                    <ul className="menu-list">
                        {filterMakers && filterMakers.length && filterMakers.map((loc, i) => (
                            <li key={i+1}>
                                <a 
                                    tabIndex="0"
                                    role="button"
                                    onClick={ () => openInfoWindow(markers[i], infowindow) }
                                >{loc.title}</a>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        )
    }
}

export default Sidebar