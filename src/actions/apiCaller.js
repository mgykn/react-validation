import axios from 'axios';
import { dispatchItem, removeAllCache } from './actions';
import { store } from '../App';

const baseUrl = process.env.REACT_APP_APIURLS_HOST;

export function call(url, type, data, successFunc, errorFunc, isBlobRequest, preventBlobDownload) {
    store.dispatch(dispatchItem('LOADING', true));

    var headers = {
        'Content-Type': 'application/json'
    }
    
    if(localStorage.getItem('user') != null)
    {
        headers['Authorization'] = localStorage.getItem('user');
    }
    else if(store.getState().app.loginAccessToken !== '')
    {
        headers['Authorization'] = store.getState().app.loginAccessToken;
    }

    var requestUrl = "";
    var requestUrlBase = baseUrl;
    if(requestUrlBase.endsWith('/')) {
        requestUrlBase = requestUrlBase.substring(0, requestUrlBase.length - 1);
    }
    var requestUrlPath = url;
    if(requestUrlPath.startsWith('/')) {
        requestUrlPath = requestUrlPath.substring(1);
    }
    if(requestUrlPath.endsWith('/')) {
        requestUrlPath = requestUrlPath.substring(0, requestUrlPath.length - 1);
    }
    requestUrl = requestUrlBase + '/' + requestUrlPath;

    if(isBlobRequest)
    {   
        axios({
            method: type,
            url: requestUrl,
            headers: headers,
            data: data,
            responseType: 'blob'
        }).then((res) => {
            var blob;
            try {
                var data = res.data;

                var octetStreamMime = 'application/octet-stream';

                var cd = res.headers["Content-Disposition"];
                if(!cd)
                {
                    cd = res.headers["content-disposition"];
                }
    
                var fileName = "report";

                if(cd)
                {
                    var regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    
                    var match = regex.exec(cd);
                    
                    var fileName = match[1] || "report";
                    
                    fileName = fileName.replace(/\"/g, "");
                }
    
                var contentType = res.headers["content-type"] || octetStreamMime;

                blob = new Blob([data], {type: contentType});

                if(!preventBlobDownload) {
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(blob, fileName);
                    } else {
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.href = link;
                        
                        link.download = fileName;
                        link.click();
                    }
                }
            } catch (exc) {
                var notification = {
                    isError: true,
                    message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.'
                }
                
                store.dispatch(dispatchItem('NOTIFICATION', notification));
            }

            successFunc(blob, fileName);

            store.dispatch(dispatchItem('LOADING', false));
        }).catch(function(error) {
            var notification = {
                isError: true,
                message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.'
            }
    
            if(error.response)
            {
                if(error.response.status === 401)
                {
                    localStorage.removeItem('user');
                    localStorage.removeItem('userType');
                    
                    store.dispatch(removeAllCache)
    
                    
                    window.location.href = "/";
                }
                else if(error.response.status === 403)
                {
                    window.location.href = "/";
                }
                else
                {
                    
                }
    
                if(error.response.data && error.response.data.statusDescription)
                {
                    notification["message"] = error.response.data.statusDescription;
                }
            }
            
            
            store.dispatch(dispatchItem('NOTIFICATION', notification));
            
            if(error.response && error.response.data)
            {
                errorFunc(error.response.data);
            }
            else {
                errorFunc();
            }
    
            store.dispatch(dispatchItem('LOADING', false));
        });;
    }
    else {
        axios({
            method: type,
            url: requestUrl,
            headers: headers, 
            data: data
          }).then(res => {
            var data = res.data;
    
            var isSuccess = data.status == "SUCCESS";
                
            if(data.statusDescription != '')
            {
                var notification = {};
                notification.message = data.statusDescription;
                if(isSuccess)
                {
                    notification.isError = false;
                }
                else {
                    notification.isError = true;
                }
    
                store.dispatch(dispatchItem('NOTIFICATION', notification));
            }
            
            if(isSuccess)
            {
                if(successFunc)
                {
                    successFunc(data);
                }
            }
            else {
                if(errorFunc)
                {
                    errorFunc(data);
                }
            }
    
            store.dispatch(dispatchItem('LOADING', false));
    
        }).catch(function(error) {
            var notification = {
                isError: true,
                message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.'
            }
    
            if(error.response)
            {
                if(error.response.status === 401)
                {
                    localStorage.removeItem('user');
                    localStorage.removeItem('userType');
                    
                    store.dispatch(removeAllCache())
    
                    
                    window.location.href = "/";
                }
                else if(error.response.status === 403)
                {
                    window.location.href = "/";
                }
                else
                {
                    
                }
    
                if(error.response.data && error.response.data.statusDescription)
                {
                    notification["message"] = error.response.data.statusDescription;
                }
            }
            
            
            store.dispatch(dispatchItem('NOTIFICATION', notification));
            
            if(error.response && error.response.data)
            {
                errorFunc(error.response.data);
            }
            else {
                errorFunc();
            }
    
            store.dispatch(dispatchItem('LOADING', false));
        });
    }
}