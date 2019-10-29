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
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextNormal from '../global/text/basic/text-normal';
import UiBlockHorizontal from '../ui/block/horizontal';
import TextBold from '../global/text/basic/text-bold';
import UiBlockHorizontalCenter from '../ui/block/horizontal-center';
import UiBlockSpace from '../ui/block/space';
import { MediaRequestService } from '../../services/media-request';
import { lazy } from '../../annotations/inversify';
import { AlbumService } from '../../services/album';
class ProfileViewRequestAccess extends Component {
    constructor(props) {
        super(props);
        this.onPhotoRequestPressed = () => __awaiter(this, void 0, void 0, function* () {
            const photo = this.state.photo;
            if (!photo) {
                throw new Error('no album');
            }
            const photoRequest = this.state.photoRequest;
            if (photoRequest && ['AWAITING', 'APPROVED'].find(it => it === photoRequest.status)) {
                yield this.mediaRequestService.cancel(photoRequest.id);
                return this.syncState();
            }
            yield this.mediaRequestService.newOutboundRequest(photo.profileId, photo);
            return this.syncState();
        });
        this.onVideoRequestPressed = () => __awaiter(this, void 0, void 0, function* () {
            const video = this.state.video;
            if (!video) {
                throw new Error('no album');
            }
            const videoRequest = this.state.videoRequest;
            if (videoRequest && ['AWAITING', 'APPROVED'].find(it => it === videoRequest.status)) {
                return;
            }
            yield this.mediaRequestService.newOutboundRequest(video.profileId, video);
            return this.syncState();
        });
        this.onPhotoInboundRequestPressed = () => __awaiter(this, void 0, void 0, function* () {
            const profileId = this.props.profileId;
            const inboundPhotoRequest = this.state.inboundPhotoRequest;
            if (inboundPhotoRequest && ['AWAITING', 'APPROVED'].find(it => it === inboundPhotoRequest.status)) {
                yield this.mediaRequestService.cancel(inboundPhotoRequest.id);
                return this.syncState();
            }
            const photoRequest = yield this.mediaRequestService.newInboundPhotoRequest(profileId);
            photoRequest.set('status', 'APPROVED');
            yield photoRequest.save();
            return this.syncState();
        });
        this.onVideoInboundRequestPressed = () => __awaiter(this, void 0, void 0, function* () {
            const profileId = this.props.profileId;
            const inboundVideoRequest = this.state.inboundVideoRequest;
            if (inboundVideoRequest && ['AWAITING', 'APPROVED'].find(it => it === inboundVideoRequest.status)) {
                return;
            }
            yield this.mediaRequestService.newInboundVideoRequest(profileId);
            return this.syncState();
        });
        this.syncState = () => __awaiter(this, void 0, void 0, function* () {
            const [photo /*, video */] = yield Promise.all([
                this.albumService.getPhotoForProfile(this.props.profileId)
                // this.albumService.getVideoForProfile(this.props.profileId)
            ]);
            const [photoRequest, /* videoRequest, */ inboundPhotoRequest /* inboundVideoRequest*/] = yield Promise.all([
                this.mediaRequestService.getOutboundActiveRequest(this.props.profileId, photo),
                // this.mediaRequestService.getOutboundActiveRequest(this.props.profileId, video),
                this.mediaRequestService.getInboundPhotoActiveRequest(this.props.profileId)
                // this.mediaRequestService.getInboundVideoActiveRequest(this.props.profileId)
            ]);
            this.setState(prevState => (Object.assign({}, prevState, { 
                // video,
                photo,
                photoRequest,
                // videoRequest,
                inboundPhotoRequest
                // inboundVideoRequest
             })));
        });
        this.syncState();
    }
    render() {
        // const videoRequest = this.state ? this.state.videoRequest : null
        const photoRequest = this.state ? this.state.photoRequest : null;
        const photo = this.state ? this.state.photo : null;
        const inboundPhotoRequest = this.state ? this.state.inboundPhotoRequest : null;
        // const inboundVideoRequest = this.state ? this.state.inboundVideoRequest : null
        return !photo ? null : (React.createElement(Image, { source: require('Musl/images/profile/profile-view/photos-locked-background.png'), style: styles.backgroundImage },
            React.createElement(View, { style: styles.container },
                React.createElement(TextNormal, { style: styles.title }, "These photos are private"),
                React.createElement(UiBlockHorizontal, null,
                    React.createElement(TouchableOpacity, { style: styles.requestBlock, onPress: this.onPhotoRequestPressed },
                        React.createElement(UiBlockHorizontalCenter, null,
                            React.createElement(Image, { source: require('Musl/images/profile/profile-view/icon-photo.png'), style: styles.requestImage })),
                        React.createElement(UiBlockSpace, null),
                        React.createElement(TextBold, { style: styles.requestText }, photoRequest ? (photoRequest.status === 'AWAITING' ? 'You\'ve requested access' :
                            photoRequest.status === 'EXPIRED' ? 'Your request access expired' :
                                photoRequest.status === 'APPROVED' ? 'Your request access was approved' :
                                    'Your request access was declined') : ('Request Photo Access')))),
                React.createElement(View, { style: styles.shareContainer },
                    React.createElement(TouchableOpacity, { style: styles.shareBlock, onPress: this.onPhotoInboundRequestPressed },
                        React.createElement(Image, { source: require('Musl/images/profile/profile-view/icon-photo-lock.png'), style: styles.shareImage }),
                        React.createElement(TextBold, { style: styles.shareText }, inboundPhotoRequest ? (inboundPhotoRequest.status === 'AWAITING' ? 'You\'ve shared access' :
                            inboundPhotoRequest.status === 'EXPIRED' ? 'Your shared access expired' :
                                inboundPhotoRequest.status === 'APPROVED' ? 'Your share access were approved' :
                                    'Your shared access were declined') : ('Share Photo Access'))),
                    React.createElement(View, { style: styles.shareBlockSeparator })))));
    }
}
__decorate([
    lazy('MediaRequestService'),
    __metadata("design:type", MediaRequestService)
], ProfileViewRequestAccess.prototype, "mediaRequestService", void 0);
__decorate([
    lazy('AlbumService'),
    __metadata("design:type", AlbumService)
], ProfileViewRequestAccess.prototype, "albumService", void 0);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    backgroundImage: {
        height: '100%',
        aspectRatio: 1,
        resizeMode: 'cover',
        backgroundColor: 'black'
    },
    requestContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    requestBlock: {
        flex: 1,
        flexDirection: 'column'
    },
    shareContainer: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgb(121, 121, 121)',
        alignItems: 'center'
    },
    shareBlock: {
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    shareBlockSeparator: {
        width: 1,
        height: '65%',
        backgroundColor: 'rgb(121, 121, 121)'
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'transparent'
    },
    requestImage: {
        resizeMode: 'contain',
        width: 40,
        aspectRatio: 1
    },
    requestText: {
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'transparent'
    },
    shareImage: {
        resizeMode: 'contain',
        height: 15,
        aspectRatio: 1
    },
    shareText: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        fontSize: 16,
        textAlign: 'left',
        color: 'rgb(213, 213, 213)',
        backgroundColor: 'transparent'
    }
});
export default ProfileViewRequestAccess;
//# sourceMappingURL=profile-view-request-access.js.map