import React from 'react';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.data.hide)
    {  
      return (
        <div className={"form-item" + (this.props.data.isSmall ? " small" : "") + (this.props.data.validationRules.isRequired ? " required" : "") + (this.props.data.isHalf ? " half" : "") + (this.props.data.isHalfStart ? " half-start" : "")}>
          {this.props.index && this.props.index > 0 &&
            <a className="form-btn-delete" href="javascript:void(0)" onClick={() => this.props.removeItem(this.props.index, this.props.data.name)}>Sil</a>
          }
          {this.props.data.label &&
            <label>{this.props.data.label}</label>
          }
          <textarea
            name={this.props.data.name}
            type={this.props.data.type}
            value={this.props.data.value}
            placeholder={this.props.data.placeholder}
            onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0))}
            disabled={this.props.data.disabled}
            maxLength={this.props.data.maxLength}
          >
          </textarea>
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
  
export default TextArea;