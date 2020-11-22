import React from 'react';
import Textbox from './textbox';
import TextArea from './textarea';
import Select from './select';
import Checkbox from './checkbox';
import Datepicker from './datepicker';
import Timepicker from './timepicker';
import File from './file';
import Radio from './radio';

class FormItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.item.type == "select") {
      return (
        <Select 
          data = {this.props.item}
          index = {this.props.index}
          handleChange = {this.props.handleChange}
          removeItem = {this.props.removeItem}
          />
      )
    }
    else if(this.props.item.type == "textarea") {
      return (
        <TextArea 
          data = {this.props.item}
          index = {this.props.index}
          handleChange = {this.props.handleChange}
          removeItem = {this.props.removeItem}
          />
      )
    }
    else if(this.props.item.type == "checkbox") {
      return (
        <Checkbox 
          data = {this.props.item}
          index = {this.props.index}
          handleChange = {this.props.handleChange}
          removeItem = {this.props.removeItem}
          />
      )
    }
    else if(this.props.item.type == "file") {
      return (
        <File 
          data = {this.props.item}
          index = {this.props.index}
          handleChange = {this.props.handleChange}
          removeItem = {this.props.removeItem}
          />
      )
    }
    else if(this.props.item.type == "datepicker") {
      return (
        <Datepicker 
          data = {this.props.item}
          index = {this.props.index}
          handleChange = {this.props.handleChange}
          removeItem = {this.props.removeItem}
          />
      )
    }
    else if(this.props.item.type == "timepicker") {
      return (
        <Timepicker 
          data = {this.props.item}
          index = {this.props.index}
          handleChange = {this.props.handleChange}
          removeItem = {this.props.removeItem}
          />
      )
    }
    else if(this.props.item.type == "radio") {
      return (
        <Radio 
          data = {this.props.item}
          index = {this.props.index}
          handleChange = {this.props.handleChange}
          removeItem = {this.props.removeItem}
          />
      )
    }
    else {
      return (
        <Textbox 
          data = {this.props.item}
          index = {this.props.index}
          handleChange = {this.props.handleChange}
          removeItem = {this.props.removeItem}
          />
      )
    }
    }
  }
  
  export default FormItem;