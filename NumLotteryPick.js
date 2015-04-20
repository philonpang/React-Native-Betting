/**
 * 彩种选号页面
 */

 'use strict';

 var React = require('react-native');
 var {
  StyleSheet,
  ScrollView,
  LayoutAnimation,
 	View,
  TouchableOpacity,
 	Text,
 	Image,
  ActivityIndicatorIOS,
 } = React;

//require
 var Dimensions = require('Dimensions');
 var NLDeadLineView = require('./NLDeadLineView');
 var NLNumBoardPickView = require('./NLNumBoardPickView');
 var NLPickConfirmToolBar = require('./NLPickConfirmToolBar');
 var NLNumRandomBettingMenu = require('./NLNumRandomBettingMenu');
 var NLNumPlayTypesPopView = require('./NLNumPlayTypesPopView');

//component
 var NumLotteryPick = React.createClass({
 	//初始化当前彩种和当前选中玩法
 	getInitialState:function(){
 		return {
      isOpenPlayTypesView:false, //是否已经打开玩法选择页面
      isOpenRandomBettingMenu: false, //是否已经打开随机投注组件
      isShowBonusPredictView: false, //是否已经显示奖金预测页面
 			lottery: this.props.data.lottery, //当前彩种
 			currentPlayIndex: this.props.data.defaultPlayIndex, //当前选中玩法
      currentTicket: null, //当前生成订单
      numSectionsMap:{},   //当前彩种的选球模版
 		};
 	},

  componentWillMount:function(){
    //设置当前彩种的选球模版
    for(var i=0; i<this.state.lottery.numSections.length; i++){
      var numSection = this.state.lottery.numSections[i];
      this.state.numSectionsMap[numSection.sectionName] = numSection.numbers;
    }

    this.resetCurrentTicket();

    //设置titleButton点击事件
    this.props.data.titleControl.props.onPress = this.onTitleButtonPressed;
  },


  //重置当前选号和订单数组
  resetCurrentTicket:function(){
    this.setState({
        isShowBonusPredictView:false,
        currentTicket:{
          pickRegionNums:[],
          ticketNum: '',
          pickNum: -1,
          totalAmount: -1,
        },
      });
  },


  //选号变化，根据当前选号结果生成订单
  generateTicketOrder:function(){
    var pickRegionNums = this.refs['_boardPickView_'].state.pickRegionNums;
    var _currentPlayType = this.state.lottery.playTypes[this.state.currentPlayIndex];
    
    var totalNum = 1;
    var ticketStr = '';
    for(var i=0; i<pickRegionNums.length; i++){
      var regionNum = pickRegionNums[i];
      totalNum *= regionNum.length;
      var numSection = this.state.numSectionsMap[_currentPlayType.numBoard.numRegions[i].section]
      for(var j=0; j<regionNum.length; j++){
        ticketStr += numSection[regionNum[j]];
      }

      ticketStr += (i==pickRegionNums.length-1?'':' ');
    }

    //设置bonus显示动画
    if(!this.state.isShowBonusPredictView){
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.easeIn,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          delay: 100,
          type: LayoutAnimation.Types.easeIn,
        },
      });
    }

    this.setState({
      isShowBonusPredictView:totalNum>0?true:false,
      currentTicket:{
        pickRegionNums: pickRegionNums,
        ticketNum: ticketStr,
        pickNum: totalNum,
        totalAmount: totalNum*2,
      },
    });
  },


  //底部工具栏右侧按钮点击
  onConfirmBarLeftBtnClicked:function(){
    //当前已经有选球，清空订单
    if(this.state.currentTicket.ticketNum != ''){
      this.resetCurrentTicket();
      this.refs['_boardPickView_'].resetPickRegionNums.apply();
    }

    //点击进行机选
    else{
      if(!this.state.isOpenRandomBettingMenu){
        this.showOrHideRandomBettingPopoverMenu(true);
      }
    }
  },

  //底部工具栏右侧按钮点击
  onConfirmBarRightBtnClicked:function(){
    //当前订单为空空
    if(this.state.currentTicket.pickNum <= 0){
      this.refs['_boardPickView_'].shakeButtonOnClick.apply();
    }

    //跳转到订单确认页面
    else{
      alert('投注确认页待开发中~~~');
    }
  },


  //弹出或者隐藏机选浮层
  showOrHideRandomBettingPopoverMenu:function(openState){
    this.setState({
        isOpenRandomBettingMenu: openState,
    });
  },


  //通知选号面板随机投注N注
  notifyPickViewRandomBetting:function(num){
    var pickTickets = [];
    for(var i=0; i<num; i++){
       var pickTicket = this.refs['_boardPickView_'].randomPickOneBetNum.apply();
       if(pickTicket){
          pickTickets[i] = pickTicket;
       }
    }

    //goto 投注确认页
    alert(pickTickets);

    this.showOrHideRandomBettingPopoverMenu(false);
  },


  //点击TitleButton
  onTitleButtonPressed:function(){
    this.showOrHidePlayTypesPopView(true);
    this.props.data.titleControl.props.onPlayTypeChange.apply(
        this,
        [true,this.state.lottery.playTypes[this.state.currentPlayIndex].typeName]
    );
  },


  //弹出玩法选择页面
  showOrHidePlayTypesPopView:function(openState){
    this.setState({
        isOpenPlayTypesView: openState,
    });

    this.props.data.titleControl.props.onPlayTypeChange.apply(
        this,
        [openState,this.state.lottery.playTypes[this.state.currentPlayIndex].typeName]
    );
  },


  //选中某个玩法 index为玩法对应的index
  onChangePlayTypeSuccess:function(index){
    if(index != this.props.currentPlayIndex){
      this.setState({
        currentPlayIndex:index,
      });

      //更改玩法成功，重新设置ticket,并更新选号面板的状态
      this.resetCurrentTicket();
      this.refs['_boardPickView_'].resetPickRegionNums.apply();
    }

    this.showOrHidePlayTypesPopView(false);
  },


  //取消选中某个玩法
  onChangePlayTypeCancel:function(){
    this.showOrHidePlayTypesPopView(false);
  },


 	render:function(){
 		return (
      <ScrollView scrollEnabled={false}>
        <NLNumPlayTypesPopView isOpen={this.state.isOpenPlayTypesView} 
                      playTypes={this.state.lottery.playTypes} lineItem={3}
                      currentPlayTypeIndex={this.state.currentPlayIndex}
                      onChooseSuccess={this.onChangePlayTypeSuccess}
                      onChooseCancel={this.onChangePlayTypeCancel}/>
        <NLNumRandomBettingMenu isOpen={this.state.isOpenRandomBettingMenu} 
                      onBackTouch={this.showOrHideRandomBettingPopoverMenu.bind(this,false)}
                      onBettingMenuTouch={this.notifyPickViewRandomBetting}/>
        <View style={styles.container}>
          <NLDeadLineView gemeEn='ssc' />
          <View style={styles.pickContentView}>
            <NLNumBoardPickView ref='_boardPickView_'
                numSectionsMap={this.state.numSectionsMap} 
                playType={this.state.lottery.playTypes[this.state.currentPlayIndex]} 
                onPickChange={this.generateTicketOrder} />
          </View>
          <View style={styles.bottomView}>
              <NLPickConfirmToolBar 
                leftText={this.state.currentTicket.ticketNum != '' ? '清空':'机选'}
                leftTextColor={this.state.currentTicket.ticketNum != ''?{color:'white'}:{}}
                onLeftClick={this.onConfirmBarLeftBtnClicked}
                rightText='确定' 
                onRightClick={this.onConfirmBarRightBtnClicked}
                showTicket={true}
                ticket={this.state.currentTicket} />
          </View>
        </View>
        <NLNumPredictBonusView 
                style={this.state.isShowBonusPredictView?{opacity:1}:{opacity:0}} 
                amount={this.state.currentTicket.totalAmount} 
                minBonus={100000} 
                maxBonus={100000} />
      </ScrollView>
 		);
 	},
 });


