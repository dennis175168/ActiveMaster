var React = require('react')

var App = React.createClass({
	render: function(){
		return (
			<div>
				<h1>{this.props.hola}</h1>
				<p>With Hot Reload of course :)</p>
			</div>
		)
	}
})

// Export the App 
module.exports = App;