import React from 'react';
import moment from 'moment';

class LeftDetail extends React.Component {
    render() {
        var item = this.props.item;
        return (
            <div className="left only-desktop">
                {item &&
                    [
                    <div className="header">
                        <div className="title-default">
                            {item.companyName}
                        </div>
                    </div>,
                    <div className="items">
                        <div className="item-container">
                            <div className="item">
                                <div>Durum</div>
                                <div className={item.status === "ACTIVE" ? "green" : ""}>{item.status === "ACTIVE" ? "Aktif" : "Pasif"}</div>
                            </div>
                            <div className="item">
                                <div>Customer Name</div>
                                <div>{item.companyName}</div>
                            </div>
                            <div className="item">
                                <div>Satış Destek</div>
                                <div>{item.salesAgentEmail}</div>
                            </div>
                            <div className="item">
                                <div>Sözleşme başlangıç tarihi</div>
                                <div>{moment(item.contractStartDate).format('DD.MM.YYYY')}</div>
                            </div>
                            <div className="item">
                                <div>Taahhüt Süresi</div>
                                <div>{item.duration}</div>
                            </div>
                            <div className="item">
                                <div>Partner Bilgisi</div>
                                <div>{item.partnerInfo}</div>
                            </div>
                            <div className="item">
                                <div>Alfanumerik</div>
                                <div>{item.originators.join(', ')}</div>
                            </div>
                        </div>
                    </div>
                    ]
                }
            </div>
      );
    }
  }

  export default LeftDetail