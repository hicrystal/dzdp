import React from 'react'
import  PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import {  connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import { hashHistory } from 'react-router'
import Header from "../../components/Header/index";
import Userinfo from "../../components/Userinfo/index";
import OrderList from "./subpage/OrderList";
class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const userinfo= this.props.userinfo
        return (

            <div>
                <Header title="用户中心" backRouter="/"/>
                <Userinfo username={userinfo.username} city={userinfo.cityName}/>
                <OrderList username={userinfo.username} />
            </div>
        )
    }
    componentDidMount(){

            if(!this.props.userinfo.username){
                hashHistory.push('/Login')
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
)(User)
