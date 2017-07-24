import React from 'react'
import  PureRenderMixin from 'react-addons-pure-render-mixin'

import  ListComponent from '../../../components/List'
import LoadMore from "../../../components/LoadMore";
import { getSearchData } from '../../../fetch/search/search'
const initialState = {
    data: [],
    hasMore: false,
    isLoadingMore: false,
    page: 0
}
class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state=initialState
    }

    render() {
        return (
            <div>

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
    componentDidUpdate(prevProps, prevState) {
        const keyword = this.props.keyword
        const category = this.props.category

        // 搜索条件完全相等时，忽略。重要！！！
        if (keyword === prevProps.keyword && category === prevProps.category) {
            return
        }

        // 重置 state
        this.setState(initialState)

        // 重新加载数据
        this.loadFirstPageData()
    }
    //获取首屏数据
    loadFirstPageData(){
        const cityName= this.props.cityName
        const category= this.props.category
        const keyword= this.props.keyword
        const  result =getSearchData(cityName,0,category,keyword)
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
        const category= this.props.category
        const keyword= this.props.keyword||" "
        const  result =getSearchData(cityName,page,category,keyword)
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

export default SearchList