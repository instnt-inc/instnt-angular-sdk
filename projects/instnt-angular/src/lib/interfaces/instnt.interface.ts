export interface Instnt {
    base64toBlob: (b64Data: any, sliceSize: number) => {},
    buildErrorMessage: (process: any, context: any, data: any, status: any) => {},
    captureDocument: (documentType: string, documentSide: string, captureMode: string, autoUpload: boolean, documentSettings?: {}) => {},
    captureSelfie: (captureMode: string, autoUpload: boolean, selfieSettings?: {}) => {},
    documentVerification: true,
    emit: (event: any) => {},
    endSignupSession: () => {},
    formKey: string,
    getToken: () => {},
    getTransactionStatus: (transaction_id: string) => {},
    init: () => {},
    initBehaviosecSDK: () => {},
    initFingerprintJS: () => {},
    initImageProcessor: () => {},
    instnttxnid: string,
    load_scripts: (script_urls: string) => {},
    onEvent: (data: any) => {},
    otpVerification: true,
    pollEvents: () => {},
    sendOTP: (mobileNumber: string) => {},
    stopEventPolling: () => {},
    submitCustomForm: (data: any, redirect: string) => {},
    submitData: (data: {}, redirect: boolean) => {},
    uploadAttachment: (attachment: any, documentSide: any, isSelfie: boolean) => {},
    verifyDocuments: (documentType: any) => {},
    verifyOTP: (mobileNumber: string, otpCode: string) => {},
}

export interface InstntEvent {
    event_type: string,
    event_data: any
    type?: string,
    data?: any
}

export interface DecisionResponseModel {
    status:    string;
    formKey:   string;
    url:       string;
    success:   boolean;
    instntjwt: string;
    decision:  string;
}
export interface InstntImageProcessorProps {
    documentType: DocumentType;
    documentSide: DocumentSide;
    captureMode?: CaptureMode;
    autoUpload?: boolean;
    captureFrameworkDebug?: Boolean;
}

export enum DocumentType {
    License = 'License',
}

export enum DocumentSide {
    Front = 'Front',
    Back = 'Back'
}

export enum CaptureMode {
    Auto = 'Auto'
}

export interface InvitationResponse {
    connection_id:  string;
    invitation:     Invitation;
    invitation_url: string;
    alias:          string;
}

export interface Invitation {
    "@type":         string;
    "@id":           string;
    recipientKeys:   string[];
    label:           string;
    imageUrl:        string;
    serviceEndpoint: string;
}
