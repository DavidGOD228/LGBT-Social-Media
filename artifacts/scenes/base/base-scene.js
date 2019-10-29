import { Component } from 'react';
export default class BaseScreenDefault extends Component {
    setSpecState(stateName, value) {
        if (this.state[stateName] !== value) {
            this.setState(prevState => (Object.assign({}, prevState, { [stateName]: value })));
        }
        return this;
    }
}
//# sourceMappingURL=base-scene.js.map