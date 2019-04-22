"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const SessionsNullClientV1_1 = require("../version1/SessionsNullClientV1");
const SessionsDirectClientV1_1 = require("../version1/SessionsDirectClientV1");
const SessionsHttpClientV1_1 = require("../version1/SessionsHttpClientV1");
class SessionsClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(SessionsClientFactory.NullClientV1Descriptor, SessionsNullClientV1_1.SessionsNullClientV1);
        this.registerAsType(SessionsClientFactory.DirectClientV1Descriptor, SessionsDirectClientV1_1.SessionsDirectClientV1);
        this.registerAsType(SessionsClientFactory.HttpClientV1Descriptor, SessionsHttpClientV1_1.SessionsHttpClientV1);
    }
}
SessionsClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-sessions', 'factory', 'default', 'default', '1.0');
SessionsClientFactory.NullClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-sessions', 'client', 'null', 'default', '1.0');
SessionsClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-sessions', 'client', 'direct', 'default', '1.0');
SessionsClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-sessions', 'client', 'http', 'default', '1.0');
exports.SessionsClientFactory = SessionsClientFactory;
//# sourceMappingURL=SessionsClientFactory.js.map