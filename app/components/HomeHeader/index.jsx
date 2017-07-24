import React from 'react'
import  PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link, hashHistory } from 'react-router'

import './style.less'
import SearchInput from "../SearchInput/index";
class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            kwd:''
        }
    }

    render() {
        return (
           <div className="clear-fix" id="home-header">
               <div className="float-left home-header-left">
                   <Link to ="/city">
                   <span>{this.props.cityName}</span>
                   &nbsp;
                   <i className="icon-angle-down"></i>
                   </Link>
               </div>
               <div className="float-right home-header-right">
                   <Link to="/Login">
                   <i className="icon-user"></i>
                   </Link>
               </div>
               <div className="home-header-middle">
                   <div className="search-container"><i className="icon-search"></i>
                       <SearchInput type="text"
                              value="" enterHandle={this.enterHandle.bind(this)}
                       />
                   </div>

               </div>
           </div>
        )
    }

    enterHandle(value){
        hashHistory.push('/search/all/'+encodeURIComponent(value))
    }

}

export default HomeHeader