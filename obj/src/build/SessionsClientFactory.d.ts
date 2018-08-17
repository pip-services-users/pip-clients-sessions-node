import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-components-node';
export declare class SessionsClientFactory extends Factory {
    static Descriptor: Descriptor;
    static NullClientV1Descriptor: Descriptor;
    static DirectClientV1Descriptor: Descriptor;
    static HttpClientV1Descriptor: Descriptor;
    static SenecaClientV1Descriptor: Descriptor;
    constructor();
}
