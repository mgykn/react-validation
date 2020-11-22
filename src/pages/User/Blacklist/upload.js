import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Breadcrumb from '../../../components/breadcrumb/index';
import Message from '../../../components/message/index';
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import LeftList from './_leftList';
import { blacklist, uploadBlacklist, dispatchItem } from '../../../actions/actions';

class BlacklistUpload extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            formModel: {
                file: {
                    value: '',
                    valuePlaceholder: '',
                    name: 'file',
                    type: 'file',
                    label: 'Dosya Seç',
                    placeholder: 'Bilgisayarınızdan seçim yapmak için tıklayın',
                    error: 'Lütfen bir dosya seçin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            }
        };

        this.getBlacklist = this.getBlacklist.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.app.user.blacklist.length < 1) {
            this.getBlacklist();
        }
    }

    handleSubmit(data)
    {
        var serviceData = new FormData();
        for (var key in data) {
            serviceData.append(key, data[key]);
        }
        this.props.dispatch(uploadBlacklist(serviceData, (data) => {
            this.getBlacklist(() => { 
                this.props.history.push('/user/blacklist')
            });
        }, (data) => {
        }));
    }

    getBlacklist(successFunc)
    {
        this.props.dispatch(blacklist({ }, (data) => {
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
            name: 'Toplu Numara Ekleme'
        }];

        return (
            [
                <Breadcrumb items={breadcrumbItems} />,
                <section className="panel">
                    <Message />
                    <div className="container">
                        <LeftList items={this.props.app.user.blacklist} />
                        <div className="right">
                            <div className="header">
                                <div className="title-default">
                                    <span>Yeni Numara Ekle</span>
                                </div>
                            </div>
                            <div className="upload-file">
                                <div className="file-example">
                                    <img src={require('../../../assets/icons/icon-excel.svg')} aria-hidden="true" />
                                    <a href="/example.xlsx" target="_blank">
                                        Örnek Excel dökümanını indir
                                    </a>
                                </div>
                                <div className="form-container">
                                    <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Dosya Yükle"} buttonId={"blacklist-upload-save"} />
                                    <Button disabled={false} extraClass={""} onClick={() => { this.props.history.push('/user/blacklist') }} text={"İşlemi iptal et"} id={"blacklist-upload-cancel"} />
                                </div>
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

export default withRouter(connect(mapStateToProps)(BlacklistUpload))