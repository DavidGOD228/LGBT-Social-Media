import 'reflect-metadata';
import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
const myContainer = new Container();
const { lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject } = getDecorators(myContainer);
export { myContainer, lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject };
//# sourceMappingURL=inversify.conf.js.map