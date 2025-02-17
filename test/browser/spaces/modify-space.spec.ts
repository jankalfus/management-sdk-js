import { SpaceResponses } from '../../../lib';
import * as responseJson from '../fake-responses/spaces/fake-modify-space.json';
import { cmLiveClient, getTestClientWithJson, testEnvironmentId } from '../setup';

describe('Modify space', () => {
    let response: SpaceResponses.ModifySpaceResponse;

    beforeAll(async () => {
        response = await getTestClientWithJson(responseJson)
            .modifySpace()
            .bySpaceCodename('space_1')
            .withData([
                {
                    op: 'replace',
                    property_name: 'name',
                    value: 'new_name'
                }
            ])
            .toPromise();
    });

    it(`url should be correct`, () => {
        const urlByCodename = cmLiveClient.modifySpace().bySpaceCodename('x').withData([]).getUrl();
        const urlByInternalId = cmLiveClient.modifySpace().bySpaceId('y').withData([]).getUrl();
        expect(urlByCodename).toEqual(`https://manage.kontent.ai/v2/projects/${testEnvironmentId}/spaces/codename/x`);
        expect(urlByInternalId).toEqual(`https://manage.kontent.ai/v2/projects/${testEnvironmentId}/spaces/y`);
    });

    it(`response should be instance of ModifySpaceResponse class`, () => {
        expect(response).toEqual(jasmine.any(SpaceResponses.ModifySpaceResponse));
    });

    it(`response should contain debug data`, () => {
        expect(response.debug).toBeDefined();
    });

    it(`response should contain data`, () => {
        expect(response.data).toBeDefined();
    });

    it(`space properties should be mapped`, () => {
        const originalItem = responseJson;
        const space = response.data;

        expect(space.codename).toEqual(originalItem.codename);
        expect(space.name).toEqual(originalItem.name);
    });
});
