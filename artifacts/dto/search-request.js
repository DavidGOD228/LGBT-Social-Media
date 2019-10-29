// import {Restriction} from './restriction'
export class SearchRequest {
    constructor() {
        this.multiCondition = [];
        // TEST
        /*
         const mc = {
         nature: 'AND',
         restrictions: [] as Restriction[]
         } as MultiCondition
         mc.restrictions.push({
         field: 'FRIEND.AboutMe.MyStory.MyStory',
         values: ['lol'],
         operator: 'AND'
         } as Restriction)
    
         this.multiCondition.push(mc)
         */
        this.limit = 120;
        this.page = 0;
        this.range = '20000 miles';
        this.latitude = 0;
        this.longitude = 0;
    }
}
//# sourceMappingURL=search-request.js.map