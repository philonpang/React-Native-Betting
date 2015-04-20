/**
 * 数字彩动态配置 启动JS
 */

 'use strict';

//需要用到的API
 var React = require('react-native');
 var {
 	AppRegistry,
 	StyleSheet,
 	View,
  Image,
 } = React;


//创建App
 var Router = require('react-native-router');
 var NumLotteryList = require('./NumLotteryList');

 var NumLotteryDynamicApp = React.createClass({
  	render: function() {
      return(
        <Router firstRoute={{
          name: '彩种列表',
          component: NumLotteryList,
        }}
        headerStyle={styles.header}
        backButtonComponent={BackButton} />
      );
  	},
 });


//定义NavigationBar返回按钮
var BackButton = React.createClass({
  render:function() {
    return (
      <Image source={require('image!back_button')} style={{
            width: 10,
            height: 17,
            marginLeft: 10,
            marginTop: 3,
            marginRight: 10}} />
    )
  }
}); 


//设置style
var styles = StyleSheet.create({
	container: {
    	flex: 1,
  },

  header:{
    backgroundColor: '#d91d36',
  },

});

AppRegistry.registerComponent('NumLotteryDynamicApp', () => NumLotteryDynamicApp);
module.exports = NumLotteryDynamicApp;




