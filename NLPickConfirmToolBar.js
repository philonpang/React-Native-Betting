/**
 * @providesModule NLPickConfirmToolBar
 * props:
 */

'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Image,
} = React;


var NLPickConfirmToolBar = React.createClass({
	getInitialState:function(){
		return {
			showTicket: true,	
		};
	},

	render:function(){
		return (
			<View style={styles.container}>
				<Image
					style={{flex:1,flexDirection:'row'}}
					source={require('image!ToolBarBackground')}>
					<View style={styles.clearButton}>
						<TouchableOpacity onPress={this.props.onLeftClick}>
							<Image 
								style={{width:58,height:33}}
								source={require('image!ToolBarClear')}>
								<Text style={[styles.buttonText,this.props.leftTextColor]}>{this.props.leftText}</Text>
							</Image>
						</TouchableOpacity>
					</View>
					<View style={styles.middleView}>
						<View style={this.props.showTicket?styles.ticketLabel_show:styles.ticketLabel_hide}>
							<Text style={styles.labelText}>{this.props.showTicket?this.props.ticket.ticketNum:''}</Text>
						</View>
						<View style={styles.numsLabel}>
							<Text style={styles.labelText}>{this.props.ticket.pickNum!=-1?'共'+ this.props.ticket.pickNum +'注 ':''}
								<Text style={{color:'#f3ce6b'}}> {this.props.ticket.totalAmount!=-1?this.props.ticket.totalAmount+'元':''}</Text>
							</Text>
						</View>
					</View>
					<View style={styles.okButton}>
						<TouchableOpacity onPress={this.props.onRightClick}>
							<Image 
								style={{width:58,height:33}}
								source={require('image!ToolBarOk')}>
								<Text style={[styles.buttonText, {color:'rgba(87,5,5,1)'}]}>{this.props.rightText}</Text>
							</Image>
						</TouchableOpacity>
					</View>
				</Image>
			</View>
		);
	},
});

var styles = StyleSheet.create({
	container:{
		flex:1,
	},

	clearButton:{
		marginLeft:8,
		width:58,
		marginVertical: 5.5,
		backgroundColor: 'rgba(0,0,0,0)',
	},

	middleView:{
		flex:1,
		flexDirection:'column',
		backgroundColor:'rgba(0,0,0,0)',
	},

	okButton:{
		marginRight:8,
		width:58,
		marginVertical:5.5,
		backgroundColor:'rgba(0,0,0,0)',
	},

	buttonText:{
		fontSize:18,
		textAlign:'center',
		color:'#f9b02f',
		marginVertical:6,
	},

	numsLabel:{
		height:22,
	},

	ticketLabel_show:{
		height:20,
	},

	ticketLabel_hide:{
		height:11,
	},

	labelText:{
		fontSize:17,
		textAlign:'center',
		color:'white',
		backgroundColor:'rgba(0,0,0,0)',
	},
});

module.exports = NLPickConfirmToolBar;

