import { YamlConfigReader } from 'pip-services-commons-node';
import { SessionsClientFixtureV1 } from './SessionsClientFixtureV1';
import { SessionsLambdaClientV1 } from '../../src/version1/SessionsLambdaClientV1';

suite('SessionsLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: SessionsLambdaClientV1;
    let fixture: SessionsClientFixtureV1;

    setup((done) => {
        client = new SessionsLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new SessionsClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Open Session', (done) => {
        fixture.testOpenSession(done);
    });

    test('Close Session', (done) => {
        fixture.testCloseSession(done);
    });
    
});