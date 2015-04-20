/**
 * 机选投注组件
 */

'use strict';

var React = require('react-native');
var {
	StyleSheet,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Text,
 	Image,
} = React;

var Dimensions = require('Dimensions');
var Overlay = require('react-native-overlay');

var menuItems =[
	'1',
	'5',
	'10',
];
var NLNumRandomBettingMenu = React.createClass({
	render:function(){
		return(
			<Overlay isVisible={this.props.isOpen}>
	            <TouchableOpacity onPressIn={this.props.onBackTouch}>
	            <View style={styles.container} >
			         <TouchableWithoutFeedback>
			         	<Image style={styles.menuBackImage}
			         		   source={require('image!random_select_menu_bg')}>
			         	<View style={{flex:1,marginBottom:10, flexDirection:'column'}}>
			         		{this.renderMenuButtons()}
			         	</View>
			         	</Image>
			         </TouchableWithoutFeedback>
	            </View>
	            </TouchableOpacity>
        	</Overlay>
		);
	},

	renderMenuButtons:function(){
		var menuButtons = [];
		for(var i=0; i<menuItems.length; i++){
			var imgIcon = (i==0? require('image!random_select_menu_icon1'):
						   i==1? require('image!random_select_menu_icon5'):
						   require('image!random_select_menu_icon10'));
			var menuButton = <View style={styles.menuButtonItem} >
								<TouchableWithoutFeedback onPressIn={this.props.onBettingMenuTouch.bind(this,parseInt(menuItems[i]))}>
								<View style={{flex:1,flexDirection:'row'}}>
									<Image style={{marginHorizontal:10,width:35.5,height:29,marginVertical:7.5}}
										   source={imgIcon} />
									<View style={{flex:1,justifyContent:'center'}}>
										<Text style={{color:'#5e6064', textAlign:'left', fontSize:18, fontWeight:'bold'}}>
											{parseInt(menuItems[i]) < 10 ? '  ':' '}{menuItems[i]}注
										</Text>
									</View>
								</View>
								</TouchableWithoutFeedback>
								<View style={{height:1,marginHorizontal:5, backgroundColor:i==menuItems.length-1?'white':'#e0dbd7'}} />
							 </View>;
			menuButtons[i] = menuButton;
		}

		return menuButtons;
	}

});

var styles = StyleSheet.create({
	container:{
		backgroundColor:'rgba(0,0,0,0)', 
		flex:1, 
	    height:Dimensions.get('window').height,
		width:Dimensions.get('window').width,
	},

	menuBackImage:{
		left:10,
		top: Dimensions.get('window').height-44-145,
		width:101,
		height:145,
	},

	menuButtonItem:{
		flex:1,
		flexDirection:'column',
	},
});

module.exports = NLNumRandomBettingMenu;

