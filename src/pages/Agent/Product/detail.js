import React from 'react';
import {connect} from 'react-redux';
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import { companies, updateProduct, dispatchItem } from '../../../actions/actions';
import { scrollToTop } from '../../../actions/utils';

class ProductDetail extends React.Component {
    constructor(props)
    {
        super(props);
        
        this.state = {
            isEdit: false,
            formModel: {
                committedAmountOfUnit: {
                    value: this.props.item.committedAmountOfUnit,
                    name: 'committedAmountOfUnit',
                    type: 'text',
                    label: 'Taahhüt Adedi',
                    placeholder: 'Taahhüt adedi',
                    error: 'Lütfen taahhüt Adedi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isDecimal: true
                    }
                },
                productType: {
                    value: this.props.item.productType,
                    name: 'productType',
                    type: 'select',
                    label: 'Ürün Detayı',
                    placeholder: 'Ürün detayı',
                    error: 'Lütfen ürün detayı girin.',
                    options: [
                        {
                            name: 'SMS',
                            value: 'SMS'
                        },
                        {
                            name: 'Fast SMS',
                            value: 'Fast SMS'
                        },
                        {
                            name: 'MMS',
                            value: 'MMS'
                        },
                        {
                            name: 'TCKN',
                            value: 'TCKN'
                        },
                        {
                            name: 'WAPPUSH',
                            value: 'WAPPUSH'
                        },
                        {
                            name: 'IVR',
                            value: 'IVR'
                        }
                    ],
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                tariffPlan: {
                    value: this.props.item.tariffPlan,
                    name: 'tariffPlan',
                    type: 'text',
                    label: 'Tarife Detayı',
                    placeholder: 'Tarife Detayı',
                    error: 'Lütfen tarife detayı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                unitPrice: {
                    value: this.props.item.unitPrice,
                    name: 'unitPrice',
                    type: 'text',
                    label: 'Birim Fiyatı (TL)',
                    placeholder: 'Birim fiyatı (TL)',
                    error: 'Lütfen birim fiyatı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isDecimal: true
                    }
                },
                virtualNumber: {
                    value: this.props.item.virtualNumber,
                    name: 'virtualNumber',
                    type: 'virtualPhone',
                    label: 'Sanal No',
                    placeholder: 'Sanal no',
                    error: 'Lütfen sanal no girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            }
        };

        this.activateEditState = this.activateEditState.bind(this);
        this.getCompanyList = this.getCompanyList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data)
    {
        data["productId"] = this.props.item.productId;
                
        this.props.dispatch(updateProduct(data, (data) => {
            this.getCompanyList(() => {
                this.setState({
                    isEdit: false
                });
                scrollToTop();
            });
        }, (data) => {
            scrollToTop();
        }));
    }

    activateEditState(activate)
    {
        this.setState({
            isEdit: activate
        });
    }

    getCompanyList(successFunc) {
        this.props.dispatch(companies({}, (data) => {
            this.props.dispatch(dispatchItem("COMPANY_LIST", data.customerResponse));
            if(successFunc)
            {
                successFunc();
            }
        }, () => {

        }));
    }

    render() {
        return (
            <div className="items">
                {!this.state.isEdit &&
                    [
                        <div className="item-container">
                            <div className="item">
                                <div>Taahhüt Adeti</div>
                                <div>{this.props.item.committedAmountOfUnit}</div>
                            </div>
                            <div className="item">
                                <div>Ürün Detayı</div>
                                <div>{this.props.item.productType}</div>
                            </div>
                            <div className="item">
                                <div>Tarife Detayı</div>
                                <div>{this.props.item.tariffPlan}</div>
                            </div>
                            <div className="item">
                                <div>Birim Fiyat</div>
                                <div>{this.props.item.unitPrice}</div>
                            </div>
                            <div className="item">
                                <div>Sanal No</div>
                                <div>{this.props.item.virtualNumber}</div>
                            </div>
                        </div>,
                        <div className="item-container">
                            <div className="item">
                                <div>
                                    <Button disabled={false} extraClass={"tertiary"} onClick={() => this.activateEditState(true)} text={"Bilgileri Düzenle"} />
                                </div>
                                <div></div>
                            </div>
                        </div>
                    ]
                }
                {this.state.isEdit &&
                    <div className="form-container">
                        <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Kaydet"} />
                        <Button disabled={false} extraClass={"secondary"} onClick={() => this.activateEditState(false)} text={"Vazgeç"} />
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

  export default connect(mapStateToProps)(ProductDetail)