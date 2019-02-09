# Ride sharing

This is an intentionally vulnerable browser-based JavaScript application for use in course work. Find and fix the vulnerabilities.

This app consumes a backend API defined in [a companion, Ride Sharing API, project](https://github.com/JohanPeeters/rides-api).

## Prerequisites

Node 8.x

## Getting Started

### Preparation:
* Create a netlify account at https://www.netlify.com/
* Ask the instructor for the URL of the API as well as the API key that is required to access the API
* (Optional) Create a freenom account at https://www.freenom.com
* (Optional) Register an account at https://report-uri.com

### Get the code
First clone into the repo  
`git clone https://github.com/softwarewolves/ride-sharing.git`  
`cd ride-sharing`

Create a .env file in the root directory of the project:

    REACT_APP_API_KEY=<in case your API is hosted on AWS, an API-key is required>
    REACT_APP_API_HOST=<API location (exclude the scheme)>
    REACT_APP_API_STAGE=<in case you use a path to indicate staging, leave empty if you are not certain>

`npm install`  
`npm audit`

### Run the code locally
`npm start`

This will start a development server, open a tab in your default browser, and load the SPA. You can now make changes and the changes will be live-reloaded.

### Run the code on Netlify
You have two options:

1. `npm run build`
2. `npm run build_headerfile`

In case you have configured Netlify for continuous deployment, go for option 1, and the deploy will happen automatically.
In case you're simply copy pasting the build folder to Netlify, go for option 2, and copy paste the build folder.

### Configure custom domain (optional)
(Optional) If you have chosen for a custom .tk domain, you'll have to change the nameservers at freenom to those of Netlify. You may have to wait a couple of minutes before the DNS changes are applied and HTTPS can be activated. 

It turns out that, in order to secure the application and get full access to the API, you need some additional information. Do you know which?

## Exercise
The API you are accessing provides much more features if you are able to authenticate and receive tokens from an authorization server that is trusted by the API. The hard part is already done since such an authorization server is already set up by us (you can get the details from the instructor). What you have to do is making sure the React app is able to speak with the authorization server. Use the OIDC Authorization code flow with PKCE for that. We suggest you use Brock Allen’s oidc-client-js library.

The exercise contains three parts:
* Make the React app OIDC/OAuth2 aware and add a login button. The login should return both an ID token and an access token. The scope of the access token that you request should be 'openid rides/create rides/delete rides/update'
* add a sandboxed iframe. Verify that it is not allowed to run any scripts
* add a CSP policy which is as stringent as possible without breaking existing things

## React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Learn More about React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Security

In its current state, the application is vulnerable and does not offer the full intended functionality. The aim is to make it secure and complete features. In this section, we identify the issues that should minimally be addressed.

### Access Control

The API is secured with an [AWS Cognito User Pool](https://docs.aws.amazon.com/cognito), which means that the following API calls will only succeed if accompanied by an appropriate security token:
* POST /rides (create)
* PUT /rides/{rideID}
* DELETE /rides/{rideID}

### Browsing context isolation

Web sites often include resources from origins they do not control and should not trust. This discloses confidential information to third parties, jeopardizes user privacy and puts the integrity of the application at risk.

### XSS

Cross-Site Scripting (XSS) vulnerabilities are wide-spread and hard to avoid. A multi-layered defense to protect against XSS is recommended.

### Injection vulnerabilities

XSS is arguably the most serious type of injection vulnerability as a successful script injection may result in total control of the application. Nonetheless, other types of injections such as style injection can cause substantial damage as well.

### Information leakage

Care should be taken that URLs that carrying confidential information are not inadvertently handed to potentially hostile third parties.

### Clickjacking

In clickjacking, AKA UI redressing, an application is loaded into a transparant iframe and placed on top of another document. The user may be enticed by the underlying document to perform unintended actions in the application.

### Resource integrity

Most applications rely on third-party style and script resources. An application should protect itself against these becoming corrupted.
