import React from 'react';
import {
    BrowserRouter as Router,
    Link, withRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import InputMask from 'react-input-mask';
import Message from '../../../components/message/index';
import Form from '../../../components/form/form';
import {query, createQuery, updateQuery, findTargetQuery, queryConfig, dispatchItem} from '../../../actions/actions';
//import Select from "../../../components/form/select";
import {Multiselect} from 'multiselect-react-dropdown';
import MultiSelect from "react-multi-select-component";

class QueryCreate extends React.Component {
    constructor(props) {
        super(props);

        const queryId = this.props.match.params.id;
        const companyId = this.props.match.params.companyId;

        this.state = {
            queryName: "",
            queryParams: {
                groups: [],
                type: "AND"
            },
            queryId: queryId,
            companyId: companyId
        }

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.getCategoryIdFromRuleId = this.getCategoryIdFromRuleId.bind(this);
        this.getRulesFromRuleId = this.getRulesFromRuleId.bind(this);
        this.handleRuleChange = this.handleRuleChange.bind(this);
        this.handleSubruleChange = this.handleSubruleChange.bind(this);
        this.getRuleDescriptionFromRuleId = this.getRuleDescriptionFromRuleId.bind(this);
        this.getSubrulesFromRuleId = this.getSubrulesFromRuleId.bind(this);
        this.getRuleFromRuleId = this.getRuleFromRuleId.bind(this);
        this.getRuleTypeOptionsFromRuleId = this.getRuleTypeOptionsFromRuleId.bind(this);
        this.handleTypeOptionValueChange = this.handleTypeOptionValueChange.bind(this);
        this.handleTypeOptionValueBlur = this.handleTypeOptionValueBlur.bind(this);
        this.removeRule = this.removeRule.bind(this);
        this.addRule = this.addRule.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getOrderedAvailableTypeOptions = this.getOrderedAvailableTypeOptions.bind(this)
        this.getSelectedForMulti = this.getSelectedForMulti.bind(this);
    }

    componentDidMount() {
        if (this.props.app.xivodafone.config == null) {
            this.props.dispatch(queryConfig({}, (data) => {
                console.log(data.categories)
                this.props.dispatch(dispatchItem("CONFIG", data.categories));

                if (this.state.queryId) {
                    var serviceData = {
                        queryId: this.state.queryId
                    }
                    this.props.dispatch(query(serviceData, (data) => {
                        this.setState({
                            queryName: data.queryName,
                            queryParams: data.queryParam
                        })
                    }, () => {

                    }));
                } else {
                    this.addGroup();
                }
            }, () => {

            }));
        } else {
            if (this.state.queryId) {
                var serviceData = {
                    queryId: this.state.queryId
                }
                this.props.dispatch(query(serviceData, (data) => {
                    this.setState({
                        queryName: data.queryName,
                        queryParams: data.queryParam
                    })
                }, () => {

                }));
            } else {
                this.addGroup();
            }
        }
    }

    handleTypeChange(index, e) {
        var value = e.target.value;

        if (index == -1) {
            this.setState({
                ...this.state,
                queryParams: {
                    ...this.state.queryParams,
                    type: value
                }
            })
        } else {
            var groups = this.state.queryParams.groups;
            groups[index].type = value;

            this.setState({
                ...this.state,
                queryParams: {
                    ...this.state.queryParams,
                    groups: groups
                }
            });
        }
    }

    removeGroup(index) {
        var groups = this.state.queryParams.groups;
        groups.splice(index, 1);

        this.setState({
            ...this.state,
            queryParams: {
                ...this.state.queryParams,
                groups: groups
            }
        });
    }

    addGroup() {
        if (this.state.queryParams.groups && this.state.queryParams.groups.length > 9) {
            var notification = {};
            notification.message = "En fazla 10 sorgu grubu girebilirsiniz!";
            notification.isError = true;
            this.props.dispatch(dispatchItem('NOTIFICATION', notification));
            return;
        }
        var groupTemplate = {
            rules: [
                {
                    ruleId: "roaming_flag",
                    values: [],
                    operator: "EQ"
                }
            ],
            type: "AND"
        };
        var groups = this.state.queryParams.groups;
        groups.push(groupTemplate);

        this.setState({
            ...this.state,
            queryParams: {
                ...this.state.queryParams,
                groups: groups
            }
        });
    }

    handleCategoryChange(index, childIndex, e) {
        var value = e.target.value;
        var relatedRuleId = this.props.app.xivodafone.config.filter(p => p.id == value)[0].rules[0].id;

        var groups = this.state.queryParams.groups;
        groups[index].rules[childIndex].ruleId = relatedRuleId;

        var ruleTypeOptions = this.getRuleTypeOptionsFromRuleId(relatedRuleId);
        groups[index].rules[childIndex].operator = ruleTypeOptions[0].id;

        groups[index].rules[childIndex].values = [];

        this.setState({
            ...this.state,
            queryParams: {
                ...this.state.queryParams,
                groups: groups
            }
        });
    }

    getCategoryIdFromRuleId(ruleId) {
        var relatedCategoryId = this.props.app.xivodafone.config.filter(p => p.rules.some(q => q.id == ruleId))[0].id;

        return relatedCategoryId;
    }

    getRulesFromRuleId(ruleId) {
        var relatedRules = this.props.app.xivodafone.config.filter(p => p.rules.some(q => q.id == ruleId))[0].rules;

        return relatedRules;
    }

    handleRuleChange(index, childIndex, e) {
        var value = e.target.value;

        var groups = this.state.queryParams.groups;
        groups[index].rules[childIndex].ruleId = value;

        groups[index].rules[childIndex]["selected"] = [];

        var ruleTypeOptions = this.getRuleTypeOptionsFromRuleId(value);
        groups[index].rules[childIndex].operator = ruleTypeOptions[0].id;

        groups[index].rules[childIndex].subruleId = null;
        groups[index].rules[childIndex].values = [];

        this.setState({
            ...this.state,
            queryParams: {
                ...this.state.queryParams,
                groups: groups
            }
        });
    }

    handleSubruleChange(index, childIndex, e) {
        var value = e.target.value;

        var groups = this.state.queryParams.groups;

        groups[index].rules[childIndex].subruleId = value;
        groups[index].rules[childIndex].values = [1];

        this.setState({
            ...this.state,
            queryParams: {
                ...this.state.queryParams,
                groups: groups
            }
        });
    }

    getRuleDescriptionFromRuleId(ruleId) {
        var ruleDescription = this.props.app.xivodafone.config.filter(p => p.rules.some(q => q.id == ruleId))[0].rules.filter(p => p.id == ruleId)[0].desc;

        return ruleDescription;
    }

    getSubrulesFromRuleId(ruleId) {
        var subRules = this.props.app.xivodafone.config.filter(p => p.rules.some(q => q.id == ruleId))[0].rules.filter(p => p.id == ruleId)[0].subrules;

        return subRules;
    }

    getRuleFromRuleId(ruleId) {
        var rule = this.props.app.xivodafone.config.filter(p => p.rules.some(q => q.id == ruleId))[0].rules.filter(p => p.id == ruleId)[0];

        return rule;
    }

    getRuleTypeOptionsFromRuleId(ruleId) {
        var rule = this.props.app.xivodafone.config.filter(p => p.rules.some(q => q.id == ruleId))[0].rules.filter(p => p.id == ruleId)[0];
        var ruleType = rule.type;

        var typeOptions = [];
        if (ruleType == "NUMERIC") {
            typeOptions.push({
                id: "EQ",
                name: "Eşittir"
            });
            typeOptions.push({
                id: "LT",
                name: "Küçüktür"
            });
            typeOptions.push({
                id: "LTE",
                name: "Küçük ve Eşittir"
            });
            typeOptions.push({
                id: "GT",
                name: "Büyüktür"
            });
            typeOptions.push({
                id: "GTE",
                name: "Büyük ve Eşittir"
            });
            typeOptions.push({
                id: "IN",
                name: "Arasında"
            });
        } else if (ruleType == "STRING") {
            typeOptions.push({
                id: "EQ",
                name: "Eşittir"
            });
        } else if (ruleType == "SINGLE_SELECT") {
            typeOptions.push({
                id: "EQ",
                name: "Eşittir"
            });
        } else if (ruleType == "MULTI_SELECT") {
            typeOptions.push({
                id: "IN",
                name: "Herhangi biri"
            });
        } else if (ruleType == "YEAR_MONTH") {
            typeOptions.push({
                id: "EQ",
                name: "Eşittir"
            });
        }

        return typeOptions;
    }

    handleTypeOptionChange(index, childIndex, e) {
        var value = e.target.value;

        var groups = this.state.queryParams.groups;
        groups[index].rules[childIndex].operator = value;

        this.setState({
            ...this.state,
            queryParams: {
                ...this.state.queryParams,
                groups: groups
            }
        });
    }

    getTypeOptionValuesFromRuleId(ruleId) {
        var ruleTypeOptionValues = this.props.app.xivodafone.config.filter(p => p.rules.some(q => q.id == ruleId))[0].rules.filter(p => p.id == ruleId)[0].values;

        return ruleTypeOptionValues;
    }

    handleTypeOptionValueChange(index, childIndex, e, isSecondNumber) {
        var value;
        var selectedItem;

        var groups = this.state.queryParams.groups;
        var values = groups[index].rules[childIndex].values;
        if (e.target) {
            value = e.target.value;
            if (value.includes(",")) {
                value = value.split(",");
                selectedItem = e.target.selectedOptions[0].value;
            }
        } else {
            let valuesTmp = [];
            for (let i = 0; i < e.length; i++) {
                if (e[i].id.includes(",")) {
                    let subList = e[i].id.split(",");
                    for (let k = 0; k < subList.length; k++) {
                        valuesTmp.push(subList[k])
                    }

                } else {
                    valuesTmp.push(e[i].id)
                }
            }
            value = valuesTmp;
            groups[index].rules[childIndex]["selected"] = e;
        }

        var newValues = [];
        if (isSecondNumber) {
            if (values.length > 0) {
                newValues.push(values[0]);
            } else if (value != "") {
                newValues.push(value);
            }

            if (value != "") {
                newValues.push(value);
            }
        } else {
            if (value != "") {
                newValues = newValues.concat(value);
            }
        }

        groups[index].rules[childIndex].values = newValues;
        if (selectedItem) {
            groups[index].rules[childIndex]["text"] = selectedItem;
        } else {
            groups[index].rules[childIndex]["text"] = undefined;
        }

        this.setState({
            ...this.state,
            queryParams: {
                ...this.state.queryParams,
                groups: groups
            }
        });
    }

    handleTypeOptionValueBlur(index, childIndex, e, isSecondNumber, rule) {
        var value = e.target.value;
        var groups = this.state.queryParams.groups;

        var values = groups[index].rules[childIndex].values;

        var hasError = false;
        if (rule.type == 'NUMERIC') {
            var maxValue = rule.maxValue;
            var minValue = rule.minValue;
            var maxRange = rule.maxRange;

            if (maxValue && value > maxValue) {
                var notification = {};
                notification.message = "Maksimum " + maxValue + " değeri girilebilir!";
                notification.isError = true;
                this.props.dispatch(dispatchItem('NOTIFICATION', notification));
                hasError = true;
            } else if (minValue && value < minValue) {
                var notification = {};
                notification.message = "Minimum " + maxValue + " değeri girilebilir!";
                notification.isError = true;
                this.props.dispatch(dispatchItem('NOTIFICATION', notification));
                hasError = true;
            }

            if (maxRange && maxRange > 0) {
                if (isSecondNumber && values.length > 0) {
                    var firstNumber = values[0];
                    if (value > (firstNumber * 1) + (maxRange * 1)) {
                        var notification = {};
                        notification.message = "Girilen değerler arasındaki fark en fazla " + maxRange + " olabilir!";
                        notification.isError = true;
                        this.props.dispatch(dispatchItem('NOTIFICATION', notification));
                        hasError = true;
                    }
                } else if (!isSecondNumber && values.length > 1) {
                    var secondNumber = values[1];
                    if ((value * 1) < (secondNumber * 1) - maxRange) {
                        var notification = {};
                        notification.message = "Girilen değerler arasındaki fark en fazla " + maxRange + " olabilir!";
                        notification.isError = true;
                        this.props.dispatch(dispatchItem('NOTIFICATION', notification));
                        hasError = true;
                    }
                }
            }
        }

        if (hasError) {
            var newValues = [];
            if (isSecondNumber && values.length > 0) {
                newValues.push(values[0]);
            }

            groups[index].rules[childIndex].values = newValues;

            this.setState({
                ...this.state,
                queryParams: {
                    ...this.state.queryParams,
                    groups: groups
                }
            });
        }
    }

    removeRule(index, childIndex) {
        var groups = this.state.queryParams.groups;
        groups[index].rules.splice(childIndex, 1);

        this.setState({
            ...this.state,
            queryParams: {
                ...this.state.queryParams,
                groups: groups
            }
        });
    }

    addRule(index) {
        var ruleTemplate = {
            ruleId: "roaming_flag",
            values: [],
            operator: "EQ"
        }

        var groups = this.state.queryParams.groups;
        groups[index].rules.push(ruleTemplate);

        this.setState({
            ...this.state,
            queryParams: {
                ...this.state.queryParams,
                groups: groups
            }
        });
    }

    handleSubmit(findNumbers) {
        var isQueryValid = true;

        if (!findNumbers && this.state.queryName == '') {
            var notification = {};
            notification.message = "Sorgu ismi girmelisiniz!";
            notification.isError = true;
            this.props.dispatch(dispatchItem('NOTIFICATION', notification));

            isQueryValid = false;

        } else {
            var groups = this.state.queryParams.groups;
            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];

                var rules = group.rules;

                for (var j = 0; j < rules.length; j++) {
                    var rule = rules[j];

                    if (rule.values.length < 1 && rule.subruleId == null) {
                        var notification = {};
                        notification.message = "Tüm kurallar için bir değer girmelisiniz!";
                        notification.isError = true;
                        this.props.dispatch(dispatchItem('NOTIFICATION', notification));

                        isQueryValid = false;
                    }
                }
            }
        }

        if (isQueryValid) {
            if (findNumbers) {
                var data = {};
                data["params"] = this.state.queryParams;

                this.props.dispatch(findTargetQuery(data, (data) => {
                    var count = data.count;

                    var notification = {};
                    notification.message = "Seçtiğiniz kurallara uygun kişi sayısı: " + count;
                    notification.isError = false;
                    this.props.dispatch(dispatchItem('NOTIFICATION', notification));
                }, () => {

                }));
            } else {
                var data = {};
                data["queryName"] = this.state.queryName;
                data["queryParams"] = this.state.queryParams;

                if (this.state.queryId) {
                    data["queryId"] = this.state.queryId;

                    this.props.dispatch(updateQuery(data, (data) => {
                        var queryId = data.queryId;
                        if (this.state.companyId) {
                            this.props.history.push('/xivodafone/query/send/' + queryId + "/" + this.state.companyId);
                        } else {
                            this.props.history.push('/xivodafone/query/list');
                        }
                    }, () => {

                    }));
                } else {
                    this.props.dispatch(createQuery(data, (data) => {
                        var queryId = data.queryId;
                        if (this.state.companyId) {
                            this.props.history.push('/xivodafone/query/send/' + queryId + "/" + this.state.companyId);
                        } else {
                            this.props.history.push('/xivodafone/query/list');
                        }
                    }, () => {

                    }));
                }
            }
        }
    }

    getSelectedForMulti(item, availableOptions) {
        let selectedItems = [];
        for(let i=0;i<availableOptions.length;i++){
            for(let j=0;j<item.values.length;j++){
                if(availableOptions[i].id === item.values[j]){
                    selectedItems.push(availableOptions[i]);
                }
            }
        }

        return selectedItems;
    }


    render() {
        return (
            <section className="panel">
                <Message/>
                <div className="query">
                    <div className="card">
                        <div className="title-default">
                            Sorgu Ekle
                        </div>
                        <div className="form-item single">
                            <label>Sorgu Adı:</label>
                            <input type="text" placeholder="Sorgu Adı" value={this.state.queryName} onChange={(e) => this.setState({...this.state, queryName: e.target.value})}/>
                        </div>
                        <div className="line"></div>
                        <div className="form-item radio-slide">
                            <input id="main-combine-type-and" type="radio" name="main-combine-type" checked={this.state.queryParams.type == "AND"} value="AND"
                                   onChange={(e) => this.handleTypeChange(-1, e)}/>
                            <label for="main-combine-type-and">VE</label>
                            <input id="main-combine-type-or" type="radio" name="main-combine-type" checked={this.state.queryParams.type == "OR"} value="OR"
                                   onChange={(e) => this.handleTypeChange(-1, e)}/>
                            <label for="main-combine-type-or">VEYA</label>
                        </div>
                    </div>
                    <div className="groups">
                        {this.state.queryParams.groups.map((groups, i) => {
                            return (
                                <div className="card">
                                    <div className="group-header">
                                        <div className="form-item radio-slide">
                                            <input id={"combine-type-" + i + "-and"} type="radio" name={"combine-type-" + i} checked={groups.type == "AND"} value="AND"
                                                   onChange={(e) => this.handleTypeChange(i, e)}/>
                                            <label for={"combine-type-" + i + "-and"}>VE</label>
                                            <input id={"combine-type-" + i + "-or"} type="radio" name={"combine-type-" + i} checked={groups.type == "OR"} value="OR"
                                                   onChange={(e) => this.handleTypeChange(i, e)}/>
                                            <label for={"combine-type-" + i + "-or"}>VEYA</label>
                                        </div>
                                        <div className="title-default">
                                            {"Grup " + (i + 1).toString()}
                                        </div>
                                        {this.state.queryParams.groups.length > 1 &&
                                        <a id={"query-new-remove-group-" + i} className="btn-remove-group vcenter" href="javascript:void(0)" onClick={() => this.removeGroup(i)}
                                           title="Bu grubu sil">
                                            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 6H3H19" stroke="#007E92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path
                                                    d="M4.6002 5.99995C4.6002 5.1163 3.88385 4.39995 3.0002 4.39995V5.99995H4.6002ZM4.6002 20V5.99995H3.0002V20H4.6002ZM5.0002 20.4C4.77928 20.4 4.6002 20.2209 4.6002 20H3.0002C3.0002 21.1045 3.89563 22 5.0002 22V20.4ZM15.0002 20.4H5.0002V22H15.0002V20.4ZM15.4002 20C15.4002 20.2209 15.2211 20.4 15.0002 20.4V22C16.1048 22 17.0002 21.1045 17.0002 20H15.4002ZM15.4002 5.99995V20H17.0002V5.99995H15.4002ZM17.0002 4.39995C16.1165 4.39995 15.4002 5.1163 15.4002 5.99995H17.0002H17.0002V4.39995ZM18.6002 5.99995C18.6002 5.1163 17.8839 4.39995 17.0002 4.39995V5.99995H17.0002H18.6002ZM18.6002 20V5.99995H17.0002V20H18.6002ZM15.0002 23.6C16.9884 23.6 18.6002 21.9882 18.6002 20H17.0002C17.0002 21.1045 16.1048 22 15.0002 22V23.6ZM5.0002 23.6H15.0002V22H5.0002V23.6ZM1.4002 20C1.4002 21.9882 3.01197 23.6 5.0002 23.6V22C3.89563 22 3.0002 21.1045 3.0002 20H1.4002ZM1.4002 5.99995V20H3.0002V5.99995H1.4002ZM3.0002 4.39995C2.11654 4.39995 1.4002 5.1163 1.4002 5.99995H3.0002V4.39995ZM7.6002 3.99995C7.6002 3.77904 7.77928 3.59995 8.0002 3.59995V1.99995C6.89563 1.99995 6.0002 2.89538 6.0002 3.99995H7.6002ZM7.6002 5.99995V3.99995H6.0002V5.99995H7.6002ZM6.0002 7.59995C6.88385 7.59995 7.6002 6.88361 7.6002 5.99995H6.0002V5.99995V7.59995ZM4.4002 5.99995C4.4002 6.88361 5.11654 7.59995 6.0002 7.59995V5.99995V5.99995H4.4002ZM4.4002 3.99995V5.99995H6.0002V3.99995H4.4002ZM8.0002 0.399951C6.01197 0.399951 4.4002 2.01173 4.4002 3.99995H6.0002C6.0002 2.89538 6.89563 1.99995 8.0002 1.99995V0.399951ZM12.0002 0.399951H8.0002V1.99995H12.0002V0.399951ZM15.6002 3.99995C15.6002 2.01173 13.9884 0.399951 12.0002 0.399951V1.99995C13.1048 1.99995 14.0002 2.89538 14.0002 3.99995H15.6002ZM15.6002 5.99995V3.99995H14.0002V5.99995H15.6002ZM14.0002 7.59995C14.8839 7.59995 15.6002 6.88361 15.6002 5.99995H14.0002L14.0002 5.99995V7.59995ZM12.4002 5.99995C12.4002 6.88361 13.1165 7.59995 14.0002 7.59995V5.99995L14.0002 5.99995H12.4002ZM12.4002 3.99995V5.99995H14.0002V3.99995H12.4002ZM12.0002 3.59995C12.2211 3.59995 12.4002 3.77904 12.4002 3.99995H14.0002C14.0002 2.89538 13.1048 1.99995 12.0002 1.99995V3.59995ZM8.0002 3.59995H12.0002V1.99995H8.0002V3.59995Z"
                                                    fill="#007E92"/>
                                                <path d="M8 11V17" stroke="#007E92" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M12 11V17" stroke="#007E92" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>Bu grubu sil</span>
                                        </a>
                                        }
                                    </div>
                                    <div className="group-rules">
                                        {groups.rules.map((ee, ii) => {
                                            var selectedCategoryId = this.getCategoryIdFromRuleId(ee.ruleId);
                                            var avaliableRules = this.getRulesFromRuleId(ee.ruleId);
                                            var ruleDescription = this.getRuleDescriptionFromRuleId(ee.ruleId);
                                            var avaliableSubrules = this.getSubrulesFromRuleId(ee.ruleId);
                                            var rule = this.getRuleFromRuleId(ee.ruleId);
                                            var ruleType = rule.type;
                                            var avaliableTypeOptions = this.getRuleTypeOptionsFromRuleId(ee.ruleId);
                                            var avaliableTypeOptionValues = this.getTypeOptionValuesFromRuleId(ee.ruleId);
                                            return (
                                                <div className="rule">
                                                    <div className="rule-title">
                                                        {"Kural" + (i + 1).toString() + "." + (ii + 1).toString()}
                                                    </div>
                                                    <div className="form-item required">
                                                        <div className="select-container">
                                                            <select value={selectedCategoryId} onChange={(e) => this.handleCategoryChange(i, ii, e)}
                                                                    id={"query-rule-" + i + "-" + ii + "-1"}>
                                                                {this.props.app.xivodafone.config.sort((a, b) => a.name.localeCompare(b.name)).map((eee, iii) => {
                                                                    return (
                                                                        <option value={eee.id}>{eee.name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {avaliableRules &&
                                                    [
                                                        <div className="form-item required">
                                                            <div className="select-container">
                                                                <select value={ee.ruleId} onChange={(e) => this.handleRuleChange(i, ii, e)}
                                                                        id={"query-rule-" + i + "-" + ii + "-2"}>
                                                                    {avaliableRules.sort((a, b) => a.name.localeCompare(b.name)).map((eee, iii) => {
                                                                        return (
                                                                            <option value={eee.id}>{eee.name}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>
                                                            {ruleDescription &&
                                                            <div className="description">
                                                                {ruleDescription}
                                                            </div>
                                                            }
                                                        </div>,
                                                        <>
                                                            {avaliableSubrules && avaliableSubrules.length > 0 &&
                                                            <div className="form-item required">
                                                                <div className="select-container">
                                                                    <select value={(ee.subruleId ? ee.subruleId : '')} onChange={(e) => this.handleSubruleChange(i, ii, e)}
                                                                            id={"query-rule-" + i + "-" + ii + "-5"}>
                                                                        <option value="">Lütfen seçiniz</option>
                                                                        {avaliableSubrules && avaliableSubrules.sort((a, b) => a.name.localeCompare(b.name)).map((eee, iii) => {
                                                                            return (
                                                                                <option value={eee.id}>{eee.name}</option>
                                                                            )
                                                                        })}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            }
                                                            {(!avaliableSubrules || avaliableSubrules.length <= 0) &&
                                                            <>
                                                                <div className="form-item required">
                                                                    <div className="select-container">
                                                                        <select value={ee.operator} onChange={(e) => this.handleTypeOptionChange(i, ii, e)}
                                                                                id={"query-rule-" + i + "-" + ii + "-3"}>
                                                                            {avaliableTypeOptions && avaliableTypeOptions.sort((a, b) => a.name.localeCompare(b.name)).map((eee, iii) => {
                                                                                return (
                                                                                    <option value={eee.id}>{eee.name}</option>
                                                                                )
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                ,
                                                                <div className={"form-item required" + (ruleType == "NUMERIC" && ee.operator == "IN" ? " split" : "")}>
                                                                    {ruleType == "NUMERIC" && ee.operator != "IN" &&
                                                                    <input type="number" value={ee.values && ee.values.length > 0 ? ee.values[0] : ''}
                                                                           onChange={(e) => this.handleTypeOptionValueChange(i, ii, e)}
                                                                           onBlur={(e) => this.handleTypeOptionValueBlur(i, ii, e, false, rule)}
                                                                           id={"query-rule-" + i + "-" + ii + "-4"}/>
                                                                    }
                                                                    {ruleType == "NUMERIC" && ee.operator == "IN" &&
                                                                    [
                                                                        <input type="number" value={ee.values && ee.values.length > 0 ? ee.values[0] : ''}
                                                                               onChange={(e) => this.handleTypeOptionValueChange(i, ii, e)}
                                                                               onBlur={(e) => this.handleTypeOptionValueBlur(i, ii, e, false, rule)}
                                                                               id={"query-rule-" + i + "-" + ii + "-4-1"}/>,
                                                                        <div className="conductor vcenter">
                                                                            ile
                                                                        </div>,
                                                                        <input type="number" value={ee.values && ee.values.length > 1 ? ee.values[1] : ''}
                                                                               onChange={(e) => this.handleTypeOptionValueChange(i, ii, e, true)}
                                                                               onBlur={(e) => this.handleTypeOptionValueBlur(i, ii, e, true, rule)}
                                                                               id={"query-rule-" + i + "-" + ii + "-4-2"}/>
                                                                    ]
                                                                    }
                                                                    {ruleType == "STRING" &&
                                                                    <input type="text" value={ee.values[0]} onChange={(e) => this.handleTypeOptionValueChange(i, ii, e)}
                                                                           id={"query-rule-" + i + "-" + ii + "-4"}/>
                                                                    }
                                                                    {ruleType == "SINGLE_SELECT" &&
                                                                    <div className="select-container">
                                                                        <select value={ee.values && ee.values.length > 0 ? ee.values[0] : ""}
                                                                                onChange={(e) => this.handleTypeOptionValueChange(i, ii, e)}
                                                                                id={"query-rule-" + i + "-" + ii + "-4"}>
                                                                            <option value="">Lütfen seçiniz</option>
                                                                            {avaliableTypeOptionValues && avaliableTypeOptionValues.sort((a, b) => a.name.localeCompare(b.name)).map((eee, iii) => {
                                                                                return (
                                                                                    <option value={eee.id}>{eee.name}</option>
                                                                                )
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                    }
                                                                    {ruleType == "MULTI_SELECT" &&
                                                                    <div>

                                                                        <Multiselect class="multiselect-ui"
                                                                                     onSelect={(e) => this.handleTypeOptionValueChange(i, ii, e)}
                                                                                     onRemove={(e) => this.handleTypeOptionValueChange(i, ii, e)}
                                                                                     options={this.getOrderedAvailableTypeOptions(avaliableTypeOptionValues)} // Options to display in the dropdown
                                                                                     placeholder={"Seçiniz"} // Preselected value to persist in dropdown
                                                                                     displayValue="name" // Property name to display in the dropdown options
                                                                                     avoidHighlightFirstOption={true}
                                                                                     selectedValues={ee.selected ? ee.selected : this.getSelectedForMulti(ee,avaliableTypeOptionValues)}
                                                                                     emptyRecordMsg={"Kullanılabilir seçenek yok."}
                                                                        />

                                                                    </div>
                                                                    }
                                                                    {ruleType == "YEAR_MONTH" &&
                                                                    <InputMask
                                                                        mask="9999/99"
                                                                        placeholder="Yıl/Ay"
                                                                        type="text"
                                                                        maskChar={null}
                                                                        value={ee.values && ee.values.length > 0 ? ee.values[0] : ''}
                                                                        onChange={(e) => this.handleTypeOptionValueChange(i, ii, e)}
                                                                        id={"query-rule-" + i + "_" + ii + "_4"}
                                                                    />
                                                                    }
                                                                </div>
                                                            </>
                                                            }
                                                        </>
                                                    ]
                                                    }
                                                    {groups.rules.length > 1 &&
                                                    <a id={"query-new-remove-rule-" + i + "-" + ii} className="btn-remove-rule vcenter" href="javascript:void(0)"
                                                       onClick={() => this.removeRule(i, ii)} title="Bu kuralı sil">
                                                        <img src={require('../../../assets/icons/icon-trash.svg')} aria-hidden="true"/>
                                                        <span>Bu kuralı sil</span>
                                                    </a>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <a id={"query-new-add-rule-" + i} className="btn-add-rule vcenter" href="javascript:void(0)" onClick={() => this.addRule(i)} title="Kural ekle">
                                        <img src={require('../../../assets/icons/icon-plus-square.svg')} aria-hidden="true"/>
                                        <span>Kural ekle</span>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                    <div className="card">
                        <a id="query-new-add-group" className="btn-add-group vcenter" href="javascript:void(0)" onClick={() => this.addGroup()} title="Yeni Sorgu Grubu Oluştur">
                            <img src={require('../../../assets/icons/icon-plus-square-blue.svg')} aria-hidden="true"/>
                            <span>Yeni Sorgu Grubu Oluştur</span>
                        </a>
                        <div className="line"></div>
                        <div className="actions">
                            <div className="first">
                                <Link id="query-new-cancel" className={"btn secondary"} to={"/xivodafone/query/list"}>
                                    <span>İşlemi İptal Et</span>
                                </Link>
                            </div>
                            <div className="second">
                                <a id="query-new-proceed" className="btn primary" href="javascript:void(0)" onClick={() => this.handleSubmit()}>
                                    {this.state.companyId &&
                                    <span>Sorguyu Kaydet ve Gönderim Kur</span>
                                    }
                                    {!this.state.companyId &&
                                    <span>Sorguyu Kaydet</span>
                                    }
                                </a>
                            </div>
                            <a id="query-new-find" className="link" href="javascript:void(0)" onClick={() => this.handleSubmit(true)} title="Hedef Kitle Sayısı Bul">
                                Hedef Kitle Sayısı Bul
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    getOrderedAvailableTypeOptions(availableTypeOptionValues) {
        let availableOptions=[];
        availableTypeOptionValues.sort((a, b) => a.name.localeCompare(b.name)).map((eee, iii) => {
            availableOptions.push(eee);
        });
        return availableOptions;
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }
}

export default withRouter(connect(mapStateToProps)(QueryCreate))