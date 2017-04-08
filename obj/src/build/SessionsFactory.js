"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const SessionsNullClientV1_1 = require("../version1/SessionsNullClientV1");
const SessionsDirectClientV1_1 = require("../version1/SessionsDirectClientV1");
const SessionsHttpClientV1_1 = require("../version1/SessionsHttpClientV1");
const SessionsSenecaClientV1_1 = require("../version1/SessionsSenecaClientV1");
class SessionsFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(SessionsFactory.NullClientV1Descriptor, SessionsNullClientV1_1.SessionsNullClientV1);
        this.registerAsType(SessionsFactory.DirectClientV1Descriptor, SessionsDirectClientV1_1.SessionsDirectClientV1);
        this.registerAsType(SessionsFactory.HttpClientV1Descriptor, SessionsHttpClientV1_1.SessionsHttpClientV1);
        this.registerAsType(SessionsFactory.SenecaClientV1Descriptor, SessionsSenecaClientV1_1.SessionsSenecaClientV1);
    }
}
SessionsFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-sessions', 'factory', 'default', 'default', '1.0');
SessionsFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-sessions', 'client', 'null', 'default', '1.0');
SessionsFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-sessions', 'client', 'direct', 'default', '1.0');
SessionsFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-sessions', 'client', 'http', 'default', '1.0');
SessionsFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-sessions', 'client', 'seneca', 'default', '1.0');
exports.SessionsFactory = SessionsFactory;
//# sourceMappingURL=SessionsFactory.js.map