/**
 * 玩法选择界面
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

var NLNumPlayTypesPopView = React.createClass({
	getInitialState:function(){
		return {
			selectIndex:this.props.currentPlayTypeIndex,
		};
	},

	onChoosePalyTypeChange:function(index){
		if(index >= this.props.playTypes.length) return;
		if(index != this.state.selectIndex){
			this.setState({
				selectIndex:index,
			});

			this.props.onChooseSuccess.apply(this,[index]);
		}
	},

	render:function(){
		var rows = parseInt((this.props.playTypes.length + this.props.lineItem-1)/this.props.lineItem);
		var screenWidth = Dimensions.get('window').width;
		var marginHorizontal = (screenWidth - this.props.lineItem*98.5 - (this.props.lineItem-1)*8.0)/2;
		return(
			<Overlay isVisible={this.props.isOpen}>
	            <TouchableOpacity onPressIn={this.props.onChooseCancel}>
	            <View style={styles.container} >
		         	<TouchableWithoutFeedback>
		         	<Image style={{marginTop:44+20,height:12+8+(31+8)*rows}}
		         		   capInsets={{top:0,left:0,bottom:10,right:0}}
		         		   source={require('image!BetPopBack')}>
		         		<View style={{flex:1, flexDirection:'column', marginTop:12, marginBottom:8, marginHorizontal:marginHorizontal}}>
		         			{this.renderButtonView(this.props.playTypes, rows, this.props.lineItem, this.state.selectIndex)}
		         		</View>
		         	</Image>
			        </TouchableWithoutFeedback>
	            </View>
	            </TouchableOpacity>
        	</Overlay>
		);
	},

	//lineItem必须小于3
	renderButtonView:function(titleItems, rows, lineItem, currentItemIndex){
		//生成所有的选法按钮
		var buttonViews = [];
		for(var i=0; i<titleItems.length; i++){
			var aligItems = i%lineItem==0?'flex-start':i%lineItem==(lineItem-1)?'flex-end':'center';
			var isCurrent = currentItemIndex == i ? true:false;
			buttonViews[i] = <PlayTypeButton 
									style={{flex:1, alignItems:aligItems}} 
									title={titleItems[i].typeName}
									onPressIn={this.onChoosePalyTypeChange.bind(this,i)}
									selected={isCurrent}/>
		}

		//生成每行的button
		var rowButtonViews = [];
		var isRowAll = (titleItems.length % lineItem == 0) ? true:false;
		for(var j=0; j<rows; j++){
			var rowLength = (j == rows-1 && !isRowAll)? j*lineItem+(titleItems.length%lineItem):(j+1)*lineItem; 
			var rowColums = (j == rows-1 && !isRowAll)? (titleItems.length%lineItem):lineItem; 
			rowButtonViews[j] = <View style={{
									flex:1, 
									flexDirection:'row', 
									width:(lineItem*98.5+8*(lineItem-1))*rowColums/lineItem}}>
									{buttonViews.slice(j*lineItem, (j+1)*lineItem)}
						  		</View>;
		}

		return rowButtonViews;
	},
});


var PlayTypeButton = React.createClass({
	render:function(){
		var backImg = this.props.selected == true ? 
						require('image!BetPopItemSel') :
						require('image!BetPopItem');
		var txtColor = this.props.selected == true ? '#c33f51':'#4e4234';
		return (
			<View style={this.props.style}>
				<TouchableWithoutFeedback onPressIn={this.props.onPressIn}>
				<Image style={{width:98.5, height:31.0}}
					source={backImg}>
					 <View style={{flex:1, backgroundColor:'rgba(0,0,0,0)'}}>
					 	<Text style={{color:txtColor,fontSize:14, textAlign:'center', marginVertical:8.5}}>
					 		{this.props.title}
					 	</Text>
					 </View> 
				</Image>
				</TouchableWithoutFeedback>
			</View>
		);
	},
});



var styles = StyleSheet.create({
	container:{
		backgroundColor:'rgba(0,0,0,0)', 
		flex:1, 
	    height:Dimensions.get('window').height,
		width:Dimensions.get('window').width,
	},	

	buttonView:{
		width:98.5,
		height:31.0,
	},

});

module.exports = NLNumPlayTypesPopView;