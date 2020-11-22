import React from 'react';
import {
    BrowserRouter as Router,
    Link, withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import Message from '../../../components/message/index';
import Form from '../../../components/form/form';
import { createClient, partners, dispatchItem } from '../../../actions/actions';

class ClientCreate extends React.Component {
    constructor(props) {
        super(props);

        var partnerOptions = [];

        for (var i = 0; i < this.props.app.xivodafone.partners.length; i++) {
            partnerOptions.push({
                name: this.props.app.xivodafone.partners[i].partnerName,
                value: this.props.app.xivodafone.partners[i].partnerId
            });
        }

        this.state = {
            formModel: {
                partnerId: {
                    value: '',
                    name: 'partnerId',
                    type: 'select',
                    label: 'Partner Adı',
                    placeholder: 'Lütfen seçiniz',
                    options: partnerOptions,
                    error: 'Lütfen partner adı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                companyName: {
                    value: '',
                    name: 'companyName',
                    type: 'text',
                    label: 'Müşteri Adı',
                    placeholder: '',
                    error: 'Lütfen müşteri adı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                contractStartDate: {
                    value: '',
                    name: 'contractStartDate',
                    type: 'textdate',
                    label: 'Sözleşme Başlangıç Tarihi',
                    placeholder: '',
                    error: 'Lütfen sözleşme başlangıç tarihi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isDate: true
                    }
                },
                sector: {
                    value: 'Kamu',
                    name: 'sector',
                    type: 'radio',
                    label: '',
                    placeholder: '',
                    options: [
                        {
                            name: "Kamu",
                            value: "Kamu"
                        },
                        {
                            name: "Özel",
                            value: "Ozel"
                        }
                    ],
                    error: 'Lütfen tip girin.',
                    valid: false,
                    touched: false,
                    disabled: true,
                    validationRules: {
                    }
                },
                originator: {
                    value: '',
                    name: 'originator',
                    type: 'text',
                    maxLength: 11,
                    label: 'Gönderici Adı',
                    placeholder: '',
                    error: 'Lütfen Gönderici Adı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                limit: {
                    value: '',
                    name: 'limit',
                    type: 'number',
                    label: 'Limit',
                    min: 1,
                    max: 1000000,
                    placeholder: '',
                    error: 'Lütfen limit girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isDecimal: true
                    }
                },
                file: {
                    value: '',
                    valuePlaceholder: '',
                    name: 'file',
                    type: 'file',
                    label: 'Sözleşme Ekle',
                    placeholder: 'Bilgisayarınızdan seçim yapmak için tıklayın',
                    error: 'Lütfen bir Sözleşme Ekleyin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount() {
        if (this.props.app.xivodafone.partners.length < 1) {
            this.props.dispatch(partners({}, (data) => {
                this.props.dispatch(dispatchItem("PARTNER_LIST", data.Partners));
            }, () => {

            }));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.app.xivodafone.partners !== nextProps.app.xivodafone.partners) {
            var partnerOptions = [];

            for (var i = 0; i < nextProps.app.xivodafone.partners.length; i++) {
                partnerOptions.push({
                    name: nextProps.app.xivodafone.partners[i].partnerName,
                    value: nextProps.app.xivodafone.partners[i].partnerId
                });
            }

            this.setState({
                formModel: {
                    ...this.state.formModel,
                    partnerId: {
                        ...this.state.formModel.partnerId,
                        options: partnerOptions
                    }
                }
            });
        }
    }

    onInputChange(model) {

        if (model.limit.value <= 0 || 'e'.indexOf(model.limit.value) > 0) {
            this.setState({
                formModel: {
                    ...this.state.formModel,
                    limit: {
                        ...this.state.formModel.limit,
                        value: ''

                    }
                }
            });

        }


        if (model.sector.value == "Ozel") {
            this.setState({
                formModel: {
                    ...this.state.formModel,
                    originator: {
                        ...this.state.formModel.originator,
                        value: '',
                        placeholder: 'VODAFONE',
                        disabled: true
                    }
                }
            });
        }
        else {
            this.setState({
                formModel: {
                    ...this.state.formModel,
                    originator: {
                        ...this.state.formModel.originator,
                        placeholder: 'Gönderici Adı',
                        disabled: false
                    }
                }
            });
        }

    }

    handleSubmit(data) {
        var serviceData = new FormData();
        for (var key in data) {
            serviceData.append(key, data[key]);
        }

        this.props.dispatch(createClient(serviceData, (data) => {
            if(data.status == "SUCCESS") {
                setTimeout(function() { //Start the timer
                    window.location.reload();
                }.bind(this), 2000)
            }
        }, (data) => {
        }));
    }

    render() {
        return (
            <section className="panel small">
                <Message />
                <div className="container">
                    <div className="title-default">
                        <Link to={"/agent/partner/create"} className="title-link small">
                            Yeni Partner Ekle
                        </Link>
                        <span>Yeni Müşteri Ekle</span>
                    </div>
                    <div className="form-container">
                        <Form model={this.state.formModel} handleSubmit={this.handleSubmit} onInputChange={this.onInputChange} buttonText={"Müşteri Ekle"} buttonId={"client-create-save"} />
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }
}

export default withRouter(connect(mapStateToProps)(ClientCreate))