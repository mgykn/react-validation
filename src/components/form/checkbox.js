import React from 'react';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.data.hide)
    {  
      return (
        <div className={"form-item" + (this.props.data.isSmall ? " small" : "") + (this.props.data.validationRules.isRequired ? " required" : "")}>
            <input 
              id={this.props.data.name}
              type="checkbox"
              defaultChecked={this.props.data.value}
              name={this.props.data.name}
              onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0), 0, true)}
              disabled={this.props.data.disabled}
              />
            <label for={this.props.data.name}>{this.props.data.label}</label>
        </div>
      );
    }
    else {
      return (<div></div>)
    }
  }
}
  
export default Checkbox;