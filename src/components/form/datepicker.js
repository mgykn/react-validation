import React from 'react';

class Datepicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var value = this.props.data.value;
    
    var dayValue = '';
    var monthValue = '';
    var yearValue = '';

    var values = [];

    if(value != undefined && value.indexOf('.') >= 0){
      values = value.split('.');
    }

    if(values.length == 3)
    {
      dayValue = values[0];
      monthValue = values[1];
      yearValue = values[2];
    }

    if(!this.props.data.hide)
    {  
      return (
        <div className={"date-picker" + (this.props.data.validationRules.isRequired ? " required" : "")}>
          {this.props.data.label &&
            <label>{this.props.data.label}</label>
          }
          <div className={"form-item" + (this.props.data.isSmall ? " small" : "")}>
              <div className="select-container">
                  <select
                    name={this.props.data.name}
                    value={dayValue}
                    onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0), 1)}
                    disabled={this.props.data.disabled}
                    >
                      <option value=''>Gün</option>
                      <option value='01'>1</option>
                      <option value='02'>2</option>
                      <option value='03'>3</option>
                      <option value='04'>4</option>
                      <option value='05'>5</option>
                      <option value='06'>6</option>
                      <option value='07'>7</option>
                      <option value='08'>8</option>
                      <option value='09'>9</option>
                      <option value='10'>10</option>
                      <option value='11'>11</option>
                      <option value='12'>12</option>
                      <option value='13'>13</option>
                      <option value='14'>14</option>
                      <option value='15'>15</option>
                      <option value='16'>16</option>
                      <option value='17'>17</option>
                      <option value='18'>18</option>
                      <option value='19'>19</option>
                      <option value='20'>20</option>
                      <option value='21'>21</option>
                      <option value='22'>22</option>
                      <option value='23'>23</option>
                      <option value='24'>24</option>
                      <option value='25'>25</option>
                      <option value='26'>26</option>
                      <option value='27'>27</option>
                      <option value='28'>28</option>
                      <option value='29'>29</option>
                      <option value='30'>30</option>
                      <option value='31'>31</option>
                  </select>
              </div>
          </div>
          <div className="form-item">
              <div className="select-container">
                  <select
                    name={this.props.data.name}
                    value={monthValue}
                    onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0), 2)}
                    disabled={this.props.data.disabled}
                    >
                      <option value=''>Ay</option>
                      <option value='01'>Ocak</option>
                      <option value='02'>Şubat</option>
                      <option value='03'>Mart</option>
                      <option value='04'>Nisan</option>
                      <option value='05'>Mayıs</option>
                      <option value='06'>Haziran</option>
                      <option value='07'>Temmuz</option>
                      <option value='08'>Ağustos</option>
                      <option value='09'>Eylül</option>
                      <option value='10'>Ekim</option>
                      <option value='11'>Kasım</option>
                      <option value='12'>Aralık</option>
                  </select>
              </div>
          </div>
          <div className="form-item">
              <div className="select-container">
                  <select
                    name={this.props.data.name}
                    value={yearValue}
                    onChange={(e) => this.props.handleChange(e, (this.props.index ? this.props.index : 0), 3)}
                    disabled={this.props.data.disabled}
                    >
                      <option value=''>Yıl</option>
                      <option value='2019'>2019</option>
                      <option value='2020'>2020</option>
                  </select>
              </div>
          </div>
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
  
export default Datepicker;