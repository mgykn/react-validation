import { isNumber } from "util";
import { easeInOut } from "../assets/scripts/custom"

export function scrollToTop(preventAnimation) {
    if(preventAnimation)
    {
        window.scrollTo(0,0);
    }
    else {
        scroll.to(0);
    }
}

export function scrollToItem(itemName) {
    var items = document.getElementsByName(itemName);
    if(items && items.length > 0)
    {
        var item = items[0];
        var itemTopPosition = item.getBoundingClientRect().top + window.scrollY;
        scroll.to(itemTopPosition);
    }
}

var scroll = {
    element: (window.navigator.userAgent.indexOf("Edge") != -1 ? document.body : document.documentElement),
    time: 500,
    startTime: 0,
    start: 0,
    distance: 0,
    to: function(target){
        if (typeof(target) == "undefined" || target == null || target < 0) {
            target = 0;
        }
        else if (target > scroll.element.scrollHeight - window.innerHeight) {
            target = scroll.element.scrollHeight - window.innerHeight;
        }

        scroll.start = scroll.element.scrollTop;
        scroll.distance = target - scroll.start;

        scroll.startTime = performance.now();

        requestAnimationFrame(scroll.process);
    },
    process: function(){
        var currentTime = performance.now();
        if (scroll.startTime + scroll.time >= currentTime) {
            var current = scroll.start + scroll.distance * easeInOut((currentTime - scroll.startTime) / scroll.time);

            window.scrollTo(0, current);
            requestAnimationFrame(scroll.process);
        }
        else {
            window.scrollTo(0, scroll.start + scroll.distance);
        }
    }
};

export function setPanelHeight() {
    const headerPlaceholder = document.querySelector('.header-placeholder');
    const header = document.getElementsByTagName('header');
    const footer = document.getElementsByTagName('footer');
    const breadcrumb = document.querySelector('section.breadcrumb');
    
    var headerHeight = 0;
    var footerHeight = 0;
    var breadcrumbHeight = 0;
    if(header != null && header.length > 0)
    {
        headerHeight = header[0].offsetHeight;
    }
    if(footer != null && footer.length > 0)
    {
        footerHeight = footer[0].offsetHeight;
    }
    if(breadcrumb != null)
    {
        breadcrumbHeight = breadcrumb.offsetHeight; 
    }

    var heightToRemove = headerHeight + footerHeight + breadcrumbHeight;
    
    const panel = document.querySelector('section.panel');
    const select = document.querySelector('section.select');
    const panelHeight = (window.innerHeight - heightToRemove);

    if(panel != null)
    {
        panel.style.minHeight = panelHeight  + "px";
        
        const panelRight = document.querySelector('section.panel .right');
        const paddingTopValue = window.getComputedStyle(panel, null).getPropertyValue('padding-top').replace('px', '');
        const paddingBottomValue = window.getComputedStyle(panel, null).getPropertyValue('padding-bottom').replace('px', '');
        const panelRightMinHeight = panelHeight - parseInt(paddingTopValue) - parseInt(paddingBottomValue);
        if(panelRight != null)
        {
            panelRight.style.minHeight = panelRightMinHeight + "px";
        }
    }
    if(select != null)
    {
        select.style.minHeight = panelHeight + "px";
    }
    
    if(headerPlaceholder != null)
    {
        headerPlaceholder.style.height = (headerHeight + breadcrumbHeight) + "px";
    }
}

