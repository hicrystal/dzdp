import  React from 'react'
import  PureRenderMixin from  'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import {  connect } from 'react-redux'
import  LocalStore from '../util/localStore'
import { CITYNAME } from '../config/localStoreKey'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'

class App extends React.Component{
    constructor(props,context){
     super(props,context);
     this.shouldComponentUpdate =PureRenderMixin.shouldComponentUpdate.bind(this);
     this.state ={
         initDone: false
     }
    }
    render(){
        return(
          <div>
              {
                  this.state.initDone
                  ?this.props.children
                      :<div>正在加载</div>
              }
          </div>
        )
    }
    componentDidMount(){
        //从localstorge中获取城市
        let cityName  =LocalStore.getItem(CITYNAME)
        if(cityName==null){
            cityName='北京'
        }

        //将城市信息储存在redux中 更新内容
        this.props.userinfoActions.update({
            cityName:cityName
        })

        this.setState({
            initDone:true
        })
    }
}

/**
 * redux
 */
//传入state
function mapStateToProps(state) {
    return{

    }

}
//传入action
function mapDispatchToProps(dispatch) {
    return {
        userinfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispatch),
    }

}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
