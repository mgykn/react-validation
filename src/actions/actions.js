import { call } from './apiCaller'

export function dispatchItem(type, data)
{
    return dispatch => {
        dispatch({ type: type, data: data })
    }
}

export function login(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_AUTHENTICATION_LOGIN, 'post', data, successFunc, errorFunc);
    }
}

export function otpSms(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_AUTHENTICATION_OTPSMS, 'post', data, successFunc, errorFunc);
    }
}

export function forgotPassword(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_AUTHENTICATION_FORGOTPASSWORD, 'post', data, successFunc, errorFunc);
    }
}

export function changePassword(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_AUTHENTICATION_CHANGEPASSWORD, 'post', data, successFunc, errorFunc);
    }
}

export function userVerification(data, successFunc, errorFunc, verificationCode)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_AUTHENTICATION_USERVERIFICATION.replace("{verificationCode}", verificationCode), 'get', data, successFunc, errorFunc);
    }
}

export function validateFile(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_VALIDATEFILE, 'post', data, successFunc, errorFunc);
    }
}

export function companies(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_SALESAGENT_COMPANIES_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function activateCompany(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_SALESAGENT_COMPANIES_ACTIVATE, 'post', data, successFunc, errorFunc);
    }
}

export function deactivateCompany(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_SALESAGENT_COMPANIES_DEACTIVATE, 'post', data, successFunc, errorFunc);
    }
}

export function updateCompany(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_SALESAGENT_COMPANIES_UPDATE, 'post', data, successFunc, errorFunc);
    }
}

export function createCompany(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_SALESAGENT_COMPANIES_CREATE, 'post', data, successFunc, errorFunc);
    }
}

export function activateUser(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_SALESAGENT_USERS_ACTIVATE, 'post', data, successFunc, errorFunc);
    }
}

export function deactivateUser(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_SALESAGENT_USERS_DEACTIVATE, 'post', data, successFunc, errorFunc);
    }
}

export function resendUser(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_SALESAGENT_USERS_RESEND, 'post', data, successFunc, errorFunc);
    }
}

export function updateUser(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_SALESAGENT_USERS_UPDATE, 'post', data, successFunc, errorFunc);
    }
}

export function createUser(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_SALESAGENT_USERS_CREATE, 'post', data, successFunc, errorFunc);
    }
}

export function updateProduct(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_SALESAGENT_PRODUCTS_UPDATE, 'post', data, successFunc, errorFunc);
    }
}

export function createProduct(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_SALESAGENT_PRODUCTS_CREATE, 'post', data, successFunc, errorFunc);
    }
}

export function createPartner(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_PARTNERS_CREATE, 'post', data, successFunc, errorFunc);
    }
}

export function createClient(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_CLIENTS_CREATE, 'post', data, successFunc, errorFunc);
    }
}

export function groups(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_GROUPS_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function updateGroup(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_GROUPS_UPDATE, 'post', data, successFunc, errorFunc);
    }
}

export function createGroup(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_GROUPS_CREATE, 'post', data, successFunc, errorFunc);
    }
}

export function deleteGroup(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_GROUPS_DELETE, 'post', data, successFunc, errorFunc);
    }
}

export function receivers(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_RECEIVERS_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function createReceiver(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_RECEIVERS_CREATE, 'post', data, successFunc, errorFunc);
    }
}

export function uploadReceiver(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_RECEIVERS_UPLOAD, 'post', data, successFunc, errorFunc);
    }
}

export function deleteReceiver(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_RECEIVERS_DELETE, 'post', data, successFunc, errorFunc);
    }
}

export function blacklist(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_BLACKLIST_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function createBlacklist(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_BLACKLIST_CREATE, 'post', data, successFunc, errorFunc);
    }
}

export function uploadBlacklist(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_BLACKLIST_UPLOAD, 'post', data, successFunc, errorFunc);
    }
}

export function deleteBlacklist(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_BLACKLIST_DELETE, 'post', data, successFunc, errorFunc);
    }
}

export function deleteBlacklistAll(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_BLACKLIST_DELETEALL, 'post', data, successFunc, errorFunc);
    }
}

export function blackhour(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_BLACKHOUR_GET, 'post', data, successFunc, errorFunc);
    }
}

export function setBlackhour(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_BLACKHOUR_SET, 'post', data, successFunc, errorFunc);
    }
}

