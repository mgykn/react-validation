import React from 'react';

class Radio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.data.hide)
    {  
      return (
        <div className={"form-item" + (this.props.data.isSmall ? " small" : "") + (this.props.data.validationRules.isRequired ? " required" : "")}>
          {this.props.data.label &&
            <label>{this.props.data.label}</label>
          }
          {this.props.data.options && this.props.data.options.map((item, i) =>
            [
              <input id={"radio-" + this.props.data.name + i} type="radio" name={this.props.data.name} value={item.value} checked={this.props.data.value == item.value} onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0))} />,
              <label for={"radio-" + this.props.data.name + i}>{item.name}</label>
            ]
          )}
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
  
  export default Radio;