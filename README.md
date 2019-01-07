# Ride sharing

This is an intentionally vulnerable browser-based JavaScript application for use in course work. Find and fix the vulnerabilities.

This app consumes a backend API defined in [a companion, Ride Sharing API, project](https://github.com/JohanPeeters/rides-api).

## Prerequisites

Node 8.x

## Getting Started

If you only want to observe the behavior of a secure version of this application, you can do so at https://ride-sharing.tk, a site hosted on [Netlify](https://netlify.com). On the other hand, you can also set up your own experiments by cloning the repo and making changes. Here are the instructions for running the application locally:

1. Gain access to a backend API by setting one up for yourself or requesting the following from the instructor or author:
   * the URL (including stage) of the API
   * an API key
1. `git clone https://softwarewolves/ride-sharing`
1. `cd ride-sharing`
1. All the information allowing you to connect to the API need to be supplied to the application. To do so, set the following environment variables, either in the shell or, better, in a `.env` file:
   * `REACT_APP_API_KEY`
   * `REACT_APP_API_HOST`
   * `REACT_APP_API_STAGE`
1. `npm install`
1. `npm start`
   * starts a development server
   * opens a tab in the default browser
   * loads the application.
1. Make changes and watch the effects on the application.

The repo contains files to build and deploy the application on Netlify as well as the source code.

It turns out that, in order to secure the application and get full access to the API, you need some additional information. Do you know which?

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
