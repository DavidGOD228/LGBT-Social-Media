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
import { LocalSettingsService } from '../services/local-settings';
import { lazy } from '../annotations/inversify';
class SafeForWork {
    isFakeLocationEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const isTurnedOn = yield this.localSettingsService.getSafeForWorkTurnedOn();
            if (!isTurnedOn) {
                return false;
            }
            const timeStartJSON = yield this.localSettingsService.getSafeForWorkTimeStart();
            const timeEndJSON = yield this.localSettingsService.getSafeForWorkTimeEnd();
            if (!timeStartJSON || !timeEndJSON) {
                return false;
            }
            const currentTime = new Date();
            const timeStart = JSON.parse(timeStartJSON);
            const timeEnd = JSON.parse(timeEndJSON);
            const startTimeMinutes = timeStart.hours * 60 + timeStart.minutes;
            const endTimeMinutes = timeEnd.hours * 60 + timeEnd.minutes;
            const currentTimeMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
            if (startTimeMinutes < endTimeMinutes) {
                return currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes;
            }
            if (startTimeMinutes > endTimeMinutes) {
                // TODO: test
                const inLeftInterval = currentTimeMinutes > startTimeMinutes && currentTimeMinutes <= 24 * 60;
                const inRightInterval = currentTimeMinutes >= 24 * 60 && currentTimeMinutes < endTimeMinutes + 24 * 60;
                return inLeftInterval || inRightInterval;
            }
            return false;
        });
    }
}
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], SafeForWork.prototype, "localSettingsService", void 0);
const safeForWork = new SafeForWork();
export default safeForWork;
//# sourceMappingURL=safe-for-work.js.map