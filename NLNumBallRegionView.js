/**
 * 每组选球区域定义: 一个玩法可以由多组选球区域构成;
 */

'use strict';

var React = require('react-native');
var {
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	View,
	Text,
	Image,
} = React;


var NLNumBallRegionView = React.createClass({
	getInitialState:function(){
		return {
			ballStates: [],
		};
	},

	//重置选球状态数组
	resetBallStates:function(ticketRegionNum){
		this.state.ballStates =[];

		for(var i=0; i<this.props.nums.length; i++){
			this.state.ballStates[i] = false;
		}

		//初始化时根据currentTicket初始化界面
		if(ticketRegionNum){
			for(var j=0; j<ticketRegionNum.length; j++){
				var index = parseInt(ticketRegionNum[j]);
				this.state.ballStates[index] = true;
			}
		}
	},

	componentWillMount:function(){
		this.resetBallStates(this.props.ticketRegionNum);
	},


	componentWillUpdate:function(nextProps,nextState){
		if(nextProps.ticketRegionNum != this.props.ticketRegionNum){
			this.resetBallStates(nextProps.ticketRegionNum);
		}
	},


	showMissButtonClicked:function(){
		alert('号码遗漏现已显示','每个号码下方的数字为该号码的遗漏值,如下所示');
	},


	onBallClicked:function(num){
		this.state.ballStates[num] = !this.state.ballStates[num];
		this.setState({
			ballStates:this.state.ballStates,
		});

		this.props.onPickBall.apply();
	},


	render:function(){
		//默认显示号码和遗漏标题提示
		var leftGroupName, leftMissName;
		if(this.props.showGroupName != false){
			leftGroupName = <NLNumRectArrowView 
								style={styles.arrowTipView} 
								title={this.props.groupName?this.props.groupName:'号码'} />;
		}

		if(this.props.showMissName != false){
			leftMissName = <NLNumRectArrowView 
								onClick={this.showMissButtonClicked}
								style={[styles.arrowTipView,{marginTop:8}]} 
								title={this.props.missName?this.props.missName:'遗漏'} />;
		}

		//计算球类区域
		var balls = [];
		var total = this.props.nums.length;
		var lineNum = this.props.lineNum;
		for(var i=0; i<total; i++){
			balls[i] = <NLNumBetBtnBall selected={this.state.ballStates[i]} 
										title={this.props.nums[i]} 
										onPress={this.onBallClicked.bind(this,i)} />;
		}
		var rows = parseInt((total + lineNum - 1) / lineNum);
		var isRowAll = (total % lineNum == 0) ? true:false;
		var rowBalls = [];
		for(var j=0; j<rows; j++){
			var rowLength = (j == rows-1 && !isRowAll)? j*lineNum+(total%lineNum):(j+1)*lineNum; 
			var rowColums = (j == rows-1 && !isRowAll)? (total%lineNum):lineNum; 
			rowBalls[j] = <View style={[styles.rowBall, {width:(35+10)*rowColums}]}>
							 {balls.slice(lineNum*j,rowLength)}
						  </View>;
		}

		return (
			<View style={styles.container}>
				<View style={{flex:1, flexDirection:'row'}}>
					<View style={styles.leftContainer}>
						{leftGroupName}
						{leftMissName}
					</View>
					<View style={styles.rightContainer}>
						<View style={{marginLeft:10, flexDirection:'column',width:(35+10)*lineNum}}>
							{rowBalls}
						</View>
					</View>
				</View>
				<View style={{flex:1, marginHorizontal:7.5, height:2}}>
					<Image style={{flex:1, resizeMode: Image.resizeMode.stretch}}
						   source={require('image!orderSeperatorLine')}>
					</Image>
				</View>
			</View>
		);
	},
});


/**
 * 箭头文字组件
 * props: 
 * 		onClick: 点击函数
 *		style: 箭头的摆放位置style
 *		title: 箭头上显示文字
 */
var NLNumRectArrowView = React.createClass({
	render:function(){
		return(
			<TouchableOpacity onPress={this.props.onClick}>
				<Image style={this.props.style} source={require('image!RectArrow')}>
					<View style={{flex:1,marginLeft:5, marginVertical:3, backgroundColor:'rgba(0,0,0,0)'}}>
						<Text style={{color:'#968b6d',fontSize:12.5,textAlign:'left'}}>
							{this.props.title}
						</Text>
					</View>
				</Image>
			</TouchableOpacity>
		);
	}
});


/**
 * 每个选球组件
 * props: 
 * 		showMiss: 是否显示遗漏信息
 *		selected: 是否选中,设置球的状态
 *		title: 	球的显示文字
 * 		onPress: 点击球的function
 */
var BetBallNormal = require('image!BetGrayBall');
var BetBallSel = require('image!BetRedBall');
var NLNumBetBtnBall = React.createClass({
	render:function(){
		var missView;
		if(this.props.showMiss != false){
			missView = <View style={{flex:1, marginHorizontal:5, backgroundColor:'rgba(0,0,0,0)'}}>
							<Text style={{fontSize:15, paddingTop:-4, textAlign:'center', color:'#968b6d'}}>
								--
							</Text>
						</View>;
		}

		return (
			<View style={{flex:1}}>
				<View style={{flex:1, flexDirection:'column'}}>
					<View style={{flex:1, marginHorizontal:5, backgroundColor:'rgba(0,0,0,0)'}}>
						<TouchableOpacity onPress={this.props.onPress}>
							<Image style={{width:35,height:40.5}}
								   source={this.props.selected?BetBallSel:BetBallNormal}>
							   <Text style={[{fontSize:18,textAlign:'center',marginVertical:6,color:'#c33f51'},this.props.selected==true?{color:'white'}:{}]}>
							   		{this.props.title}
							   </Text>
							</Image>
						</TouchableOpacity>
					</View>
					{missView}
				</View>
			</View>
		);
	}
});


//style
var styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column',
	},

	leftContainer:{
		width:50,
	},

	arrowTipView:{
		marginLeft:7.5,
		marginTop: 15,
		width:42.5,
		height:18.5,
	},

	rightContainer:{
		flex:1,
	},

	rowBall:{
		flex:1, 
		marginTop:6, 
		flexDirection:'row',
	},


});

module.exports = NLNumBallRegionView;