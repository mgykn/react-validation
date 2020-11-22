import React from 'react';
import { connect } from 'react-redux';
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import Message from '../../../components/message/index';
import Breadcrumb from '../../../components/breadcrumb/index';
import { groups, createGroup, dispatchItem } from '../../../actions/actions';
import { scrollToTop } from '../../../actions/utils';

class GroupCreate extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            receiverPageSize: 50,
            formModel: {
                groupName: {
                    value: '',
                    name: 'groupName',
                    type: 'text',
                    label: 'Grup Adı',
                    placeholder: 'Grup adı',
                    error: 'Lütfen grup adı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                groupDesc: {
                    value: '',
                    name: 'groupDesc',
                    type: 'textarea',
                    label: 'Grup Açıklaması',
                    placeholder: 'Grup açıklaması',
                    error: 'Lütfen grup açıklaması girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            }
        };

        this.getGroupList = this.getGroupList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(data) {
        this.props.dispatch(createGroup(data, (data) => {
            this.getGroupList(() => { this.props.history.push('/user/group/list') });
        }, (data) => {
            scrollToTop();
        }));
    }

    getGroupList(successFunc)
    {
        this.props.dispatch(groups({}, (data) => {
            this.props.dispatch(dispatchItem("GROUP_LIST", data.listGroup));
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
            name: "Gruplar",
            link : '/user/group/list'
        },{
            name: 'Yeni Grup Ekleme'
        }];
        return (
        [
          <Breadcrumb items={breadcrumbItems} />,
          <section className="panel small">
            <Message />
            <div className="container">
                <div className="title-default">
                    <span>Yeni Grup Ekleme</span>
                </div>
                <div className="form-container">
                    <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={"Grup Bilgileri"} buttonText={"Grup Oluştur"} buttonId={"group-create-save"} />
                    <Button disabled={false} extraClass={""} onClick={() => { this.props.history.push('/user/group/list') }} text={"İşlemi iptal et"} id={"group-create-cancel"} />
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

  export default connect(mapStateToProps)(GroupCreate)