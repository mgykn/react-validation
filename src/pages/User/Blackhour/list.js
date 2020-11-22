import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import Message from '../../../components/message/index';
import Breadcrumb from '../../../components/breadcrumb/index';
import { blackhour, setBlackhour, dispatchItem } from '../../../actions/actions';

class Blackhour extends React.Component {
    constructor(props)
    {
        super(props)

        this.state = {
            formModel: {
                startDate: {
                    value: this.props.app.user.blackhour.startDate,
                    name: 'startDate',
                    type: 'timepicker',
                    label: 'Başlangıç Saati',
                    placeholder: 'Başlangıç saati',
                    error: 'Lütfen başlangıç girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isTime: true
                    }
                },
                endDate: {
                    value: this.props.app.user.blackhour.endDate,
                    name: 'endDate',
                    type: 'timepicker',
                    label: 'Bitiş Saati',
                    placeholder: 'Bitiş saati',
                    error: 'Lütfen bitiş saati girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isTime: true
                    }
                }
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getBlackhour = this.getBlackhour.bind(this);
        this.deleteBlackhour = this.deleteBlackhour.bind(this);
    }

    componentDidMount() {
        this.getBlackhour();
    }
    
    getBlackhour()
    {
        this.props.dispatch(blackhour({ }, (data) => {
            var blackhourRange =  data.blackhourRange.split('-');
            if(blackhourRange.length > 1)
            {
                var startDate = blackhourRange[0];
                var endDate  =  blackhourRange[1];
                this.props.dispatch(dispatchItem("BLACKHOUR", { startDate: startDate, endDate: endDate }));
                this.setState({
                    formModel: {
                        ...this.state.formModel,
                        startDate: {
                            ...this.state.formModel.startDate,
                            value: blackhourRange[0]
                        },
                        endDate: {
                            ...this.state.formModel.endDate,
                            value: blackhourRange[1]
                        }
                    }
                }, () => {
                })
            }
        }, (data) => {
        }));
    }
    
    deleteBlackhour()
    {
        var serviceData = {
            blackHourPeriod : {
                start: '00:00',
                end: '00:00'
            }
        };

        this.props.dispatch(setBlackhour(serviceData, (data) => {
            this.props.dispatch(dispatchItem("BLACKHOUR", { startDate: serviceData.blackHourPeriod.start, endDate: serviceData.blackHourPeriod.end }));
            this.setState({
                formModel: {
                    ...this.state.formModel,
                    startDate: {
                        ...this.state.formModel.startDate,
                        value: serviceData.blackHourPeriod.start
                    },
                    endDate: {
                        ...this.state.formModel.endDate,
                        value: serviceData.blackHourPeriod.end
                    }
                }
            }, () => {
            })
        }, (data) => {
        }));
    }

    handleSubmit(data)
    {
        var serviceData = {
            blackHourPeriod : {
                start: data.startDate,
                end: data.endDate
            }
        };

        this.props.dispatch(setBlackhour(serviceData, (data) => {
            this.props.dispatch(dispatchItem("BLACKHOUR", { startDate: serviceData.blackHourPeriod.start, endDate: serviceData.blackHourPeriod.end }));
        }, (data) => {
        }));
    }

    render() {
        const breadcrumbItems = [{
            name: "Ana Sayfa",
            link: "/"
        },{
            name: "Blackhour Yönetimi"
        }];

        return (
        [
            <Breadcrumb items={breadcrumbItems} />,
            <section className="panel small">
                <Message />
                <div className="container">
                    <div className="title-default">
                        <span>Blackhour Ayarları</span>
                    </div>
                    <div className="blackhour">
                        {((this.props.app.user.blackhour.startDate != ""  && this.props.app.user.blackhour.endDate != "") && (this.props.app.user.blackhour.startDate != "00:00" || this.props.app.user.blackhour.endDate != "00:00")) &&
                            <div className="text">
                                Güncel blackhour saatleri: {this.props.app.user.blackhour.startDate} - {this.props.app.user.blackhour.endDate}
                            </div>
                        }
                        <div className="form-container">
                            <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Ayarla"} buttonId={"blackhour-list-save"} />
                            <Button disabled={false} extraClass={"secondary"} onClick={() => this.deleteBlackhour(false)} text={"Blackhour Saatini Kaldır"} id={"blackhour-edit-cancel"} />
                        </div>
                    </div>
                </div>
            </section>
        ]
      );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app 
    }
}

export default connect(mapStateToProps)(Blackhour)