/**
 * 奖金预测组件
 * props: 
 *     amount 订单金额
 *     minBonus 最小奖金
 *     maxBonus 最大奖金
 *
 */
 var NLNumPredictBonusView = React.createClass({
    getBonusText:function(amount, minBonus, maxBonus){
      var minProfit = minBonus - amount;
      var maxProfit = maxBonus - amount;
      var showBonusTxt = '';
      if(minBonus == maxBonus){
        showBonusTxt += '若中奖: 奖金 ' + minBonus + '元，';
      } else{
        showBonusTxt += '若中奖: 奖金 ' + minBonus + '至' + maxBonus + '元，';
      }

      if(maxProfit > 0){
        if(minProfit == maxProfit){
          showBonusTxt += '盈利 ' + maxProfit + '元';   
        } else {
          showBonusTxt += '盈利 ' + minProfit + '至' + maxProfit + '元';
        }
      } else {
        if(minProfit == maxProfit){
          if(maxProfit < 0.0){
            showBonusTxt += '亏损 ' + (-maxProfit) + '元';   
          } else{
            showBonusTxt += '盈利 ' + (maxProfit) + '元';   
          }
        } else{
          if(minProfit >= -0.00001){
            minProfit = -minProfit;
          } else {
            maxProfit = -maxProfit;
          }

          showBonusTxt += '亏损 ' + (-maxProfit) + '至' + (-minProfit) + '元';
        }
      }

      return showBonusTxt;
    },

    render:function(){
      return (
        <View style={[{
            left:0,
            top:Dimensions.get('window').height-64-44-30,
            width:Dimensions.get('window').width,
            height:30,
            position:'absolute',
            borderTopWidth:1,
            borderColor:'#ccc',
            backgroundColor:'white',
            overflow:'hidden',
            opacity:1,
          },this.props.style]}>
            <Image style={{flex:1}}
                   source={require('image!PredictBonusBack_new')}>
                <View style={{flex:1,marginLeft:16}}>
                  <Text style={{textAlign:'left',marginVertical:8, fontSize:13, color:'#3c3f47'}}>
                    {this.getBonusText(this.props.amount, this.props.minBonus, this.props.maxBonus)}
                  </Text>
                </View>
            </Image>
        </View>
      );
    },
 }); 


//style
 var styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white',
    },

    pickContentView:{
      height:Dimensions.get('window').height-44-64-20, 
      backgroundColor:'#f9f8f0',
    },

    bottomView:{
      height:44,
    },
 });

//exports
 module.exports = NumLotteryPick;
