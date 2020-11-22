import React from 'react';
import {connect} from 'react-redux';

class Paging extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        currentPage: 0,
        pageSize: this.props.pageSize,
        totalItemCount: this.props.totalItemCount
      }

      this.changePage = this.changePage.bind(this);
      this.reset = this.reset.bind(this);
    }

    componentDidMount() {
      if(this.props.setReset)
      {
        this.props.setReset(this.reset);
      }
    }

    componentWillReceiveProps(nextProps)
    {
      if(nextProps.totalItemCount != this.state.totalItemCount)
      {
        this.setState({
          totalItemCount: nextProps.totalItemCount
        });
      }
      if(nextProps.pageSize != this.state.pageSize)
      {
        this.setState({
          pageSize: nextProps.pageSize
        });
      }
    }
    
    changePage(pageNumber, pageSize){
      this.props.changePage(pageNumber, pageSize);
      this.setState({
        currentPage: pageNumber
      });
    }

    reset(){
      this.setState({
        currentPage: 0
      })
    }

    render() {
      var pageCount = 0;
      
      if(this.state.totalItemCount > this.state.pageSize)
      {
          var removeOneToPaging = this.state.totalItemCount % this.state.pageSize == 0;
          pageCount = Math.floor(this.state.totalItemCount / this.state.pageSize);
          if(removeOneToPaging)
          {
              pageCount = pageCount - 1;
          }
      }

      var pages = [];
      if(pageCount >= 5 && this.state.currentPage <= 2)
      {
        pages.push(<a href="javascript:void(0)" className={this.state.currentPage == 0 ? "active" : ""} onClick={() => this.changePage(0, this.state.pageSize)}>1</a>);
        pages.push(<a href="javascript:void(0)" className={this.state.currentPage == 1 ? "active" : ""} onClick={() => this.changePage(1, this.state.pageSize)}>2</a>);
        pages.push(<a href="javascript:void(0)" className={this.state.currentPage == 2 ? "active" : ""} onClick={() => this.changePage(2, this.state.pageSize)}>3</a>);
        pages.push(<a href="javascript:void(0)" className={this.state.currentPage == 3 ? "active" : ""} onClick={() => this.changePage(3, this.state.pageSize)}>4</a>);
        pages.push(<a href="javascript:void(0)" className={this.state.currentPage == 4 ? "active" : ""} onClick={() => this.changePage(4, this.state.pageSize)}>5</a>);
      }
      else if(pageCount >= 5 && this.state.currentPage > 2 && this.state.currentPage < pageCount - 2)
      {
        pages.push(<a href="javascript:void(0)" onClick={() => this.changePage(this.state.currentPage - 2, this.state.pageSize)}>{this.state.currentPage - 1}</a>);
        pages.push(<a href="javascript:void(0)" onClick={() => this.changePage(this.state.currentPage - 1, this.state.pageSize)}>{this.state.currentPage}</a>);
        pages.push(<a href="javascript:void(0)" className={"active"} onClick={() => this.changePage(this.state.currentPage, this.state.pageSize)}>{this.state.currentPage + 1}</a>);
        pages.push(<a href="javascript:void(0)" onClick={() => this.changePage(this.state.currentPage + 1, this.state.pageSize)}>{this.state.currentPage + 2}</a>);
        pages.push(<a href="javascript:void(0)" onClick={() => this.changePage(this.state.currentPage + 2, this.state.pageSize)}>{this.state.currentPage + 3}</a>);
      }
      else if(pageCount >= 5 && this.state.currentPage >= pageCount - 2)
      {
        pages.push(<a href="javascript:void(0)" className={this.state.currentPage == pageCount - 4 ? "active" : ""} onClick={() => this.changePage(pageCount - 4, this.state.pageSize)}>{pageCount - 3}</a>);
        pages.push(<a href="javascript:void(0)" className={this.state.currentPage == pageCount - 3 ? "active" : ""} onClick={() => this.changePage(pageCount - 3, this.state.pageSize)}>{pageCount - 2}</a>);
        pages.push(<a href="javascript:void(0)" className={this.state.currentPage == pageCount - 2 ? "active" : ""} onClick={() => this.changePage(pageCount - 2, this.state.pageSize)}>{pageCount - 1}</a>);
        pages.push(<a href="javascript:void(0)" className={this.state.currentPage == pageCount - 1 ? "active" : ""} onClick={() => this.changePage(pageCount - 1, this.state.pageSize)}>{pageCount}</a>);
        pages.push(<a href="javascript:void(0)" className={this.state.currentPage == pageCount ? "active" : ""} onClick={() => this.changePage(pageCount, this.state.pageSize)}>{pageCount + 1}</a>);
      }
      else if(pageCount < 5)
      {
        if(pageCount >= 0)
        {
          pages.push(<a href="javascript:void(0)" className={this.state.currentPage == 0 ? "active" : ""} onClick={() => this.changePage(0, this.state.pageSize)}>{1}</a>);
        }
        if(pageCount >= 1)
        {
          pages.push(<a href="javascript:void(0)" className={this.state.currentPage == 1 ? "active" : ""} onClick={() => this.changePage(1, this.state.pageSize)}>{2}</a>);
        }
        if(pageCount >= 2)
        {
          pages.push(<a href="javascript:void(0)" className={this.state.currentPage == 2 ? "active" : ""} onClick={() => this.changePage(2, this.state.pageSize)}>{3}</a>);
        }
        if(pageCount >= 3)
        {
          pages.push(<a href="javascript:void(0)" className={this.state.currentPage == 3 ? "active" : ""} onClick={() => this.changePage(3, this.state.pageSize)}>{4}</a>);
        }
        if(pageCount >= 4)
        {
          pages.push(<a href="javascript:void(0)" className={this.state.currentPage == 4 ? "active" : ""} onClick={() => this.changePage(4, this.state.pageSize)}>{5}</a>);
        }
      }

      return (
        <div>
          {pageCount > 0 &&
            <div className="paging">
              <a href="javascript:void(0)" className={"first-item"} onClick={() => this.changePage(0, this.state.pageSize)}>
                &lt;&lt;
              </a>
              <a href="javascript:void(0)" className={"previous-item"} onClick={() => this.changePage(Math.max(this.state.currentPage - 1, 0), this.state.pageSize)}>
                &lt;
              </a>
              {pages}
              <a href="javascript:void(0)" className={"next-item"} onClick={() => this.changePage(Math.min(this.state.currentPage + 1, pageCount), this.state.pageSize)}>
                &gt;
              </a>
              <a href="javascript:void(0)" className={"last-item"}  onClick={() => this.changePage(pageCount, this.state.pageSize)}>
                &gt;&gt;
              </a>
            </div>
          }
        </div>
      );
    }
  }

  function mapStateToProps(state) {
      return {
          app: state.app 
      }
  }
  
  export default connect(mapStateToProps)(Paging);