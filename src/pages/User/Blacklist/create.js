import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Breadcrumb from '../../../components/breadcrumb/index';
import Message from '../../../components/message/index';
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import { blacklist, createBlacklist, dispatchItem } from '../../../actions/actions';
import { scrollToTop } from '../../../actions/utils';

class BlacklistCreate extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            formModel: {
                blacklist: {
                    value: '',
                    name: 'blacklist',
                    type: 'globalphone',
                    label: 'Telefon Numarası',
                    placeholder: 'Telefon numarası',
                    error: 'Lütfen telefon numarası girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isPhone: true
                    }
                }
            }
        };

        this.getBlacklist = this.getBlacklist.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data)
    {
        var formPostModel = {
            blacklist: [
                data.blacklist   
            ]
        }

        this.props.dispatch(createBlacklist(formPostModel, (data) => {
            this.getBlacklist(() => { 
                this.props.history.push('/user/blacklist')
            });
        }, (data) => {
            scrollToTop();
        }));
    }

    getBlacklist(successFunc)
    {
        this.props.dispatch(blacklist({}, (data) => {
            this.props.dispatch(dispatchItem("BLACKLIST", data.blacklist));
            if(successFunc)
            {
                successFunc();
            }
        }, () => {

        }));
    }

    render() {
        const breadcrumbItems = [{
            name: "Ana Sayfa",
            link: "/"
        },{
            name: 'Karaliste Yönetimi',
            link : '/user/blacklist'
        },{
            name: 'Yeni Numara Ekleme'
        }];

        return (
            [
            <Breadcrumb items={breadcrumbItems} />,
            <section className="panel small">
                <Message />
                <div className="container">
                    <div className="title-default">
                        <span>Yeni Numara Ekleme</span>
                    </div>
                    <div className="form-container">
                        <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Karalisteye Ekle"} buttonId={"blacklist-create-save"} />
                        <Button disabled={false} extraClass={""} onClick={() => { this.props.history.push('/user/blacklist') }} text={"İşlemi iptal et"} id={"blacklist-create-cancel"} />
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

  export default withRouter(connect(mapStateToProps)(BlacklistCreate))