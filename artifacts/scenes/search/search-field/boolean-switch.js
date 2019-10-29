import React, { Component } from 'react';
import { Switch } from 'react-native';
import LineFullWidth from '../../../components/global/line-full-width';
import UiBlockBasic from '../../../components/ui/block/basic';
import UiBlockRight from '../../../components/ui/block/right';
import UiBlockSpace from '../../../components/ui/block/space';
import TextNormal from '../../../components/global/text/basic/text-normal';
import UiBlockSpaceHorizontal from '../../../components/ui/block/space-horizontal';
import UiBlockVerticalCenter from '../../../components/ui/block/vertical-center';
class FieldValueBooleanSwitchClass extends Component {
    constructor(props) {
        super(props);
        this.onChange = (value) => {
            this.setState(prevState => (Object.assign({}, prevState, { value })));
            this.props.onUpdate(value);
        };
        this.state = {
            value: props.value
        };
    }
    render() {
        const { fieldName } = this.props;
        return (React.createElement(UiBlockBasic, null,
            React.createElement(LineFullWidth, { style: { backgroundColor: '#E3E9EF' } }),
            React.createElement(UiBlockSpace, { height: 3 }),
            React.createElement(UiBlockRight, null,
                React.createElement(UiBlockBasic, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(TextNormal, { style: { fontSize: 13 } }, fieldName))),
                React.createElement(UiBlockSpaceHorizontal, { width: 10 }),
                React.createElement(Switch, { value: this.state.value, onValueChange: this.onChange }))));
    }
}
const FieldValueBooleanSwitch = ({ fieldName, value, onUpdate }) => (React.createElement(FieldValueBooleanSwitchClass, { fieldName: fieldName, value: value, onUpdate: onUpdate }));
export default FieldValueBooleanSwitch;
//# sourceMappingURL=boolean-switch.js.map