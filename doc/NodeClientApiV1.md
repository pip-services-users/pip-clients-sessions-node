# Client API (version 1) <br/> Sessions Microservices Client SDK for Node.js

Node.js client API for Sessions microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [Session class](#class1)
* [ISessionsClient interface](#interface)
    - [init()](#operation1)
    - [open()](#operation2)
    - [close()](#operation3)
    - [getSessions()](#operation4)
    - [loadSession()](#operation5)
    - [openSession()](#operation6)
    - [storeSessionData()](#operation7)
    - [closeSession()](#operation8)
    - [deleteSession()](#operation9)
* [SessionsRestClient class](#client_rest)
* [SessionsSenecaClient class](#client_seneca)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-sessions-node": "git+ssh://git@github.com:pip-services/pip-clients-sessions-node.git",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

If you are using Typescript, add the following type definition where compiler can find it
```javascript
/// <reference path="../node_modules/pip-clients-sessions-node/module.d.ts" />
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-sessions-node').Version1;

// Client configuration
var config = {
    transport: {
        type: 'http',
        host: 'localhost', 
        port: 8007
    }
};

// Create the client instance
var client = sdk.SessionsRestClient(config);

// Open client connection to the microservice
client.open(function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Opens user session
    client.openSession(
        {
            id: '123',
            name: 'Test User'
        },
        '192.168.1.1',
        'Test Client',
        null,
        function (err, session) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Opened user session is');
            console.log(activity);
                        
            // Get sessions for user 123
            client.getSessions(
                '123',
                function (err, sessions) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Opened user sessions are');
                    console.log(sessions);
                    
                    // Close connection
                    client.close(); 
                }
            );
        }
    );
});
```

### <a name="class1"></a> Session class

Represents an open user session

**Properties:**
- id: string - unique session id
- opened: Date - date and time when session was opened
- last_request: Date - date and time when last request was processed
- address: string - client address
- client: string - client application name
- platform: string - client OS
- user: Object - information about user
- data: Object - session data

## <a name="interface"></a> ISessionsClient interface

If you are using Typescript, you can use ISessionsClient as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about ISessionsClient interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface ISessionsClient {
    init(refs);
    open(callback);
    close(callback);
    getSessions(userId, callback);
    openSession(user, address, client, data, callback);
    loadSession(userId, sessionId, callback);
    storeSessionData(userId, sessionId, data, callback);
    closeSession(userId, address, client, callback);
    deleteSession(userId, sessionId, callback);
}
```

### <a name="operation1"></a> init(refs)

Initializes client references. This method is optional. It is used to set references 
to logger or performance counters.

**Arguments:**
- refs: References - references to other component 
  - log: ILog - reference to logger
  - countes: ICounters - reference to performance counters

### <a name="operation2"></a> open(callback)

Opens connection to the microservice

**Arguments:**
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation3"></a> close(callback)

Closes connection to the microservice

**Arguments:**
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation4"></a> getSessions(userId, callback)

Retrieves all opened user sessions.

**Arguments:** 
- userId: string - unique user id
- callback: (err, sessions) => void - callback function
  - err: Error - occured error or null for success
  - sessions: [Session] - all opened user sessions

### <a name="operation5"></a> loadSession(userId, sessionId, callback)

Load opened user session by user id and session id.

**Arguments:** 
- userId: string - unique user id
- sessionId: string - unique session id
- callback: (err, session) => void - callback function
  - err: Error - occured error or null for success
  - session: Session - open user session or null if session wasn't found

### <a name="operation6"></a> openSession(user, address, client, data, callback)

Opens a new user session and stores user information in it.

**Arguments:** 
- user: Object - user information
  - id: string - unique user id
  - name: string - full user name
  - ... - other user properties
- address: string - client address
- client: string - client application name
- data: Object - (optional) session data
- callback: (err, session) => void - callback function
  - err: Error - occured error or null for success
  - session: Session - newly opened user session or existing session if it was already opened for the same address and client

### <a name="operation7"></a> storeSessionData(userId, sessionId, data, callback)

Stores session data.

**Arguments:** 
- userId: string - unique user id
- sessionId: string - unique session id
- data: Object - session data
- callback: (err) => void - callback function
  - err: Error - occured error or null for success

### <a name="operation8"></a> closeSession(userId, address, client, callback)

Closes previously opened user session from specified host and client application

**Arguments:** 
- userId: string - unique user id
- address: string - client address
- client: string - client application name
- callback: (err) => void - callback function
  - err: Error - occured error or null for success

### <a name="operation9"></a> deleteSession(userId, sessionId, callback)

Closes session by specified user and session ids.

**Arguments:** 
- userId: string - unique user id
- sessionId: string - unique session id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_rest"></a> SessionsRestClient class

SessionsRestClient is a client that implements HTTP/REST protocol

```javascript
class SessionsRestClient extends RestClient implements ISessionsClient {
    constructor(config?: any);
    init(refs);
    open(callback);
    close(callback);
    getSessions(userId, callback);
    openSession(user, address, client, data, callback);
    loadSession(userId, sessionId, callback);
    storeSessionData(userId, sessionId, data, callback);
    closeSession(userId, address, client, callback);
    deleteSession(userId, sessionId, callback);
}
```

**Constructor config properties:** 
- transport: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> SessionsSenecaClient class

SessionsSenecaClient is a client that implements Seneca protocol

```javascript
class SessionsSenecaClient extends SenecaClient implements ISessionsClient {
    constructor(config?: any);        
    init(refs);
    open(callback);
    close(callback);
    getSessions(userId, callback);
    openSession(user, address, client, data, callback);
    loadSession(userId, sessionId, callback);
    storeSessionData(userId, sessionId, data, callback);
    closeSession(userId, address, client, callback);
    deleteSession(userId, sessionId, callback);
}
```

**Constructor config properties:** 
- transport: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

