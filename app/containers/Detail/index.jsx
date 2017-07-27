import React from 'react'
import  PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from "../../components/Header";
import DeatailInfo from './subpage/Info'
import Comment from "./subpage/Comment";
import Buy from "./subpage/buy";

class  Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        const id=this.props.params.id
        return(
            <div>
               <Header title="商户详情"/>
                <DeatailInfo id={id}/>
                <Buy id={id}/>
                <Comment id={id}/>
            </div>
        )
    }
}

export default Detail