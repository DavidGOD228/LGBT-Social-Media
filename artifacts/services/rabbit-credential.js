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
import { injectable } from 'inversify';
import { listener, onEvent, postEmit } from '../annotations/event';
import RabbitCredentialModel from '../models/rabbit-credential';
import { Stomp } from '@stomp/stompjs/lib/stomp.js';
import { EVENTS } from '../configs/dicts';
import { lazy } from '../annotations/inversify';
import { LocalSettingsService } from './local-settings';
import { ProfileService } from './profile';
import SockJS from 'sockjs-client/lib/entry.js';
let RabbitCredentialService = RabbitCredentialService_1 = class RabbitCredentialService extends DefaultBaseService {
    static buildConnectionHeaders(credentials) {
        return {
            login: credentials.username,
            passcode: credentials.password,
            host: credentials.virtualHost
        };
    }
    static buildUrl(credentials) {
        return `${credentials.protocol}://${credentials.host}:${credentials.port}/stomp`;
    }
    onReady(fn) {
        console.log('ONREADY');
        if (!this.onReadyQueue) {
            this.onReadyQueue = [];
        }
        this.onReadyQueue.push(fn);
    }
    preload() {
        return this.prepareConnection();
    }
    subscribe(destination, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client) {
                throw new Error('not ready');
            }
            const path = yield this.getSubscriptionPath();
            return this.client.subscribe(`/exchange/${this.credentials.exchange}/${path}.${destination}`, callback);
        });
    }
    flushOnReadyQueue() {
        if (!this.onReadyQueue) {
            this.onReadyQueue = [];
        }
        this.onReadyQueue.forEach(it => it(this));
        this.onReadyQueue = [];
    }
    prepareConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.credentials = yield this.getCredentials();
                if (!this.credentials) {
                    return;
                }
                const url = RabbitCredentialService_1.buildUrl(this.credentials);
                const ws = new SockJS(url);
                const client = Stomp.over(ws);
                const connectionHeaders = RabbitCredentialService_1.buildConnectionHeaders(this.credentials);
                client.heartbeat.incoming = 0;
                client.reconnect_delay = 0;
                client.connect(connectionHeaders, () => this.saveClient(client), () => this.prepareConnection());
                // console.log(client, ws, 'CONNECT')
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    saveClient(client) {
        this.client = client;
    }
    getSubscriptionPath() {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.localSettingsService.getSession();
            const activeProfileId = yield this.profileService.getActiveProfileId();
            return `${session}.${activeProfileId}`;
        });
    }
    getCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = yield this.getRepo()
                .findByPrimary('');
            if (!credentials) {
                throw new Error('no credentials');
            }
            return credentials;
        });
    }
};
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], RabbitCredentialService.prototype, "localSettingsService", void 0);
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], RabbitCredentialService.prototype, "profileService", void 0);
__decorate([
    onEvent(EVENTS.rabbitConnectionEstablished),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RabbitCredentialService.prototype, "flushOnReadyQueue", null);
__decorate([
    postEmit(EVENTS.rabbitConnectionEstablished),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RabbitCredentialService.prototype, "saveClient", null);
RabbitCredentialService = RabbitCredentialService_1 = __decorate([
    injectable(),
    listener('RabbitCredential')
], RabbitCredentialService);
export { RabbitCredentialService };
const rabbitCredentialService = new RabbitCredentialService(RabbitCredentialModel);
export default rabbitCredentialService;
var RabbitCredentialService_1;
//# sourceMappingURL=rabbit-credential.js.map