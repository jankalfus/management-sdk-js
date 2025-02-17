import { SharedContracts, SpaceContracts } from '../../contracts';
import { SharedModels } from '../shared/shared-models';

export namespace SpaceModels {
    export type ModifySpaceOperation = 'replace';

    export interface IModifySpaceData {
        op: ModifySpaceOperation;
        property_name: string;
        value: string;
    }

    export interface IAddSpaceData {
        name: string;
        codename?: string;
        web_spotlight_root_item?: SharedContracts.IReferenceObjectContract;
    }

    export class Space implements SharedModels.IBaseModel<SpaceContracts.ISpaceContract> {
        public id!: string;
        public name!: string;
        public codename!: string;
        public webSpotlightRootItem?: SharedModels.ReferenceObject;
        public _raw!: SpaceContracts.ISpaceContract;

        constructor(data: {
            id: string;
            name: string;
            codename: string;
            webSpotlightRootItem?: SharedModels.ReferenceObject;
            _raw: SpaceContracts.ISpaceContract;
        }) {
            Object.assign(this, data);
        }
    }
}