export function handleInputChange(value, name, formModel, index, valuePlaceholder, dropdownCount)
{
    let updatedFormModel = formModel;

    let updatedFormElement = updatedFormModel[name];
    
    let updatedFormElementPlaceholder = updatedFormElement;

    if(Array.isArray(updatedFormElement))
    {
        updatedFormElementPlaceholder = updatedFormElement[index];
    }

    if(updatedFormElementPlaceholder.type === "file")
    {
        updatedFormElementPlaceholder.valuePlaceholder = valuePlaceholder;
    }
    
    if(updatedFormElementPlaceholder.type === "datepicker")
    {
        var values = updatedFormElementPlaceholder.value.split('.');
        if(values.length != 3)
        {
            values = ['', '', ''];
        }

        values[dropdownCount - 1] = value;

        var notEmpty = false;
        for(var i = 0; i < values.length; i++)
        {
            if(values[i] != '')
            {
                notEmpty = true;
            }
        }

        if(notEmpty)
        {
            updatedFormElementPlaceholder.value = values.join('.');
        }
        else {
            updatedFormElementPlaceholder.value = '';
        }
    }
    else if(updatedFormElementPlaceholder.type === "timepicker")
    {
        var values = updatedFormElementPlaceholder.value.split(':');
        if(values.length != 2)
        {
            values = ['', ''];
        }

        values[dropdownCount - 1] = value;
        
        var notEmpty = false;
        for(var i = 0; i < values.length; i++)
        {
            if(values[i] != '')
            {
                notEmpty = true;
            }
        }

        if(notEmpty)
        {
            updatedFormElementPlaceholder.value = values.join(':');
        }
        else {
            updatedFormElementPlaceholder.value = '';
        }
    }
    else {
        updatedFormElementPlaceholder.value = value ? value : "";
    }

    if(Array.isArray(updatedFormElement))
    {
        updatedFormElement[index] = updatedFormElementPlaceholder;
    }
    else {
        updatedFormElement = updatedFormElementPlaceholder;
    }

    updatedFormModel[name] = updatedFormElement;

    //Custom Login For Sms Send
    if(name === 'sendOnFuture')
    {
        if(value)
        {
            var startDate = formModel["startDate"];
            var startTime = formModel["startTime"];
            startDate.hide = false;
            startTime.hide = false;
            formModel.startDate = startDate;
            formModel.startTime = startTime;
        }
        else {
            var startDate = formModel["startDate"];
            var startTime = formModel["startTime"];
            startDate.hide = true;
            startTime.hide = true;
            formModel.startDate = startDate;
            formModel.startTime = startTime;
        }
    }

    updatedFormModel = validateFormModel(updatedFormModel, false);

    return updatedFormModel;
}

export function validateFormModel(model, isSubmit)
{
    let newModel = model
    
    Object.keys(newModel).map(function(key) {
        let newModelElement = newModel[key];
        
        var isArray = false;
        var elementsToCheck = [];
        if(Array.isArray(newModelElement))
        {
            isArray = true;
            elementsToCheck = newModelElement;
        }
        else {
            elementsToCheck.push(newModelElement);
        }
        
        for(var i = 0; i < elementsToCheck.length; i++)
        {
            var elementToCheck = elementsToCheck[i];
            let value = elementToCheck.value;
            
            let validationRules = elementToCheck.validationRules;
            
            if(elementToCheck.disabled || elementToCheck.hide)
            {
                elementsToCheck[i].valid = true;
            }
            else {
                elementsToCheck[i].valid = validateFormItem(value, validationRules);
            }
    
            if(isSubmit)
            {
                elementsToCheck[i].touched = true;
            }
        }

        var elementToReplace = elementsToCheck;
        if(!isArray)
        {
            elementToReplace = elementsToCheck.length > 0 ? elementsToCheck[0] : {};
        }
        
        newModel = {
            ...newModel,[key]: elementToReplace
        }
    });

    return newModel;
}

