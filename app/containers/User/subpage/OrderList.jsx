import React from 'react'
import  PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
import  {getOrderListData,postComment} from '../../../fetch/user/orderlist'
import OrderListComponent from "../../../components/OrderList/index";
class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            data:[]
        }
    }

    render() {
        return (
            <div className="order-list-container">
                <h2>您的订单</h2>
                {this.state.data.length
                    ?<OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
                    :<div></div>
                }
            </div>
        )
    }
    componentDidMount(){
        //获取订单信息
        const username= this.props.username
        if(username){
            this.loaderOrderList(username)
        }

    }
    loaderOrderList(username){
        const result=getOrderListData(username)
        result.then(res=>{
            return res.json()
        }).then(json=>{

            this.setState({
                data:json
            })
        })
    }
    //提交评价
    submitComment(id,value,callback){
        const  result= postComment(id,value)
        console.log(result)
        result.then(res=>{
            return res.json()

        }).then(json=>{

            if(json.errno===0){
                callback()
            }
        })
    }
}

export default OrderList