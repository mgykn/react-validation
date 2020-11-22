import React from 'react';
import { 
    BrowserRouter as Router,
    Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Message from '../../../components/message/index';
import Form from '../../../components/form/form';
import { createPartner, partners, dispatchItem } from '../../../actions/actions';

class PartnerCreate extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            formModel: {
                partnerName: {
                    value: '',
                    name: 'partnerName',
                    type: 'text',
                    label: 'Partner Firma Adı',
                    placeholder: '',
                    error: 'Lütfen partner firma adı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                partnerAdminName: {
                    value: '',
                    name: 'partnerAdminName',
                    type: 'text',
                    label: 'Admin Adı',
                    placeholder: '',
                    error: 'Lütfen admin adı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                partnerAdminEmail: {
                    value: '',
                    name: 'partnerAdminEmail',
                    type: 'text',
                    label: 'Admin E-posta Adresi',
                    placeholder: '',
                    error: 'Lütfen admin e-posta adresi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                partnerAdminGSM: {
                    value: '',
                    name: 'partnerAdminGSM',
                    type: 'phone',
                    label: 'Admin Telefon',
                    placeholder: '',
                    error: 'Lütfen telefonu girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        
    }

    handleSubmit(data)
    {
        this.props.dispatch(createPartner(data, (data) => {
            if(data.status == "SUCCESS") {
                setTimeout(function() { //Start the timer
                    window.location.reload();
                }.bind(this), 2000)
            }
            this.props.dispatch(partners({}, (data) => {
                this.props.dispatch(dispatchItem("PARTNER_LIST", data.Partners));
            }, () => {

            }));
        }, (data) => {
        }));
    }

    render() {
        return (
            <section className="panel small">
                <Message />
                <div className="container">
                    <div className="title-default">
                        <Link  to={"/agent/client/create"} className="title-link small">
                            Yeni Müşteri Ekle
                        </Link>
                        <span>Yeni Partner Ekle</span>
                    </div>
                    <div className="form-container">
                        <Form model={this.state.formModel} handleSubmit={this.handleSubmit} buttonText={"Partner Ekle"} buttonId={"partner-create-save"} />
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

  export default withRouter(connect(mapStateToProps)(PartnerCreate))