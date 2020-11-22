import React from 'react';

class File extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.data.hide)
    {  
      return (
        <div className={"form-item" + (this.props.data.isSmall ? " small" : "") + (this.props.data.validationRules.isRequired ? " required" : "")}>
            {this.props.index && this.props.index > 0 &&
              <a className="form-btn-delete" href="javascript:void(0)" onClick={() => this.props.removeItem(this.props.index, this.props.data.name)}>Sil</a>
            }
            {this.props.data.label &&
              <label>{this.props.data.label}</label>
            }
            <input className="file-placeholder"
              type="text"
              value={this.props.data.valuePlaceholder.replace("C:\\fakepath\\", "")}
              placeholder={this.props.data.placeholder}
            />
            <input
             name={this.props.data.name}
             onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0))}
             type="file" 
            />
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
  
export default File;