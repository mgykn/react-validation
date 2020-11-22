import React from 'react';

class Textbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <a id={this.props.id} className={"btn " + (this.props.extraClass ? this.props.extraClass : "")} href="javascript:void(0)" title="Giriş Yap" onClick={this.props.onClick} disabled={this.props.disabled} >
            {this.props.image &&
              <img className={this.props.image.className} src={this.props.image.url} aria-hidden="true" />
            }
            <span>{this.props.text}</span>
        </a>
      );
    }
  }
  
  export default Textbox;