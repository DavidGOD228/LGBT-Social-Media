import serviceRegistry from './base/-registry'
import accountService from './account'
import accountInfoService from './account-info'
import fieldService from './field'
import profileDataService from './profile-data'
import profileTypeService from './profile-type'
import profileService from './profile'
import sectionService from './section'
import mediaService from './media'
import albumMediaService from './album-media'
import searchDataService from './search-data'
import fieldValueService from './field-value'
import localSettingsService from './local-settings'
import {myContainer} from '../utils/inversify.conf'
import chatService from './chat'
import chatMemberService from './chat-member'
import messageService from './message'
import messageContentService from './message-content'
import subSectionService from './sub-section'
import albumService from './album'
import rabbitCredentialService from './rabbit-credential'
import blockService from './block'
import favoriteService from './favorite'
import flexService from './flex'
import noteService from './note'
import profileVisitService from './profile-visit'
import notificationService from './notification'
import searchSectionService from './search-section'
import notificationContentService from './notification-content'
import searchSubSectionService from './search-sub-section'
import searchFieldService from './search-field'
import profileViewSectionService from './profile-view-section'
import profileViewSubSectionService from './profile-view-sub-section'
import profileViewFieldService from './profile-view-field'
import mediaRequestService from './media-request'
import mediaShareService from './media-share'
import linkedProfileService from './linked-profile'

serviceRegistry.add(accountService)
               .add(accountInfoService)
               .add(profileService)
               .add(profileTypeService)
               .add(profileDataService)
               .add(sectionService)
               .add(subSectionService)
               .add(fieldService)
               .add(fieldValueService)
               .add(searchDataService)
               .add(mediaService)
               .add(albumMediaService)
               .add(localSettingsService)
               .add(chatService)
               .add(chatMemberService)
               .add(messageService)
               .add(messageContentService)
               .add(albumService)
               .add(rabbitCredentialService)
               .add(blockService)
               .add(favoriteService)
               .add(flexService)
               .add(noteService)
               .add(profileVisitService)
               .add(notificationService)
               .add(searchSectionService)
               .add(searchSubSectionService)
               .add(searchFieldService)
               .add(notificationContentService)
               .add(profileViewSectionService)
               .add(profileViewSubSectionService)
               .add(profileViewFieldService)
               .add(mediaRequestService)
               .add(mediaShareService)
               .add(linkedProfileService)

serviceRegistry.values()
               .forEach(it => myContainer.bind(`${it.modelName}Service`)
                                         .toConstantValue(it))

serviceRegistry.ready()

export default serviceRegistry
