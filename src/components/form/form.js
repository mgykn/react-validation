import React from 'react';
import {connect} from 'react-redux';
import moment, { isDate } from 'moment';
import ReCAPTCHA from "react-google-recaptcha";
import FormItem from './formitem';
import Button from './button';
import { validateFormModel, handleInputChange, scrollToItem } from '../../actions/utils'

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingActive: false,
      formModel: this.props.model,
      recaptchaToken: ''
    }

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRecaptchaChange = this.handleRecaptchaChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps)
    {
        if(this.props.model !== nextProps.model) {
            this.setState({
                formModel: nextProps.model
            });
        }
    }

  handleChange(e, index, dropdownCount, getCheckedValue, name, isDatepicker) {
    if(e && e.target && e.target.files)
    {
      var value = '';
      if(e.target.files.length > 0)
      {
        value = e.target.files[0];
      }
      
      var valuePlaceholder = e.target.value;
      
      var updatedFormModel = handleInputChange(value, e.target.name, this.state.formModel, index, valuePlaceholder, dropdownCount);
      this.setState({
          formModel: updatedFormModel
      });
    }
    else {
      var value = '';
      if(e && e.target)
      {
        name = e.target.name;
        value = e.target.value;

        if(getCheckedValue)
        {
          value = e.target.checked;
        }
      }
      else {
        if(e && isDatepicker)
        {
          value = moment(e).format('DD.MM.YYYY');
        }
        else {
          value = e;
        }
      }
      
      var updatedFormModel = handleInputChange(value, name, this.state.formModel, index, valuePlaceholder, dropdownCount);
      this.setState({
          formModel: updatedFormModel
      }, () => {
        if(this.props.onInputChange){
          this.props.onInputChange(this.state.formModel, name);
        }
      });
    }
  }

  handleRecaptchaChange(value) {
    this.setState({
      recaptchaToken: value
    });
  }

  handleButtonClick(isSecondButton) {
    this.handleSubmit(isSecondButton);
  }

  handleSubmit(isSecondButton)
  {
    if(!this.state.loadingActive)
    {
      var updatedFormModel = validateFormModel(this.state.formModel, true);
      this.setState({
          formModel: updatedFormModel
      });
      var isValid = true;
      var firstInvalidItem = null;

      Object.keys(updatedFormModel).map(function(key) {
          var formModelItemToCheck = updatedFormModel[key];
          if(Array.isArray(formModelItemToCheck))
          {
              for(var i = 0; i < formModelItemToCheck.length; i++)
              {
                  if(firstInvalidItem == null && !formModelItemToCheck[i].valid)
                  {
                    firstInvalidItem = formModelItemToCheck[i];
                  }
                  isValid = isValid && formModelItemToCheck[i].valid;
              }
          }
          else {
              if(firstInvalidItem == null && !formModelItemToCheck.valid)
              {
                firstInvalidItem = formModelItemToCheck;
              }
              isValid = isValid && formModelItemToCheck.valid;
          }
      });

      if(isValid)
      {
        this.setState({
            loadingActive: true
        });
        
        var data = {};
        
        var formModel = this.state.formModel;
        Object.keys(formModel).map(function(key) {
            var formModelItemToGetValue = formModel[key];
            if(Array.isArray(formModelItemToGetValue))
            {
              var values = [];
              for(var i = 0; i < formModelItemToGetValue.length; i++)
              {
                var value = formModelItemToGetValue[i].value;
                if(formModelItemToGetValue.type == "textdate" || formModelItemToGetValue.type == "datepicker")
                {
                  var dateValues = value.split('.');
                  if(dateValues.length == 3)
                  {
                    value = dateValues[0] + dateValues[1] + dateValues[2];
                  }
                }
                values.push(value);
              }
              data[key] = values;
            }
            else {
              var value = formModel[key].value;
              if(formModelItemToGetValue.type == "textdate" || formModelItemToGetValue.type == "datepicker")
              {
                var dateValues = value.split('.');
                if(dateValues.length == 3)
                {
                  value = dateValues[0] + dateValues[1] + dateValues[2];
                }
              }
              data[key] = value;
            }
        });
        
        this.setState({
          loadingActive: false
        });

        if(this.state.recaptchaToken != "")
        {
          data.recaptchaToken = this.state.recaptchaToken;
        }

        this.props.handleSubmit(data, isSecondButton);
      }
      else {
        scrollToItem(firstInvalidItem.name);
      }
    }
  }

  addItem(key){
    var items = this.state.formModel[key];
    if(items.length > 0)
    {
      var baseItem = JSON.parse(JSON.stringify(items[0]));
      baseItem.value = "";
      items.push(baseItem);

      this.setState({
          formModel:{
              ...this.state.formModel,
              [key]: items
          }
      });
    }
  }

  removeItem(index, key) {
    var items = this.state.formModel[key];
    if(items.length >= index)
    {
      items.splice(index, 1);
      
      this.setState({
          formModel:{
              ...this.state.formModel,
              [key]: items
          }
      });
    } 
  }

  render() {
    var formModel = this.state.formModel;
    var formItems = [];
    if(formModel)
    {
      Object.keys(formModel).map(function(key) {
        formItems.push(formModel[key]);
      });
    }

    var isMultipleColumn = (this.props.multipleColumn ? this.props.multipleColumn : false);

    return (
      <form onSubmit = {this.handleSubmit} id={this.props.formId ? this.props.formId : ""}>
        {this.props.smallTitle &&
          <div className="title-default small">
              <span>{this.props.smallTitle}</span>
          </div>
        }
        {isMultipleColumn &&
          [
          <div className="column">
            {formItems && formItems.map((item, i) => 
            {
              if(i % 2 == 0)
              { 
                if(Array.isArray(item))
                {
                  return (
                    [
                    item.map((subItem, j) => 
                      {
                        return (
                          <FormItem item={subItem} index={j} handleChange={this.handleChange} removeItem={this.removeItem} />
                        )
                      }
                    ),
                    <a className="form-btn-add" href="javascript:void(0)" onClick={() => this.addItem(item.length > 0 ? item[0].name : "")}>{(item.length > 0 ? item[0].addText : "")}</a>
                    ]
                  )
                }
                else {
                  return (
                    <FormItem item={item} handleChange={this.handleChange} />
                  )
                }
              }
            })
          }
          </div>,
          <div className="column">
            {formItems && formItems.map((item, i) => 
            {
              if(i % 2 == 1)
              {  
                if(Array.isArray(item))
                {
                  return (
                    [
                    item.map((subItem, j) => 
                      {
                        return (
                          <FormItem item={subItem} index={j} handleChange={this.handleChange} removeItem={this.removeItem} />
                        )
                      }
                    ),
                    <a className="form-btn-add" href="javascript:void(0)" onClick={() => this.addItem(item.length > 0 ? item[0].name : "")}>{(item.length > 0 ? item[0].addText : "")}</a>
                    ]
                  )
                }
                else{
                  return (
                    <FormItem item={item} handleChange={this.handleChange} />
                  )
                }
              }
            })
            }
          </div>
          ]
        }
        {!isMultipleColumn && formItems && formItems.map((item, i) => 
          {
            if(Array.isArray(item))
            {
              return(
                [  
                  item.map((subItem, j) => 
                  {
                    return (
                      <FormItem item={subItem} index={j} handleChange={this.handleChange} removeItem={this.removeItem} />
                    ) 
                  }),
                  <a className="form-btn-add" href="javascript:void(0)" onClick={() => this.addItem(item.length > 0 ? item[0].name : "")}>{(item.length > 0 ? item[0].addText : "")}</a>
                ]
              )
            }
            else {
              return (
                <FormItem item={item} handleChange={this.handleChange} />
              )
            }
          }
        )}
        {this.props.showGoogleRecaptcha && this.props.showGoogleRecaptcha == "true" &&
          <div className="form-item">  
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
              onChange={this.handleRecaptchaChange}
            />
          </div>
        }
        <Button disabled={this.state.loadingActive} extraClass={this.props.buttonExtraClass ? this.props.buttonExtraClass : "primary"} onClick={() => this.handleButtonClick(false)} text={this.props.buttonText} id={this.props.buttonId} />
        {this.props.secondButtonText &&
          <Button disabled={false} extraClass={this.props.secondButtonExtraClass ? this.props.secondButtonExtraClass : ""} onClick={() => this.handleButtonClick(true)} text={this.props.secondButtonText} id={this.props.secondButtonId} />
        }
      </form>
    );
  }
}
  
function mapStateToProps(state) {
  return {
      app: state.app 
  }
}

export default connect(mapStateToProps)(Form)