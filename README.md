# Sessions Microservice Client SDK for Node.js

This is a Node.js client SDK for [pip-services-sessions](https://github.com/pip-services/pip-services-sessions) microservice.
It provides an easy to use abstraction over communication protocols:

* HTTP/REST client
* Seneca client (see http://www.senecajs.org)
* Null client to be used in testing

<a name="links"></a> Quick Links:

* [Development Guide](doc/Development.md)
* [API Version 1](doc/NodeClientApiV1.md)

## Install

Add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-sessions-node": "^1.0.*",
        ...
    }
}
```

Then install the dependency using **npm** tool
```bash
# Install new dependencies
npm install

# Update already installed dependencies
npm update
```

## Use

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-sessions-node').Version1;
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    endpoint: {
        protocol: 'http',
        host: 'localhost', 
        port: 8007
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.SessionsRestClient(config);

// Connect to the microservice
client.open(function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Opens user session
client.openSession(
    null,
    {
        id: '123',
        name: 'Test User'
    },
    '192.168.1.1',
    'Test Client',
    null,
    function (err, session) {
        ...
    }
);
```

```javascript
// Get user sessions
client.getSessions(
    null,
    '123',
    function(err, sessions) {
    ...    
    }
);
```    

## Acknowledgements

This client SDK was created and currently maintained by *Sergey Seroukhov*.

