import React from 'react'
import  PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import BuyAndStore from "../../../components/BuyAndStore/index";
import * as storeActionsFiles from '../../../actions/store'


class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            isStore: false
        }
    }

    render() {
        return (
            <div>
                <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>

            </div>
        )
    }
    componentDidMount() {
        this.checkStoreState()
    }
    //检查当前商户是否已被收藏
    checkStoreState(){
        const id=this.props.id
        const  store =this.props.store
        store.some(item=>{
            if(item.id===id){
                this.setState({
                    isStore:true
                })
                //跳出循环 some只要有一个满足即可
                return true
            }
        })
    }
    //购买事件
    buyHandle(){
        //1.验证登录
        const loginFlag=this.loginCheck()
        if(!loginFlag){
            return

        }
        //购买流程
        //跳转到用户页
        hashHistory.push('/User')
    }
    //收藏事件
    storeHandle(){
        // 验证登录，未登录则return
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }
        const  id= this.props.id
        const storeActions=this.props.storeActions
        if(this.state.isStore){
            //当前状态为已收藏 点击取消收藏
            storeActions.rm({id:id})
        }else {
            //当前为未收藏 点击收藏
            storeActions.add({id:id})
        }
        this.setState({
            isStore:!this.state.isStore
        })
    }
    //验证登录
    loginCheck(){
        const  id= this.props.id
         const  userinfo=this.props.userinfo
        if(!userinfo.username){

            hashHistory.push('/Login/' + encodeURIComponent('/detail/' + id))
            return false
        }
        return true
    }

}

/**
 * redux-connect
 */
function mapStateToProps(state) {
    return{
        userinfo:state.userinfo,
        store:state.store
    }
}
function mapDispatchToprops(dispatch) {
    return{
        storeActions: bindActionCreators(storeActionsFiles,dispatch)

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToprops
)(Buy)