import React from 'react'
import  PureRenderMixin from 'react-addons-pure-render-mixin'


class  Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return(
            <h1>hello detail</h1>
        )
    }
}

export default Detail