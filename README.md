# Instnt Angular SDK

This documentation covers the basics of Instnt Angular SDK implementation. Angular is an open-source front-end developer library utilized by Instnt to create a more streamlined and elegant integration with your company's customer sign-up forms. For a more detailed look at this implementation, visit
[Instnt's documentation hub.](https://support.instnt.org/hc/en-us/articles/360055345112-Integration-Overview)

[![build status]()]()
[![npm version]()]()

### Table of Contents
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  * [Setup for InstntSignupProvider component](#setup-for-instntsignupprovider-component)
    * [Properties](#properties)
- [Document verification](#document-verification)
  * [Document verification prerequisites](#document-verification-prerequisites) 
    * [Properties](#properties)
  * [Setup for InstntDocumentProcessor component](#setup-for-instntdocumentprocessor-component)
  * [Setup for InstntSelfieProcessor component](#setup-for-instntselfieprocessor-component)
- [OTP verification](#otp-verification)
  * [OTP workflow ](#otp-flow )
- [Submit data](#submit-data)
- [Event processing](#event-processing)
  
- [Instnt core library objects, functoins and events](#instnt-core-library-objects-functoins-and-events)
  
- [Instnt's sandbox](#instnts-sandbox)
- [Assertion response payload](#assertion-response-payload)
- [Resource links](#resource-links)
- [FAQ](#faq)

# Prerequisites

* Sign in to your account on the Instnt Accept's dashboard and create a customer signup workflow that works for your company. Refer [Quick start guide](https://support.instnt.org/hc/en-us/articles/4408781136909) and [Developer guide, ](https://support.instnt.org/hc/en-us/articles/360055345112-Integration-Overview) for more information.

* The integration of SDK depends on your workflow; read the [Instnt Accept integration process,](https://support.instnt.org/hc/en-us/articles/4418538578701-Instnt-Accept-Integration-Process) to understand the functionalities provided by Instnt and how to integrate SDK with your application.

**Note:** Your implementation with Instnt's SDK may diverge from the integration shown in the sample app. Please contact the Instnt support team for additional questions related to Integration.

# Getting Started

* Instnt Angular SDK is comprised of Angular components, Javascript library functions, and an event propagation mechanism to facilitate communication between your application, Instnt SDK, and Instnt's APIs.

* To begin utilizing Instnt Angular SDK, open the terminal and enter the following command to install Instnt's Angular components:

```sh
npm i @instnt/instnt-angular-js

```

## Setup for InstntSignupProvider component

After installing the Instnt npm package, import Instnt's Angular Workflow component called **instnt-signup-provider** into your app module.

```sh
import { Instnt, InstntAngularService } from '@instnt/instnt-angular-sdk';
```
 Import the Instnt Angula module as in following example:

```java
 imports: [
    InstntAngularModule]
```

## Properties 

To initate Instnt you need to include the instnt tag in your html file and pass the information as folllows:

``` html
<instnt-signup-provider [formId]="formId" [serviceURL]="serviceURL" [onEvent]="onEvent" [children]="children">
</instnt-signup-provider>
```
* **formId** - Required. A Workflow ID. For more information concerning Workflow IDs, please visit Instnt's documentation library.

* **serviceURL** - Required. Instnt's service URL to connect and access API.

* **sandbox** - Optional. If this boolean argument is set to true, a sandbox (test) environment will be used instead of a production environment.

* **onEvent** - Optional. Used to provide event handling, it is invoked when various Instnt events occur. `onEventHandler(event)`.

* **children** - Optional. Child Angular components to be rendered by the application.

After the initiation, you get the [Instnt Object.](#instnt-object) This object has all the necesaary function and event deatils for you to work with.

## Instnt service

In this Angular SDK use the `instntservice` to get an observable via `getInstnt()` function.
When you subscribe to the instntservice you get an Instnt object that can be referenced application wide to access various functions and properties.

# Document verification
Document verification feature comes into the picture if you have enabled it during the workflow creation.

When this feature is enabled, the physical capture and verification of selfies and Government-issued identification documents such as Passports and Driver's License is available.

**Note:** Document Verification feature usage in your SDK requires a **License** **key**. Please contact the support at the email support@instnt.org for further assistance.


Read the [Document Verification](https://support.instnt.org/hc/en-us/articles/4408781136909#heading-6) section of the Quickstart guide to understand better about how to enable the feature.

## Document verification prerequisites

* Web applications running on mobile-angular can utilize Document Verification.
 
* iOS and Android mobile devices with Chrome or Safari browsers are supported for document verification.
 
* Desktop devices (laptops, PCs) are unsupported due to the poor quality of embedded cameras and lack of gyroscopes for orientation detection. While the feature will work on devices running Chrome or Safari browsers, the experience can vary.
 
* Do not include HTML tags with IDs containing the prefix 'aid.' e.g. `<div id=’aidFooter’>` in your web app as this prefix is reserved to be used by the toolkit. 

* Document verification requires end-to-end communication over SSL to get permission to use the device camera.


## Setup for InstntDocumentProcessor component

* Import the InstntDocumentProcessorComponent as shown below:

``` java
Import { InstntDocumentProcessorComponent } from './instnt-document-processor.component';
```
* The first step in the document verification functionality is starting the camera, next get the pre-signed URL where you can upload the documents.

*  Instnt SDK bundles various 3rd party SDKs, one of which is **AuthenticID** SDK responsible for the document capture. InstntDocumentProcessorComponent abstracts the document capture functionality by providing a simplified Angular component interface.

### Properties

You need to pass the properties such as documentType and documentSide as shown in the example. 

``` java
documentType: “License”

documentSide: “Front”

captureMode: “Manual”

autoupload: true (default)

captureFrameworkDebug?: boolean = false;
```

**Function call**

```java
documentCapture(this.documentType, this.documentSide, this.captureMode, this.autoUpload, this.captureFrameworkDebug);
```

## Setup for InstntSelfieProcessor component

Similar to the InstntDocumentProcessor, InstntSelfieProcessor also needs to initialize the he camera, next get the pre-signed URL where you can upload the documents to.

Import the InstntSelfieProcessorComponent as shown below:

``` java
import { InstntSelfieProcessorComponent } from './instnt-selfie-processor.component';
```

### Properties

``` java
captureMode: “Manual”

autoupload: true (default)

captureFrameworkDebug?: boolean = false;
```

# OTP verification
OTP functionality can be enabled by logging in Instnt dashboard and enabling OTP in your workflow. Refer to the [OTP](https://support.instnt.org/hc/en-us/articles/4408781136909#heading-5) section of the Quickstart guide for more information.

## OTP flow
* User enters mobile number as part of the signup screen.
* Your app calls send OTP() SDK function and pass the mobile number.
* Instnt SDK calls Instnt API and returns the response upon successful OTP delivery.
* Your app shows the user a screen to enter the OTP code.
* User enters the OTP code which they received.
* Your app calls verify the OTP() SDK function to verify the OTP and pass mobile number and OTP code.
* Instnt SDK calls Instnt API and returns the response upon successful OTP verification


Instnt SDK provides two Javascript library functions to enable OTP.

1. sendOTP (mobileNumber)
2. verifyOTP(mobileNumber, otpCode)

* In your implementation you can subscribe to the Instnt object in the constructor as in the following **example**:

``` java

instnt?: Instnt;

constructor(
    public instntService: InstntAngularService,
    public handler: EventHandlerService,
    private router: Router,
    private dataService: DataService) {
    this.instntService.getInstnt().subscribe((instnt) => this.instnt = instnt);
    this.phoneVerifyForm = new FormGroup({
      phone: this.phone,
    });
    this.otpVerifyForm = new FormGroup({
      otpVerify: this.otpVerify
    })
  }
```

* You can use the library function to sendOTP with the phone numnber as the argument in the following fashion:

**Example**
```java
 this.instnt?.sendOTP(phone);
```

* Next you can use the library function verifyOTP with the phone numnber as the argument as shown on the sample code:

**Example**
```java
this.instnt?.verifyOTP(phone, this.otpVerifyForm.get('otpVerify')?.value);
```

Please refer to the [library function](#instnt-object) listed below for more details.


# Submit data

Depending on your workflow, once all the functionalities are covered, then the last step in the customer signup process is sumitting the data.
In the `Interface` provided by the SDK you can see the function  `submitData: (data: {}, redirect: boolean) => {}` that you can use to submit all the data. After which you get the [Assertion response payload](#assertion-response-payload).

# Event processing

Your application can listen to the [events](#events) emitted by Instnt's SDK and respond to it. Below is a sample event handler:


``` java
export class EventHandlerService {

  eventHandler: any;
  transactionInit: ReplaySubject<Instnt> = new ReplaySubject(1);
  OTPSent: ReplaySubject<any> = new ReplaySubject(1);
  OTPVerified: ReplaySubject<any> = new ReplaySubject(1);
  DocumentCaptured: ReplaySubject<any> = new ReplaySubject(1);
  SubmitResult: ReplaySubject<any> = new ReplaySubject(1);
  constructor() {
    this.eventHandler = (event: InstntEvent) => {
      this.testInstnt = event
      console.log('event handler service', event);
      const eventData = event.data;
      switch (event.type) {
        case EventType.TransactionInitiated:
          const instntRef = event.data.instnt;
          this.transactionInit.next(instntRef);
          break;
        case EventType.OTPSent:
          console.log('event type otp sent', event.type);
          this.OTPSent.next(eventData);
          break;
        case EventType.OTPVerified:
          this.OTPVerified.next(eventData);
          break;
        case EventType.OTPError:
          console.log('event type otp.error triggered', event);
          this.OTPSent.error(event.data);
          this.OTPVerified.error(event.data);
          break;
        case EventType.DocumentCaptured:
          console.log('event type document.captured triggered', event);
          this.DocumentCaptured.next(event);
          break;
        case EventType.DocumentCaptureCancelled:
          console.log('event type documentCapture Canceled triggered', event);
          this.DocumentCaptured.next(event);
          break;
        case EventType.TransactionProcessed:
          console.log('event type Transaction Proccessed', event);
          this.SubmitResult.next(event);
          break;
        case EventType.TransactionError:
          console.log('event type Transaction Error', event);
          this.SubmitResult.error(event);
          this.SubmitResult.complete();
          console.log('should have submited error and then complete')
          break;
        default:
          console.log("unhandled instnt event ", event);
          this.OTPVerified.complete();
      }

    }
  }
  ```

# Instnt's core library objects, functoins and events

>**NOTE:**
>Please refer [Instnt's Core JavaScript Library ](https://support.instnt.org/hc/en-us/articles/4997119804301) for details regarding the Instnt's core Javascript library objects, functions and events.

# Instnt's Sandbox

Instnt's Sandbox is a static environment that assesses provisioned synthetic identities that we give you for onboarding and testing purposes. The provisioned identities contain:

* Email address
* First name
*	Last name
*	Phone number
*	Physical address (city, state, zip)
*	IP address

Please contact support@instnt.org for more information concerning access to the sandbox environment.


# Assertion response payload

Connect to the sandbox environment and you can begin processing synthetic applicants provided to you by Instnt. The decisions applied to these synthetic applicants will be returned in the form of an assertion response payload that must be decrypted.

For more information concerning the decryption and analysis of the assertion response payload refer to the [Data Encryption and Decryption](https://support.instnt.org/hc/en-us/articles/360045168511) and [Getting and Analyzing the Assertion Response](https://support.instnt.org/hc/en-us/articles/360044671691) articles in the Developer Guide.

# Resource links 
- [Quickstart guide](https://support.instnt.org/hc/en-us/articles/4408781136909)
- [Developer guide](https://support.instnt.org/hc/en-us/articles/360055345112-Integration-Overview)
- [Instnt API documentation](https://swagger.instnt.org/)
- [Instnt documentation hub](https://support.instnt.org/hc/en-us)


# FAQ 

## What if I want to add some custom text fields onto my workflows?
After setting up the InstntCustomSignUp function, simply install the following Angular Material UI components using the following commands:

npm i @angular/material
In your angular module component, import the following:

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

Once the components have been installed and imported, collect data from the user. Example:
```html
  <mat-form-field class="example-full-width">
    <mat-label>Email Address</mat-label>
    <input matInput placeholder="Email Address" formControlName="email">
  </mat-form-field>
  ```
The 'email' input here is used as an example and can be anything you'd like to have appear on the workflow. Always include the value and onChange fields as written in the example above, as they mark the text field as data to be passed through the InstntCustomSignUp function.

## Angular Version

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3. But it can used on the older versions of Angular as well.

# License

The instnt-angularjs SDK is under MIT license.

