export function validateFormItem(value, validationRules)
{
    let isValid = true;

    var isRequired = validationRules.hasOwnProperty('isRequired');
    
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var numRegex = /^\d+$/;
    var decimalRegex = /^[0-9]*\,?[0-9]*$/;
    var phoneRegex = /^(\(?\+?[0-9]{1,3}\)?)?[0-9_ ]{7,12}$/;
    
    for (let rule in validationRules) {
        switch (rule) {
            case 'isRequired': 
                isValid = isValid && String(value).length > 0;
                break;
            case 'email':
                var isEmail = emailRegex.test(String(value).toLowerCase());
                isValid = isValid && (isEmail || (!isRequired && value == ''));
                break;
            case 'isNumber':
                var isDecimal = numRegex.test(String(value).toLowerCase())
                isValid = isValid && (isDecimal || (!isRequired && value == ''));
                break;
            case 'isDecimal':
                var isDecimal = decimalRegex.test(String(value).toLowerCase())
                isValid = isValid && (isDecimal || (!isRequired && value == ''));
                break;
            case 'isPhone':
                var isPhone = phoneRegex.test(String(value).toLowerCase())
                isValid = isValid && (isPhone || (!isRequired && value == ''));
                break;
            case 'isDate':
                var isDate = false;
                var dateItems = [];
                if(value.indexOf('.') >= 0){
                    dateItems = value.split('.');
                }
                if(value.indexOf('/') >= 0){
                    dateItems = value.split('/');
                }
                if(value.indexOf('-') >= 0){
                    dateItems = value.split('-');
                }
                if(dateItems.length === 3)
                {
                    var day = dateItems[0];
                    var month = dateItems[1];
                    var year = dateItems[2];
                    isDate = 
                        numRegex.test(String(day).toLowerCase()) && (day.length === 1 || day.length === 2)
                        && numRegex.test(String(month).toLowerCase()) && (month.length === 1 || month.length === 2)
                        && numRegex.test(String(year).toLowerCase()) && year.length === 4;
                    if(isDate)
                    {
                        var d = new Date(year, parseInt(month) - 1, day);
                        isDate = isDate && d.getFullYear() == year && d.getMonth() + 1 == month;
                    }
                }

                isValid = isValid && (isDate || (!isRequired && value == ''));
                break;
            case 'isTime':
                var isTime = false;
                var timeItems = [];
                if(value.indexOf(':') >= 0){
                    timeItems = value.split(':');
                }
                if(timeItems.length === 2)
                {
                    var hour = timeItems[0];
                    var minute = timeItems[1];
                    isTime = numRegex.test(String(hour).toLowerCase()) && numRegex.test(String(minute).toLowerCase()) && parseInt(hour) <= 23 && parseInt(minute) <= 59;
                }

                isValid = isValid && (isTime || (!isRequired && value == ''));
                break;
            default: 
                isValid = isValid;
        }
    }

    return isValid;
}

export function clearFormModel(model)
{
    let newModel = model
    
    Object.keys(newModel).map(function(key) {
        let newModelElement = newModel[key];
        
        var isArray = false;
        var elementsToCheck = [];
        if(Array.isArray(newModelElement))
        {
            isArray = true;
            elementsToCheck = newModelElement;
        }
        else {
            elementsToCheck.push(newModelElement);
        }
        
        for(var i = 0; i < elementsToCheck.length; i++)
        {
            elementsToCheck[i].touched = false;
        }

        var elementToReplace = elementsToCheck;
        if(!isArray)
        {
            elementToReplace = elementsToCheck.length > 0 ? elementsToCheck[0] : {};
        }
        
        newModel = {
            ...newModel,[key]: elementToReplace
        }
    });

    return newModel;
}

export function hasSmsValidChars(text)
{
    var validChars = "@ £$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞ^{}\[~]|€ÆæßÉ!“#¤%&‘()*+,–./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüàıİçşŞğĞ\"'_";
    
    if(text.split("").some(ch => validChars.indexOf(ch) == -1))
    {
        return false;
    }
    else {
        return true;
    }
}

export function maximumSmsLength(text, allCharactersAcceptable)
{
    var messageLength = 160;

    if(!allCharactersAcceptable && !hasSmsValidChars(text))
    {
        messageLength = 70;
    }
    var firstMessageLength = messageLength - 5;

    return messageLength * 5 + firstMessageLength;

}

export function calculateSmsLength(text, allCharactersAcceptable)
{
    var messageLength = 160;

    if(!allCharactersAcceptable && !hasSmsValidChars(text))
    {
        messageLength = 70;
    }
    var firstMessageLength = messageLength - 5;

    if(text.length <= firstMessageLength)
    {
        return 1;
    }
    else {
        return Math.floor((text.length - firstMessageLength) / messageLength) + (((text.length - firstMessageLength) % messageLength) == 0 ? 1 : 2);
    }
}