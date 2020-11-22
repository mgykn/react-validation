import React from 'react';
import moment from 'moment';
import DatePicker, { registerLocale } from 'react-datepicker';
import tr from "date-fns/locale/tr";
import InputMask from 'react-input-mask';

registerLocale("tr", tr);

class Textbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.data.hide)
    {  
      return (
        <div className={"form-item" + (this.props.data.validationRules.isRequired ? " required" : "") + (this.props.data.isHalf ? " half" : "") + (this.props.data.isHalfStart ? " half-start" : "")}>
          {this.props.index && this.props.index > 0 &&
            <a className="form-btn-delete" href="javascript:void(0)" onClick={() => this.props.removeItem(this.props.index, this.props.data.name)}>Sil</a>
          }
          <label>{this.props.data.label}</label>
          {this.props.data.type === "phone" &&  
            <InputMask
              mask="\905999999999" 
              name={this.props.data.name}
              type={"tel"}
              value={this.props.data.value}
              placeholder={this.props.data.placeholder}
              onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0))}
              disabled={this.props.data.disabled}
              maxLength={this.props.data.maxLength}
              maskChar={null}
              autoComplete={"off"}
            />
          }
          {this.props.data.type === "globalphone" && 
              <input
              name={this.props.data.name}
              type={"tel"}
              className={"only-number"}
              value={this.props.data.value}
              placeholder={this.props.data.placeholder}
              onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0))}
              disabled={this.props.data.disabled}
              maxLength={this.props.data.maxLength}
            /> 
          }
          {this.props.data.type === "virtualPhone" && 
            <InputMask mask="\908509999999" 
              name={this.props.data.name}
              type={"tel"}
              value={this.props.data.value}
              placeholder={this.props.data.placeholder}
              onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0))}
              disabled={this.props.data.disabled}
              maxLength={this.props.data.maxLength}
              maskChar={null}
              autoComplete={"off"}
            />
          }
          {this.props.data.type === "time" && 
              <InputMask mask="29:59" 
                name={this.props.data.name}
                type={"text"}
                formatChars={{
                  "9": "[0-9]",
                  "2": "[0-2]",
                  "5": "[0-5]"
                }}
                value={this.props.data.value}
                placeholder={this.props.data.placeholder}
                onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0))}
                disabled={this.props.data.disabled}
                maxLength={this.props.data.maxLength}
                maskChar={null}
                autoComplete={"off"}
              />
            }
          {this.props.data.type === "textdate" &&
            <DatePicker
              locale="tr"
              name={this.props.data.name}
              selected={this.props.data.value ? moment(this.props.data.value, 'DD.MM.YYYY').toDate() : ""}
              dateFormat="dd.MM.yyyy"
              onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0), undefined, undefined, this.props.data.name, true)}
              autoComplete={"off"}
              />
          }
          {this.props.data.type !== "phone" && this.props.data.type !== "globalphone" &&  this.props.data.type !== "virtualPhone" && this.props.data.type !== "textdate" && this.props.data.type !== "time" &&   
            <input
              name={this.props.data.name}
              type={this.props.data.type}
              value={this.props.data.value}
              placeholder={this.props.data.placeholder}
              onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0))}
              disabled={this.props.data.disabled}
              maxLength={this.props.data.maxLength}
            /> 
          }
          {this.props.data.touched && !this.props.data.valid && 
            <div className="form-error">
              {this.props.data.error}
            </div>
          }
        </div>
      );
    }
    else {
      return (<div></div>)
    }
  }
}
  
export default Textbox;