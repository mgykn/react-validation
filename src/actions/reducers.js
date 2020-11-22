import {combineReducers} from 'redux';

const initialState = {
    userEmail:'',
    activePopup: '',
    loginAccessToken: '',
    accessToken: '',
    userType: '',
    loading: false,
    notification: {
        message: '',
        isError: false
    },
    agent: {
        companies: []
    },
    user: {
        groups: [],
        receivers: [],
        receiverCount: 0,
        blacklist: [],
        blacklistCount: 0,
        blackhour: {
            startDate: '',
            endDate: ''
        },
        report: []
    },
    xivodafone: {
        config: null,
        partners: [],
        clients: [],
        clientsCount: 0,
        queries: [],
        queriesCount: 0,
        clientsForReport: [],
        reportQuota: [],
        reportQuotaCount:0,
        reportSend: [],
        reportSendCount:0,
        partnerReportMonthly: [],
        partnerReportMonthlyCount: 0,
        partnerReportQuota: [],
        partnerReportQuotaCount: 0,
        partnerReportSend: [],
        partnerReportSendCount: 0
    },
    originators: [],
    partnerInfos: []
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'USER_EMAIL':
            return {
                ...state,
                userEmail: action.data
            }
        case 'LOADING':
            return {
                ...state,
                loading: action.data
            }
        case 'POPUP':
            return {
                ...state,
                activePopup: action.data
            }
        case 'NOTIFICATION':
            return {
                ...state,
                notification: action.data
            }
        case 'ACCESS_TOKEN':
            return {
                ...state,
                accessToken: action.data.accessToken,
                userType: action.data.userType
            }
        case 'LOGIN_ACCESS_TOKEN':
            return {
                ...state,
                loginAccessToken: action.data
            }
        case 'USER_TYPE':
                return {
                    ...state,
                    userType: action.data
                }            
        case 'COMPANY_LIST':
            return {
                ...state,
                agent: {
                    ...state.agent,
                    companies: action.data
                }
            }
        case 'GROUP_LIST':
            return {
                ...state,
                user: {
                    ...state.user,
                    groups: action.data
                }
            }
        case 'RECEIVER_LIST':
            return {
                ...state,
                user: {
                    ...state.user,
                    receivers: action.data
                }
            }
        case 'RECEIVER_COUNT':
            return {
                ...state,
                user: {
                    ...state.user,
                    receiverCount: action.data
                }
            }
        case 'BLACKLIST':
            return {
                ...state,
                user: {
                    ...state.user,
                    blacklist: action.data
                }
            }
        case 'BLACKLIST_COUNT':
            return {
                ...state,
                user: {
                    ...state.user,
                    blacklistCount: action.data
                }
            }
        case 'BLACKHOUR':
            return {
                ...state,
                user: {
                    ...state.user,
                    blackhour: {
                        startDate: action.data.startDate,
                        endDate: action.data.endDate
                    }
                }
            }
        case 'ORIGINATORS':
            return {
                ...state,
                originators: action.data
            }
        case 'PARTNERINFOS':
            return {
                ...state,
                partnerInfos: action.data
            }
        case 'USER_REPORT':
            return {
                ...state,
                user: {
                    ...state.user,
                    report: action.data
                }
            }
        case 'CONFIG':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    config: action.data
                }
            }
        case 'PARTNER_LIST':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    partners: action.data
                }
            }
        case 'CLIENT_LIST':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    clients: action.data
                }
            }
        case 'CLIENT_COUNT':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    clientsCount: action.data
                }
            }
        case 'QUERY_LIST':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    queries: action.data
                }
            }
        case 'QUERY_COUNT':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    queriesCount: action.data
                }
            }
        case 'XIVODAFONE_CLIENT_LIST_FOR_REPORT':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    clientsForReport: action.data
                }
            }
        case 'XIVODAFONE_REPORT_QUOTA':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    reportQuota: action.data
                }
            }
        case 'XIVODAFONE_REPORT_QUOTA_COUNT':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    reportQuotaCount: action.data
                }
            }
        case 'XIVODAFONE_REPORT_SEND':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    reportSend: action.data
                }
            }
        case 'XIVODAFONE_REPORT_SEND_COUNT':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    reportSendCount: action.data
                }
            }
        case 'XIVODAFONE_PARTNERREPORT_MONTHLY':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    partnerReportMonthly: action.data
                }
            }
        case 'XIVODAFONE_PARTNERREPORT_MONTHLY_COUNT':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    partnerReportMonthlyCount: action.data
                }
            }
        case 'XIVODAFONE_PARTNERREPORT_QUOTA':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    partnerReportQuota: action.data
                }
            }
        case 'XIVODAFONE_PARTNERREPORT_QUOTA_COUNT':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    partnerReportQuotaCount: action.data
                }
            }
        case 'XIVODAFONE_PARTNERREPORT_SEND':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    partnerReportSend: action.data
                }
            }
        case 'XIVODAFONE_PARTNERREPORT_SEND_COUNT':
            return {
                ...state,
                xivodafone: {
                    ...state.xivodafone,
                    partnerReportSendCount: action.data
                }
            }
        case 'REMOVE_ALL':
            state = initialState;
            return {
                ...state
            }
        default:
            return state
    }
}

export default combineReducers({
    app: appReducer
})