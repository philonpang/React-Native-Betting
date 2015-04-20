'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View,
	Text,
} = React;

var NRPopChooseView = React.createClass({
	render:function(){
 		return (
 			<View style={styles.container}>
 				<Text>hello,chooseView</Text>
 			</View>
 		);
 	},
});


var styles = StyleSheet.create({
	container :{
 		height:450,
 		flex:1,
 		backgroundColor: 'blue',
 	},
});

module.exports = NRPopChooseView;