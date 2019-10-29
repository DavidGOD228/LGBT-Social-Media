import SchemaRegistry from './base/-registry';
import AccountModel from './account';
import AccountInfoModel from './account-info';
import ProfileModel from './profile';
import ProfileTypeModel from './profile-type';
import ProfileDataModel from './field-data/profile-data';
import SectionModel from './section';
import FieldModel from './field';
import FieldValueModel from './field-value';
import SearchDataModel from './field-data/search-data';
import MediaModel from './media';
import LocalSettingsModel from './local-settings';
import ChatModel from './chat';
import ChatMemberModel from './chat-member';
import MessageModel from './message';
import MessageContentModel from './message-content';
import SubSectionModel from './sub-section';
import AlbumModel from './album';
import AlbumMediaModel from './album-media';
import RabbitCredentialModel from './rabbit-credential';
import BlockModel from './block';
import FavoriteModel from './favorite';
import FlexModel from './flex';
import NoteModel from './note';
import ProfileVisitModel from './profile-visit';
import NotificationModel from './notification';
import NotificationContentModel from './notification-content';
import SearchSectionModel from './search/search-section';
import SearchSubSectionModel from './search/search-sub-section';
import SearchFieldModel from './search/search-field';
import ProfileViewSectionModel from './profile-view/profile-view-section';
import ProfileViewSubSectionModel from './profile-view/profile-view-sub-section';
import ProfileViewFieldModel from './profile-view/profile-view-field';
import MediaRequestModel from './media-request';
import MediaShareModel from './media-share';
import LinkedProfileModel from './linked-profile';
const schemaRegistry = new SchemaRegistry();
schemaRegistry.add(AccountModel)
    .add(AccountInfoModel)
    .add(ProfileModel)
    .add(ProfileTypeModel)
    .add(ProfileDataModel)
    .add(SectionModel)
    .add(SubSectionModel)
    .add(SearchSectionModel)
    .add(SearchSubSectionModel)
    .add(SearchFieldModel)
    .add(FieldModel)
    .add(FieldValueModel)
    .add(SearchDataModel)
    .add(MediaModel)
    .add(AlbumMediaModel)
    .add(LocalSettingsModel)
    .add(ChatModel)
    .add(ChatMemberModel)
    .add(MessageModel)
    .add(MessageContentModel)
    .add(AlbumModel)
    .add(RabbitCredentialModel)
    .add(BlockModel)
    .add(FavoriteModel)
    .add(FlexModel)
    .add(NoteModel)
    .add(ProfileVisitModel)
    .add(NotificationModel)
    .add(NotificationContentModel)
    .add(ProfileViewSectionModel)
    .add(ProfileViewSubSectionModel)
    .add(ProfileViewFieldModel)
    .add(MediaRequestModel)
    .add(MediaShareModel)
    .add(LinkedProfileModel);
export default schemaRegistry;
//# sourceMappingURL=index.js.map