Enabling CSP
Please note that CSPs are not enabled by default. A corresponding header Content-Security-Policy or meta tag <meta http-equiv="Content-Security-Policy" ...> needs to be sent with the document to instruct the browser to enable the CSP. Here's an example of what a CSP header including a CDN white-listed URL might look like:

Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com;
For more information on CSP and nonce attribute, please refer to Further Reading section at the bottom of this page.
