import React from 'react'
import  PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as storeActionsFiles from '../../actions/store'
import {hashHistory} from 'react-router'

import './style.less'

class DetailHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const  userinfo= this.props.userinfo
        console.log(userinfo.username)

        return (

            <div id="common-header">
                <span className="back-icon" onClick={this.clickHandle.bind(this)}>
                    <i  className="icon-chevron-left"></i>
                </span>
                <h1>{this.props.title}</h1>
            </div>
        )
    }

    clickHandle(){
        //验证登录。若登录，则返回search页面 如果未登录
        const loginFlag = this.loginCheck()
        if (loginFlag) {
            hashHistory.push('/search/all/' )
        } else {
        window.history.back()
    }



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
 * redux
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
)(DetailHeader)