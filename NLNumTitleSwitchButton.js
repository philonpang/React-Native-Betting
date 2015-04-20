/**
 * @providesModule NRTitleSwitchButton
 */

 'use strict';

 var React = require('react-native');
 var {
 	View,
 	StyleSheet,
 	Image,
 	ImageResizeMode,
 	Text,
 } = React;

var NRButton = require('./Custom/NRButton');
var NLNumTitleSwitchButton = React.createClass({
	getInitialState:function(){
		return{
			isPressed:false, //是否已经点击titleButton
			playTypeName: this.props.playTypeName, //当前的玩法名称
		};
	},

	//重新定制玩法改变消息的bind函数
	componentWillMount:function(){
		this.props.onPlayTypeChange = this.onPlayTypeChange;
	},


	//接受玩法状态通知，修改当前titleComponent的UI
	onPlayTypeChange:function(isPressed, playTypeName){
		this.setState({
			isPressed: isPressed,
			playTypeName: playTypeName,
		});
	},


	render: function(){
		return (
			<View style={{marginVertical: 5}}>
				<Image 
 					style={styles.backImage} 
 					capInsets={{top:0,left:60,bottom:0,right:20}}
 					source={require("image!button_background_bettingControllerTitle")}>
					<NRButton 
						style={styles.titleButton} 
						onPress={this.props.onPress}>
						{this.state.playTypeName}
					</NRButton>
					<Image style={styles.arrowImage} 
						   source={this.state.isPressed?require("image!YellowDownArrowUp"):require("image!YellowDownArrow")} /> 
				</Image>
			</View>
		);
	}
});



var styles = StyleSheet.create({
	backImage:{
		flex:1,
		height:30,
		resizeMode:Image.resizeMode.stretch,
		alignSelf:'center',
		flexDirection:'row',
	},

	arrowImage:{
		marginTop:12,
		marginRight:5,
		width:25/2,
		height:17/2,
	},

	titleButton:{
		marginVertical:5,
		marginLeft:20,
		marginRight:5,
		color:'white',
        fontSize: 18,
        fontWeight: '500',
        flex: 2,
        textAlign: 'left'
	},
});

module.exports = NLNumTitleSwitchButton;

