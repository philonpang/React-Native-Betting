/**
 * @providesModule DeadLineView
 * props:
 * 		hasBottomLine: true和默认有下滑分割线
 *		gameEn: 当前打开的彩种Code
 * 暂不实现底部阴影和点击下拉的按钮
 */

'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View, 
	Text,
} = React;

var NLDeadLineView = React.createClass({
	getInitialState:function(){
		return {
			issueInfo: null,
		};
	},

	componentDidMount:function(){
		this.getNewInfoByGame(this.props.gameEn);
	},

	//获取关于某个彩种的期次信息, 并更新当前截止日期信息
	getNewInfoByGame:function(gameEn:String){
		//fix me: 从服务器获取期次信息暂缓
		var success = true;
		var newIssueInfo = {
			issue:'20150410090',
			colonTimeString:'09:10',
		};

		//获取彩种期次信息成功
		if(success){
			this.setState({
				issueInfo: newIssueInfo,
			});
		} 
		else{

		}
	},


	render:function(){
		//默认有分割线
		var bottomLine;
		if( typeof this.props.hasBottomLine == 'undefined' || this.props.hasBottomLine == true){
			bottomLine = <View style={styles.bottomLine} />;
		}

		//根据issueInfo信息设置显示文字
		var deadLineText = null;
		var issueInfo = this.state.issueInfo;
		if(issueInfo){
			if(!issueInfo.issue){
				deadLineText = <Text style={styles.tipText}>当前期次已截止,请等待下期</Text>;
			}else if(issueInfo.colonTimeString){
				 deadLineText = <Text style={styles.tipText}>距{issueInfo.issue.substring(issueInfo.issue.length-3)}期截止:
	 								<Text style={styles.timeText}>{issueInfo.colonTimeString}</Text>
	 							</Text>;
			}else if(issueInfo.colonOpenTimeString){
				deadLineText = <Text style={styles.tipText}>距{issueInfo.issue.substring(issueInfo.issue.length-3)}期开售:
	 								<Text style={styles.timeText}>{issueInfo.colonOpenTimeString}</Text>
	 							</Text>;
			} else {
				deadLineText = <Text style={styles.tipText}>当前期次已截止,请等待下期</Text>;
			}
		}else{
			deadLineText = <Text style={styles.tipText}>未能获取彩期</Text>;
		}
		
 		return (
 			<View style={styles.container}>
 				<View style={styles.textContainer}>
 					{deadLineText}
 				</View>
 				{bottomLine}
    		</View>
 		);
 	},
});

var styles = StyleSheet.create({
	container:{
		height:20,
		flex:1,
		flexDirection:'column',
		backgroundColor:'white',
		justifyContent:'center',
	},

	textContainer:{
		flex:39,
		backgroundColor:'white',
	},

	bottomLine:{
		flex:1,
		backgroundColor:'#c9c2b8',
	},

	tipText:{
		backgroundColor:'rgba(0,0,0,0)',
		textAlign:'center',
		color:'#3c3f47',
		marginVertical:2,
		fontSize:13,
	}, 

	timeText:{
		color: '#c33f51',
	}
});

module.exports = NLDeadLineView;