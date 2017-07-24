import React from 'react'
import  PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
import { getListData } from '../../../fetch/home/home'
import  ListComponent from '../../../components/List'
import LoadMore from "../../../components/LoadMore";
class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            data:[],//存储信息
            hasMore:false,//记录当前状态下，有没有更多可以加载，后端返回信息
            isLoadingMore :false,//记录当前状态下，是加载中还是点击加载更多 按钮状态
            page:1 //下一页的页数

        }
    }

    render() {
        return (
            <div>
            <h2 className="home-list-tille">猜你喜欢</h2>
                {
                    this.state.data.length
                    ?<ListComponent data={this.state.data}/>
                        :<div>加载中。。。</div>
                }
                {
                    this.state.hasMore
                        ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                        : ''
                }


            </div>
        )
    }
    componentDidMount(){
        //获取首页数据
        this.loadFirstPageData()
    }
    //获取首屏数据
    loadFirstPageData(){
        const cityName= this.props.cityName
        const  result =getListData(cityName,0)
        this.resultHandle(result)
    }
    //加载更多数据
    loadMoreData(){
        //记录状态
        this.setState({
            isLoadingMore:true
        })
        const cityName= this.props.cityName
        const page=this.state.page
        const  result =getListData(cityName,page)
        //加载
        this.resultHandle(result)
        //增加页数和改变isloadingmore状态
        this.setState({
            page:page+1,
            isLoadingMore:false
        })
    }

    //数据处理
    resultHandle(result){
        result.then(res=>{
            return res.json()
        }).then(json=>{
            const hasMore =json.hasMore
            const data=json.data
            //存储数据
            this.setState({
                hasMore:hasMore,
                data:this.state.data.concat(data)
            })
        })
    }
}

export default List