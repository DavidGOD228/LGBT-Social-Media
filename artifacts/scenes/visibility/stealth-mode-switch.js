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
import UiBlockBasic from '../../components/ui/block/basic';
import SettingsRadioButton from '../../components/settings/radio-button';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextBold from '../../components/global/text/basic/text-bold';
import { lazy } from '../../annotations/inversify';
import { ProfileService } from '../../services/profile';
import UiBlockSpace from '../../components/ui/block/space';
import ModalWindowText from '../../components/modal/modal-window-text';
import ModalWindowTitle from '../../components/modal/modal-window-title';
import ModalWindowContent from '../../components/modal/modal-window-content';
import ModalWindow from '../../components/modal/modal-window';
import ModalCloseBtn from '../../components/modal/modal-close-btn';
export default class StealthModeSwitch extends Component {
    constructor(props) {
        super(props);
        this.toggleStealthMode = (value) => __awaiter(this, void 0, void 0, function* () {
            this.profileService.updateStealthModeStatus(value);
            this.setState(Object.assign({}, this.state, { stealthMode: value }));
        });
        this.toggleInfoModal = () => {
            this.setState(Object.assign({}, this.state, { showInfoModal: !this.state.showInfoModal }));
        };
        this.state = {
            // NOW IT ISNT NECESSARY TO CHECK ALL PROFILES FOR INVISIBILITY
            // AS IN CURRENT VERSION ALL PROFILES HAVE SAME STEALTH STATUS
            stealthMode: this.profileService.getActive().invisible,
            showInfoModal: false
        };
    }
    render() {
        return React.createElement(UiBlockBasic, { style: {
                paddingLeft: 5,
                paddingRight: 5
            } },
            React.createElement(SettingsRadioButton, { value: this.state.stealthMode, onChange: this.toggleStealthMode },
                React.createElement(View, null,
                    React.createElement(TextBold, null, "Stealth Mode"),
                    React.createElement(TouchableOpacity, { style: styles.infoIcon, onPress: this.toggleInfoModal },
                        React.createElement(Image, { source: require('Musl/images/global/icon-btn-info.png') })))),
            React.createElement(ModalWindow, { visible: this.state.showInfoModal },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(ModalCloseBtn, { onPress: this.toggleInfoModal }),
                React.createElement(UiBlockSpace, { height: 80 }),
                React.createElement(ModalWindowContent, null,
                    React.createElement(ModalWindowTitle, null, "STEALTH MODE"),
                    React.createElement(UiBlockSpace, null),
                    React.createElement(ModalWindowText, null, 'In stealth mode, you will appear to be "offline but may see nearby users yourself".'),
                    React.createElement(UiBlockSpace, { height: 30 }))));
    }
}
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], StealthModeSwitch.prototype, "profileService", void 0);
const styles = StyleSheet.create({
    infoIcon: {
        position: 'absolute',
        top: -7,
        right: -30
    }
});
//# sourceMappingURL=stealth-mode-switch.js.map