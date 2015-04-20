/**
 * 彩种列表page
 */

 'use strict';

 var React = require('react-native');
 var {
  StyleSheet,
  ListView,
 	View,
 	Text,
 	PixelRatio,
 	TouchableHighlight,
 } = React;

 //reuire选项
 var NumLotteryPick = require('./NumLotteryPick');
 var NLNumTitleSwitchButton = require('./NLNumTitleSwitchButton');

 //数字彩数据
 var NumberLotterys = [
    {
      code : 'ssc',
      name : '时时彩',
      numSections:[
        {
          sectionName:'redball',
          numbers:['0','1','2','3','4','5','6','7','8','9'],
        },
        {
          sectionName:'bigSmall',
          numbers:['大','小','单','双'],
        },
      ],
      playTypes: [
        {
          typeCode: 'WXTX',
          typeName: '五星通选', 
          numBoard: {
            playTip:'每位至少选1个号，按位猜对开奖号最高奖#元',
            lineNum:5,
            numRegions:[
              {
                key:'WAN',
                name:'万位',
                section:'redball',
              },
              {
                key:'QIAN',
                name:'千位',
                section:'redball',
              },
              {
                key:'BAI',
                name:'百位',
                section:'redball',
              },
              {
                key:'SHI',
                name:'十位',
                section:'redball',
              },
              {
                key:'GE',
                name:'个位',
                section:'redball',
              },
            ],
          }
        },
        {
          typeCode: 'WXZX',
          typeName: '五星直选', 
          numBoard: {
            playTip:'每位至少选1个号，按位猜对开奖号最高奖#元',
            lineNum:5,
            numRegions:[
              {
                key:'WAN',
                name:'万位',
                section:'redball',
              },
              {
                key:'QIAN',
                name:'千位',
                section:'redball',
              },
              {
                key:'BAI',
                name:'百位',
                section:'redball',
              },
              {
                key:'SHI',
                name:'十位',
                section:'redball',
              },
              {
                key:'GE',
                name:'个位',
                section:'redball',
              },
            ],
          }
        },
        {
          typeCode: 'SXZX',
          typeName: '四星直选', 
          numBoard: {
            playTip:'每位至少选1个号，按位猜对开奖后4位最高奖#元',
            lineNum:5,
            numRegions:[
              {
                key:'QIAN',
                name:'千位',
                section:'redball',
              },
              {
                key:'BAI',
                name:'百位',
                section:'redball',
              },
              {
                key:'SHI',
                name:'十位',
                section:'redball',
              },
              {
                key:'GE',
                name:'个位',
                section:'redball',
              },
            ],
          }
        },
        {
          typeCode: 'SXZX',
          typeName: '三星直选', 
          numBoard: {
            playTip:'每位至少选1个号，按位猜对开奖后3位最高奖#元',
            lineNum:5,
            numRegions:[
              {
                key:'BAI',
                name:'百位',
                section:'redball',
              },
              {
                key:'SHI',
                name:'十位',
                section:'redball',
              },
              {
                key:'GE',
                name:'个位',
                section:'redball',
              },
            ],
          }
        },
        {
          typeCode: 'SXZS',
          typeName: '三星组三', 
          numBoard: {
            playTip:'至少选2个号，按位猜对开奖后3位(顺序不限)中#元',
            lineNum:5,
            numRegions:[
              {
                key:'xuanhao',
                name:'选号',
                section:'redball',
              },
            ],
          }
        },
        {
          typeCode: 'SXZL',
          typeName: '三星组六', 
          numBoard: {
            playTip:'至少选2个号，猜对开奖后3位(顺序不限)中#元',
            lineNum:5,
            numRegions:[
              {
                key:'xuanhao',
                name:'选号',
                section:'redball',
              },
            ],
          }
        },
        {
          typeCode: 'EXZX',
          typeName: '二星直选', 
          numBoard: {
            playTip:'每位至少选1个号，按位猜对开奖后2位即中#元',
            lineNum:5,
            numRegions:[
              {
                key:'SHI',
                name:'十位',
                section:'redball',
              },
              {
                key:'GE',
                name:'个位',
                section:'redball',
              },
            ],
          }
        },
        {
          typeCode: 'EXZX',
          typeName: '二星组选', 
          numBoard: {
            playTip:'至少选2个号，猜对开奖后2位(顺序不限)即中#元',
            lineNum:5,
            numRegions:[
              {
                key:'xuanhao',
                name:'选号',
                section:'redball',
              },
            ],
          }
        },
        {
          typeCode: 'YXZX',
          typeName: '一星直选', 
          numBoard: {
            playTip:'至少选1个号，猜对开奖号码最后1位即中#元',
            lineNum:5,
            numRegions:[
              {
                key:'GE',
                name:'个位',
                section:'redball',
              },
            ],
          }
        },
        {
          typeCode: 'DXDS',
          typeName: '大小单双', 
          numBoard: {
            playTip:'每位至少选1个号，猜对开奖后2位的属性即中#元',
            lineNum:5,
            numRegions:[
              {
                key:'SHI',
                name:'十',
                section:'bigSmall',
              },
              {
                key:'GE',
                name:'个',
                section:'bigSmall',
              },
            ],
          }
        },
        {
          typeCode: 'RXY',
          typeName: '任选一',
          numBoard: {
            playTip:'任意一位至少选1个号，猜对开奖对应1位中#元',
            lineNum:5,
            numRegions:[
              {
                key:'WAN',
                name:'万位',
                section:'redball',
              },
              {
                key:'QIAN',
                name:'千位',
                section:'redball',
              },
              {
                key:'BAI',
                name:'百位',
                section:'redball',
              },
              {
                key:'SHI',
                name:'十位',
                section:'redball',
              },
              {
                key:'GE',
                name:'个位',
                section:'redball',
              },
            ],
          } 
        },
        {
          typeCode: 'WXZX',
          typeName: '任选二',
          numBoard: {
            playTip:'任意两位至少各选1个号，猜对开奖对应2位中#元',
            lineNum:5,
            numRegions:[
              {
                key:'WAN',
                name:'万位',
                section:'redball',
              },
              {
                key:'QIAN',
                name:'千位',
                section:'redball',
              },
              {
                key:'BAI',
                name:'百位',
                section:'redball',
              },
              {
                key:'SHI',
                name:'十位',
                section:'redball',
              },
              {
                key:'GE',
                name:'个位',
                section:'redball',
              },
            ],
          } 
        },
      ],
    },
 ];


 var NumLotteryList = React.createClass({
 	getInitialState:function(){
 		var ds = new ListView.DataSource({
			rowHasChanged:(r1,r2) => r1 !== r2
		});

		return{
			dataSource: ds.cloneWithRows(NumberLotterys),
		}; 
 	},

 	render: function(){
 		return(
 			<View style={styles.listContainer}>
 				<ListView 
 					style = {styles.list}
 					dataSource = {this.state.dataSource}
 					renderRow = {this._rederRow.bind(this)}
 				/>
 			</View>
 		);
 	},

 	//定义每行
 	_rederRow: function(item,i){
 		return (
 			<View key={i}>
 				<TouchableHighlight onPress={() => this._onPressRow(item)}>
 					<View style={styles.row}>
 						<Text style={styles.rowTitleText}>
 							{item.name}
 						</Text>
 					</View>
 				</TouchableHighlight>
 				<View style={styles.separator} />
 			</View>
 		);
 	},


 	_onPressRow:function(numlottery:Object) {
    //fuck: too怪异的解决办法 
    //给组件设置两个空的function props, 
    //(1)在route导航中传入titleControl，调用titleControl.props，赋值新的route function
    //(2)在组件willmount函数中，调用this.props重置另外一个funciton
    //这样可以在route中调用组件的props,更新组件state更新UI；
    //希望能够其他巧妙的办法实现
    var titleControl = <NLNumTitleSwitchButton 
            playTypeName={numlottery.playTypes[8].typeName} 
            onPlayTypeChange={()=>{}}
            onPress={()=>{}}/>;
    this.props.toRoute({
      name: numlottery.name,
      component: NumLotteryPick,
      titleComponent: titleControl, //修改了Route的titleCustom方法，传入组件实例
      data: {
        lottery: numlottery,
        titleControl:titleControl,
        defaultPlayIndex:8,
      }
    });
  }
 });

 var styles = StyleSheet.create({
 	listContainer :{
 		flex:1,
 	},

 	list:{
 		backgroundColor: 'white',
 	},

 	row: {
    	backgroundColor: 'white',
    	justifyContent: 'center',
    	paddingHorizontal: 15,
    	paddingVertical: 18,
  	},

  rowTitleText: {
    	fontSize: 17,
    	fontWeight: '500',
  	},

  separator: {
    	height: 1 / PixelRatio.get(),
    	backgroundColor: '#bbbbbb',
    	marginLeft: 15,
  	},
 });

 module.exports = NumLotteryList;

