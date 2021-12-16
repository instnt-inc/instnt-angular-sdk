export interface Instnt {
    base64toBlob: (b64Data: any, sliceSize: number) => {}
    buildErrorMessage: (process: any, context: any, data: any, status: any) => {},
    documentVerification: true,
    emit: (event: any) => {},
    formKey: string,
    getToken: () => {},
    getTransactionStatus: (transaction_id: string) => {},
    init: () => {},
    initFingerprintJS: () => {},
    initImageProcessor: () => {},
    instnttxnid: string,
    load_scripts: (script_urls: string) => {},
    onEvent: (data: any) => {},
    otpVerification: true,
    sendOTP: (mobileNumber: string) => {},
    submitCustomForm: (data: any, redirect: string) => {},
    submitData: (data: {}, redirect: boolean) => {},
    uploadAttachment: (attachment: any, documentSide: any, isSelfie: boolean) => {},
    verifyDocuments: (documentType: any) => {},
    verifyOTP: (mobileNumber: string, otpCode: string) => {},
}

export interface InstntEvent {
    type: EventType,
    data: any
}

export enum EventType {
    TransactionInitiated = 'transaction.initiated',
    TransactionProcessed = 'transaction.processed',
    TransactionError = 'transaction.error',
    DocumentCaptured = 'document.captured',
    DocumentUploaded = 'document.uploaded',
    DocumentCaptureCancelled = 'document.capture-cancelled',
    DocumentVerificationInit = 'document.verification-initiated',
    DocumentVerified = 'document.verified',
    DocumentError = 'document.error',
    OTPSent = 'otp.sent',
    OTPVerified = 'otp.verified',
    OTPError = 'otp.error'
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