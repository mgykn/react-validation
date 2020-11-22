import React from 'react';
import { connect } from 'react-redux';
import { reportDownload  } from '../../../actions/actions';

class ReportDetail extends React.Component {
    constructor(props)
    {
        super(props);
        
        this.downloadReport = this.downloadReport.bind(this);
    }

    downloadReport(groupId, name){
        this.props.dispatch(reportDownload(groupId, (data) => {
            
        }, () => {

        }));
    }

    render() {
        return (
            <div className="item-detail">
                <div className="details">
                    <div className="message">
                        <div className="label">
                            Mesaj
                        </div>
                        <div className="text">
                            {this.props.item.message}
                        </div>
                    </div>
                    <div className="statistics">
                        <div className="statistic-item">
                            <div className="label">
                                Gönderim Adedi
                            </div>
                            <div className="text">
                                {this.props.item.receiverCount}
                            </div>
                        </div>
                        <div className="statistic-item success">
                            <div className="label">
                                Başarılı
                            </div>
                            <div className="text">
                                {this.props.item.successCount}
                            </div>
                        </div>
                        <div className="statistic-item fail">
                            <div className="label">
                                Başarısız
                            </div>
                            <div className="text">
                                {this.props.item.failCount}
                            </div>
                        </div>
                        <div className={"statistic-item " + (this.props.item.waitingCount > 0 ? "waiting" : "")}>
                            <div className="label">
                                Bekliyor
                            </div>
                            <div className="text">
                                {this.props.item.waitingCount}
                            </div>
                        </div>
                    </div>
                </div>
                <a className="btn tertiary" href="javascript:void(0)" title="Excel'e Aktar" onClick={() => this.downloadReport(this.props.item.bmspGroupId, this.props.item.requestName)}>
                    <span>Excel'e Aktar</span>
                </a>
            </div>
      );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app 
    }
}

export default connect(mapStateToProps)(ReportDetail)