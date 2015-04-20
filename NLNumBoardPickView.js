/**
 * 某个玩法的选球区域
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

var NLNumBallRegionView = require('./NLNumBallRegionView');

var NLNumBoardPickView = React.createClass({
	getInitialState:function(){
		return {
			numSectionsMap:this.props.numSectionsMap, 	 //当前彩种的选球模版
			pickRegionNums:[], //当前玩法的选球
		};
	},

	
	componentWillMount:function(){
		this.resetPickRegionNums();
	},


	//重置选区记录数组
	resetPickRegionNums:function(){
		//初始化一个选球选中数组
		var pickRegionNums  = [];
		for(var i=0; i<this.props.playType.numBoard.numRegions.length; i++){
			pickRegionNums[i] = [];
		}
		this.setState({
			pickRegionNums: pickRegionNums,
		});
	},

	//随机挑选1注
	randomPickOneBetNum:function(){
		var pickRegionNums = [];
		for(var i=0; i<this.props.playType.numBoard.numRegions.length; i++){
			var numRegion = this.props.playType.numBoard.numRegions[i];
			var sectionNums = this.state.numSectionsMap[numRegion.section];
			var index = parseInt(Math.random()*sectionNums.length);
			pickRegionNums[i] = index.toString();
		}

		return pickRegionNums;
	},


	//点击摇一摇
	shakeButtonOnClick:function(){
		for(var i=0; i<this.props.playType.numBoard.numRegions.length; i++){
			this.state.pickRegionNums[i]=[];
			var numRegion = this.props.playType.numBoard.numRegions[i];
			var sectionNums = this.state.numSectionsMap[numRegion.section];
			var index = parseInt(Math.random()*sectionNums.length);
			this.state.pickRegionNums[i] = index.toString();
		}

		this.setState({
			pickRegionNums: this.state.pickRegionNums,
		});

		this.props.onPickChange.apply();
	},


	//选中某个球之后更新选中球的数组
	//对于parent-child的组件，通过传入function的方法进行状态的返回交互
	//在child组件通过this.props.function.apply()执行
	onNumBoardPickBallClicked:function(regionNum, regionRefID,sectionName){
		this.state.pickRegionNums[regionNum]=[];
		var regionBallStates = this.refs[regionRefID].state.ballStates;
		for(var i=0; i<regionBallStates.length; i++){
			if(regionBallStates[i]){
				this.state.pickRegionNums[regionNum].splice(0,0,i);
			}
		}

		//通知父组件更新ticket
		this.props.onPickChange.apply();
	},

	render:function(){
		var playTipText = this.props.playType.numBoard.playTip;
		return (
			<ScrollView  automaticallyAdjustContentInsets={false} scrollEnabled={true}>
				<View style={styles.container}>
					<View style={styles.boardHeader}>
						<TouchableOpacity onPress={this.shakeButtonOnClick}>
							<Image style={styles.shakeImage}
								   source={require('image!button_bet_shake_new')}>
							</Image>
						</TouchableOpacity>
						<View style={styles.winRuleLabel}>
							<Text style={styles.winRuleLabelText}>
								{playTipText.substring(0,playTipText.indexOf('#'))}
								<Text style={{color:'#c33f51'}}>
								10000
								</Text>{playTipText.substring(playTipText.indexOf('#')+1)}
							</Text>
						</View>
					</View>
					<View style={styles.boardMain}>
						{this.renderNumRegionViews()}
					</View>
					<View style={{height:30}} />
				</View>
			</ScrollView>
		);
	},

	//生成选球区域view
	renderNumRegionViews:function(){
		var numRegionViews = [];
		for(var i=0; i<this.props.playType.numBoard.numRegions.length; i++){
			var numRegion = this.props.playType.numBoard.numRegions[i];
			var ref_i = 'numRegionView_' + i ;
			numRegionViews[i] = <NLNumBallRegionView ref={ref_i}
									nums={this.state.numSectionsMap[numRegion.section]} 
									ticketRegionNum={this.state.pickRegionNums[i]}
									lineNum={this.props.playType.numBoard.lineNum} 
									onPickBall={this.onNumBoardPickBallClicked.bind(this,i,ref_i,numRegion.section)}
									groupName={numRegion.name} />
		}

		return numRegionViews;
	},

});

//style
var styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column',
	},

	boardHeader:{
		flex:1,
		flexDirection:'column',
	},

	shakeImage:{
		marginTop:5,
		width:103.5,
		height:36,
	},

	winRuleLabel:{
		marginLeft:7,
		marginTop:3,
		height:20,
	},

	winRuleLabelText:{
		backgroundColor:'rgba(0,0,0,0)', 
		fontSize:13,
		textAlign:'left', 
		color:'#3c3f47',
	},

	boardMain:{
		flex:1,
	}	

});

module.exports = NLNumBoardPickView;