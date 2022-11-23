export interface Instnt {
    captureDocument: (documentType: string, documentSide: string, captureMode: string, autoUpload: boolean, documentSettings?: {}) => {},
    captureSelfie: (captureMode: string, autoUpload: boolean, selfieSettings?: {}) => {},
    documentVerification: true,
    endSignupSession: () => {},
    formKey: string,
    getToken: () => {},
    getTransactionStatus: (transaction_id: string) => {},
    init: () => {},
    initImageProcessor: () => {},
    instnttxnid: string,
    otpVerification: true,
    sendOTP: (mobileNumber: string) => {},
    stopEventPolling: () => {},
    submitSignupData: (data: {}) => {},
    submitVerifyData: (data: {}) => {},
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
