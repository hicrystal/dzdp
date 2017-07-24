import React from 'react'
import  PureRenderMixin from 'react-addons-pure-render-mixin'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import { bindActionCreators } from 'redux'
import {  connect } from 'react-redux'
import Header from "../../components/Header";
import CurrentCity from "../../components/CurrentCity";
import CityList from "../../components/CityList";
import  LocalStore from '../../util/localStore'
import { CITYNAME } from '../../config/localStoreKey'
import {hashHistory} from 'react-router'


class  City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }
    render(){
        return(
            <div>
                <Header title="选择城市"/>
                <CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList changeFn={this.changeCity.bind(this)}/>

            </div>
        )
    }
    componentDidMount(){

    }
    changeCity(newCity){
        if(newCity==null){
            return
        }
        //update redux
        const userinfo=this.props.userinfo
        userinfo.cityName=newCity
        this.props.userinfoActions.update(userinfo)
        //update localStorage
            LocalStore.setItem(CITYNAME,newCity)

        // location to Homepage
            hashHistory.push('/')
    }
}

function mapStateToProps(state) {
    return{
        userinfo:state.userinfo
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
)(City)