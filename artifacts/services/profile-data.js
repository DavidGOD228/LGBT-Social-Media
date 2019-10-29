var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DefaultBaseService from './base/impl/default';
import ProfileDataModel from '../models/field-data/profile-data';
import Query from '../lib/smart-criteria/query';
import { injectable } from 'inversify';
import Restrictions from '../lib/smart-criteria/restrictions';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
import { LocalSettingsService } from './local-settings';
import { lazy } from '../annotations/inversify';
const FEET_IN_METER = 0.3048;
const FEET_IN_MILE = 5280;
const METERS_IN_KM = 1000;
let ProfileDataService = class ProfileDataService extends DefaultBaseService {
    constructor() {
        super(...arguments);
        this.getDistanceToDisplay = (distance) => __awaiter(this, void 0, void 0, function* () {
            const metrics = yield this.localSettingsService.getUserMetrics();
            return this.getDistanceToDisplaySync(distance, metrics);
        });
        this.getDistanceToDisplaySync = (distance, metrics) => {
            if (distance >= 0) {
                if (metrics === 'Metric') {
                    return this.getDistanceMetric(distance);
                }
                return this.getDistanceImperial(distance);
            }
            return null;
        };
        this.getDistanceMetric = (distance) => {
            const meters = distance;
            if (meters < 100) {
                return '<100 meters';
            }
            if (meters < METERS_IN_KM) {
                return Math.round(meters) + ' meters';
            }
            return Math.round(meters / METERS_IN_KM) + ' km';
        };
        this.getDistanceImperial = (distance) => {
            const feet = distance / FEET_IN_METER;
            if (feet < 250) {
                return '<250 feet';
            }
            if (feet < FEET_IN_MILE) {
                return Math.round(feet) + ' feet';
            }
            if (feet < (FEET_IN_MILE * 10)) {
                return this.round((feet / FEET_IN_MILE), 1) + ' miles';
            }
            return Math.round(feet / FEET_IN_MILE) + 'mi';
        };
        this.round = (val, precision) => {
            const factor = Math.pow(10, precision);
            const tempNumber = val * factor;
            const roundedTempNumber = Math.round(tempNumber);
            return roundedTempNumber / factor;
        };
    }
    getAllByProfile(profile) {
        return this.getAllByProfileId(profile.id);
    }
    getAllByProfileId(profileId) {
        const query = new Query();
        query.add(Restrictions.equal('profileId', profileId));
        return this.getRepo()
            .find(query);
    }
    /**
     * Sync profile data with sections map.
     * Returns only new saved data records
     * @param {ProfileModel} profile
     * @param {SectionModel[]} sectionList
     * @returns {Promise<ProfileDataModel>}
     */
    prepareProfile(profile, sectionList) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileDataList = yield this.getAllByProfile(profile);
            const profileDataListPromise = sectionList.reduce((acc, it) => acc.concat(it.subSections.map(ss => ss.fields)), [])
                .filter((f) => !profileDataList.find(pd => pd.field === f))
                .map((it) => this.createNew(it, profile))
                .map((it) => it.save());
            return Promise.all(profileDataListPromise);
        });
    }
    preloadForProfile(profile) {
        return this.getAllByProfile(profile);
    }
    getForField(field, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getRepo()
                .peekRecord(`field.id = ${field.id} AND profileId = ${profile.id}`))
                || this.createNew(field, profile);
        });
    }
    createNew(field, profile) {
        return this.getRepo()
            .createRecord()
            .set('field', field)
            .set('profileId', profile.id)
            .set('fieldValues', []);
    }
};
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], ProfileDataService.prototype, "localSettingsService", void 0);
ProfileDataService = __decorate([
    injectable(),
    listener('ProfileData'),
    mixin([LogoutClearable])
], ProfileDataService);
export { ProfileDataService };
const profileDataService = new ProfileDataService(ProfileDataModel);
export default profileDataService;
//# sourceMappingURL=profile-data.js.map