export function sendSmsByFile(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_SMS_SENDBYFILE, 'post', data, successFunc, errorFunc);
    }
}

export function sendSmsByGroupId(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_SMS_SENDBYGROUPID, 'post', data, successFunc, errorFunc);
    }
}

export function sendSmsBySingle(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_SMS_SENDBYSINGLE, 'post', data, successFunc, errorFunc);
    }
}

export function userReport(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_REPORT_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function reportDownload(bmspGroupId, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_REPORT_DOWNLOAD_URL.replace("{groupId}", bmspGroupId), 'post', {}, successFunc, errorFunc, true);
    }
}

export function userLastReport(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_USER_REPORT_LASTLIST, 'post', data, successFunc, errorFunc);
    }
}

export function partners(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_PARTNERS_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function clients(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_CLIENTS_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function client(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_CLIENT, 'post', data, successFunc, errorFunc);
    }
}

export function clientContract(xCustomerId, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_CLIENT_CONTRACT.replace("{xCustomerId}", xCustomerId), 'get', {}, successFunc, errorFunc, true);
    }
}

export function queries(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_QUERIES_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function query(data,successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_QUERY, 'post', data, successFunc, errorFunc);
    }
}

export function deleteQuery(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_QUERIES_DELETE, 'post', data, successFunc, errorFunc);
    }
}

export function xiVodafoneReportClientList(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_REPORT_CLIENTS_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function xiVodafoneReportQuota(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_REPORT_QUOTA_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function xiVodafoneReportSend(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_REPORT_SEND_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function xiVodafoneReportSendDownload(xCustomerId, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_REPORT_SEND_DOWNLOAD.replace("{xCustomerId}", xCustomerId), 'post', {}, successFunc, errorFunc, true);
    }
}

export function xiVodafoneReportCancelSend(reportId, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_REPORT_CANCEL_SEND.replace("{reportId}", reportId), 'post', {}, successFunc, errorFunc);
    }
}

export function queryConfig(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_QUERY_CONFIG, 'get', data, successFunc, errorFunc);
    }
}

export function updateQuery(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_QUERY_UPDATE, 'post', data, successFunc, errorFunc);
    }
}

export function createQuery(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_QUERY_CREATE, 'post', data, successFunc, errorFunc);
    }
}

export function findTargetQuery(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_QUERY_FINDTARGET, 'post', data, successFunc, errorFunc);
    }
}

export function sendQuery(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_QUERY_SEND, 'post', data, successFunc, errorFunc);
    }
}

export function sendInfo(sendId, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_QUERY_SEND_INFO.replace("{sendId}", sendId), 'post', {}, successFunc, errorFunc);
    }
}

export function sendFileInfo(sendId, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_QUERY_SEND_INFO_FILE.replace("{sendId}", sendId), 'get', {}, successFunc, errorFunc, true, true);
    }
}

export function sendEdit(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_QUERY_SEND_EDIT, 'post', data, successFunc, errorFunc);
    }
}

export function testSmsQuery(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_QUERY_TESTSMS, 'post', data, successFunc, errorFunc);
    }
}

export function smsVerification(data, successFunc, errorFunc, verificationCode)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_SMSVERIFICATION.replace("{verificationCode}", verificationCode), 'get', data, successFunc, errorFunc);
    }
}

export function xiVodafonePartnerReportMonthly(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_PARTNERREPORT_MONTHLY_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function xiVodafonePartnerReportQuota(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_PARTNERREPORT_QUOTA_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function xiVodafonePartnerReportSend(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_PARTNERREPORT_SEND_LIST, 'post', data, successFunc, errorFunc);
    }
}

export function xiVodafonePartnerReportSendDownload(xCustomerId, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_XIVODAFONE_PARTNERREPORT_SEND_DOWNLOAD.replace("{xCustomerId}", xCustomerId), 'post', {}, successFunc, errorFunc, true);
    }
}

export function originators(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_ORIGINATORS, 'post', data, successFunc, errorFunc);
    }
}

export function partnerInfos(data, successFunc, errorFunc)
{
    return dispatch => {
        call(process.env.REACT_APP_APIURLS_PARTNERINFOS, 'post', data, successFunc, errorFunc);
    }
}

export function removeAllCache(){
    return dispatch => {
        dispatch({ type: "REMOVE_ALL" })
    }
}
