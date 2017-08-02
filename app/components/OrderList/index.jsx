import React from 'react'
import  PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './item'


class OrderListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const  data= this.props.data
        return (
            <div>
                {
                    data.map((item,index)=>{
                        return <Item data={item} key={index}></Item>
                    })
                }
            </div>
        )
    }
}

export default OrderListComponent