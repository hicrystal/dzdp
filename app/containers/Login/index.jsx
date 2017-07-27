import React from 'react'
import  PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import {  connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Header from '../../components/Header'
import LoginCommponent from "../../components/Login";
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            checking:true
        }
    }

    render() {
        return (

            <div>
                <Header title="登录"/>
                {
                    this.state.checking
                        ?<div>{/*waitint*/}</div>
                        :<LoginCommponent loginHandle={this.loginHandle.bind(this)}/>
                }
            </div>
        )
    }
    componentDidMount(){
        this.doCheck()
    }
    doCheck(){
        const userinfo=this.props.userinfo
        if(userinfo.username){
        // 已经登录
            this.goUserPage()
        }else {
        //未登录
            this.setState({
                checking:false
            })
        }
    }
    goUserPage(){
        hashHistory.push('User')
    }
    loginHandle(username){
        const acitons =this.props.userInfoActions
        let userinfo=this.props.userinfo
        userinfo.username=username
        acitons.update(userinfo)
        //跳转链接
        const params=this.props.params
        const router= params.router
        console.log(router)
        if(router){
            hashHistory.push(router)
        }else {
            this.goUserPage()
        }
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)