import React from 'react';
import UiBlockBasic from '../ui/block/basic';
import TextNormal from '../global/text/basic/text-normal';
const StatsValueDescription = (props) => (React.createElement(UiBlockBasic, { style: { flex: 1, justifyContent: 'center' } },
    React.createElement(TextNormal, null, props.children)));
export default StatsValueDescription;
//# sourceMappingURL=value-description.js.map