import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			map: "",
			infowindow: "",
			markers: [],
			locations: [
				{ title: 'Yishu Street District', location: { lat: 24.188353, lng: 120.593278 } },
				{ title: 'Feng Chia Night Market', location: { lat: 24.181051, lng: 120.646311 } },
				{ title: 'Tunghai University', location: { lat: 24.179819, lng: 120.604503 } },
				{ title: 'Taichung Train Station', location: { lat: 24.137448, lng: 120.684214 } },
				{ title: 'Yizhong Street Night Market', location: { lat: 24.150782, lng: 120.685551 } },
				{ title: 'Park Lane by CMP', location: { lat: 24.15154, lng: 120.663891 } }				
			],
			isActive: false
		}
		this.initMap = this.initMap.bind(this);
		// this.getMarkerInfo = this.getMarker.bind(this);
		// this.openInfoWindow = this.openInfoWindow(this);
	}
	componentDidMount() {
		window.initMap = this.initMap;
		loadMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyCjPG2DQlveUQKSCoADJpItCKGGNsT6zrw&libraries=geometry&v=3&callback=initMap")
	}
	initMap = () => {
		const self = this;
		const map = new window.google.maps.Map(document.getElementById('map'), {
			center: { lat: 24.182292, lng: 120.584257 },
			zoom: 13,
			mapTypeControl: false
		});
		const infowindow = new window.google.maps.InfoWindow();
		const bounds = new window.google.maps.LatLngBounds();

		this.setState({
			map: map,
			infowindow: infowindow
		});
		this.getMarker(map, bounds)

	}

	getMarker = (map, bounds) => {
		const self = this;
		const markers = this.state.markers;
		this.state.locations.map((loc) => {
			const marker = new window.google.maps.Marker({
                position: loc.location,
                map: map,
				title: loc.title,
				animation: window.google.maps.Animation.DROP,
			});

			marker.addListener('click', function() {
				self.openInfoWindow(marker, self.state.infowindow);
			})
			bounds.extend(marker.position);
			markers.push(marker);
			this.setState({
				markers: markers
			})
			
			
		})
		
		map.fitBounds(bounds);

	}

	openInfoWindow = (marker, infowindow) => {
		if(infowindow.marker !== marker) {
			infowindow.setContent('Loading...');
			infowindow.marker = marker;
			infowindow.open(this.state.map, marker)
			// Make sure the marker property is cleared if the infowindow is closed.
			infowindow.addListener('closeclick', function () {
				infowindow.marker = null;
			});
			this.markerinfo(marker)
		}
	}

	markerinfo = (marker) => {
		const infowindow = this.state.infowindow;
		// FourSquare API key
		const CliendID = "XLREHLPPFDOGINF30XEVMIRYHLNGRU2MZQF2OWV3XTLNFT2H";
		const ClientSECRET = "FQCJIFDXGPXKCJUX4ZOYURS4UPJGNIZELDQGRF0GDTCS0VQO";
		const url = `https://api.foursquare.com/v2/venues/search?client_id=${CliendID}&client_secret=${ClientSECRET}&v=20130815&ll=${marker.getPosition().lat()},${marker.getPosition().lng()}&limit=1`;
		fetch(url).then((res) => {
			if(res.status !== 200) {
				this.state.infowindow.setContent("Can't load data!!!")
			}
			res.json().then((data) => {
				const place = data.response.venues[0];

				const info = `
					<div>
						<h3>${infowindow.marker.title}</h3>
						<p>${place.location.address}</p>
					</div>
				`
				infowindow.setContent(info);
			})
			.catch(function (err) {
                infowindow.setContent("Can't load data.");
            });
		})
	}

	onActive = () => {
		this.setState({
			isActive: !this.state.isActive
		})
	}
	render() {
		const active = this.state.isActive ? 'is-active' : '';
		return (
			<div className="">
				<nav class="navbar" role="navigation" aria-label="main navigation">
					<div class="navbar-brand">
						<a class="navbar-item" href="https://bulma.io">
							<img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
						</a>

						<a role="button" class={`navbar-burger  ${active} `} aria-label="menu" aria-expanded="false"
							onClick={(e) => this.onActive() }
						>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</a>
					</div>
					<div class={`navbar-menu ${active}`}>
						<Sidebar
							locations={this.state.locations} 
							markers={this.state.markers}
							infowindow={this.state.infowindow}
							openInfoWindow={this.openInfoWindow}
						/>
					</div>
				</nav>
				<div className="columns is-mobile">
					<Sidebar
						locations={this.state.locations} 
						markers={this.state.markers}
						infowindow={this.state.infowindow}
						openInfoWindow={this.openInfoWindow}
					/>
					<div id="map" className="column is-8"></div>
				</div>
			</div>
		);
	}
}

function loadMap(src) {
	var ref = window.document.getElementsByTagName("script")[0];
	var script = window.document.createElement("script");
	script.src = src;
	script.async = true;
	script.onerror = function() {
	  document.write("Google Maps can't be loaded");
	};
	ref.parentNode.insertBefore(script, ref);
}

export default App;
