import {ImageURISource} from 'react-native'

export interface ProfileTypeDict {
  name: string
  photo: ImageURISource
}

export interface ProfileTypeModalDict {
  name: string
  description: string
  photo: ImageURISource
}

export interface ProfileGeneralInfoDict {
  name: string
  distance: string
  roleIcon: ImageURISource
  safetyIcon: ImageURISource
}

export interface ProfileFieldValueDict {
  value: string
}

export interface ProfileFieldDict {
  name: string,
  type: string,
  fieldValues: ProfileFieldValueDict[]
}

export interface ProfileSubSectionDict {
  name: string,
  fields: ProfileFieldDict[]
}

export interface ProfileSectionDict {
  name: string,
  subSections: ProfileSubSectionDict[]
}

export interface ProfileInteractionButton {
  name: string,
  image: ImageURISource,
  imageSelected: ImageURISource,
  isSelected: boolean
}

export const PROFILE_TYPES: ProfileTypeDict[] = [
  {
    name: 'FRIEND',
    photo: require('Musl/images/global/icon-friend.png')
  },
  {
    name: 'FLIRT',
    photo: require('Musl/images/global/icon-flirt.png')
  },
  {
    name: 'FUN',
    photo: require('Musl/images/global/icon-fun.png')
  }
]

export const PROFILE_TYPES_MODAL: ProfileTypeModalDict[] = [
  {
    name: 'Friend',
    description: '–Find people to hang out with similar interests',
    photo: require('Musl/images/global/icon-friend-active.png')
  },
  {
    name: 'Flirt',
    description: '–Looking for a coffee date or marriage? This is where you go',
    photo: require('Musl/images/global/icon-flirt-active.png')
  },
  {
    name: 'Fun',
    description: '–Here is where you find Hookups and FWBs',
    photo: require('Musl/images/global/icon-fun-active.png')
  }
]

export const PROFILE_SEX_ROLE = {
  'Top': require('Musl/images/profile/role/icon-top.png'),
  'Top/Versatile': require('Musl/images/profile/role/icon-top-versatile.png'),
  'Versatile': require('Musl/images/profile/role/icon-versatile.png'),
  'Bottom/Versatile': require('Musl/images/profile/role/icon-bottom-versatile.png'),
  'Bottom': require('Musl/images/profile/role/icon-bottom.png'),
  'Oral/JO Only': require('Musl/images/profile/role/icon-oral.png'),
  'Oral/JO': require('Musl/images/profile/role/icon-oral.png'),
  'Side': require('Musl/images/profile/role/icon-side.png'),
  'Sides': require('Musl/images/profile/role/icon-side.png')
}

export const PROFILE_VIEW_PHOTOS: ProfileTypeDict[] = [
  {
    name: 'photo',
    photo: require('Musl/images/profile/profile-view/profile-view-bg.png')
  },
  {
    name: 'request',
    photo: require('Musl/images/profile/profile-view/profile-view-bg.png')
  }
]

export const PROFILE_VIEW_GENERAL_INFO: ProfileGeneralInfoDict = {
  name: 'Shalimar415',
  distance: '.25 mi',
  roleIcon: require('Musl/images/profile/role/icon-top.png'),
  safetyIcon: require('Musl/images/profile/role/icon-oral.png')
}

export const EVENTS = {
  newAccount: 'newAccount',
  login: 'login',
  logout: 'logout',
  resendConfirmation: 'resendConfirmation',
  newProfile: 'newProfile',
  rabbitConnectionEstablished: 'rabbitConnectionEstablished',
  activeProfilesChanged: 'activeProfilesChanged',

  // pure GUI sync event. needed only for correct timing of navigation header color change
  activeProfileSelected: 'activeProfileSelected',
  editProfileScreenClosed: 'editProfileScreenClosed',

  // time tracking local event
  shouldStartTracking: 'shouldStartTracking',

  // Rabbit events
  rabbitNewNotification: 'rabbitConnectionNewNotification'
}

export const ADMOB_UNIT_IDS = {
  banner_community_screen_320x50: {
    android: 'ca-app-pub-5270300255241526/4573668096',
    ios: 'ca-app-pub-5270300255241526/6329602893',
    sample: 'ca-app-pub-3940256099942544/6300978111'
  }
}

export const FUN_PROFILE_SECTIONS: ProfileSectionDict[] = [
  {
    name: "About Him",
    subSections: [
      {
        name: "MyStory",
        fields: [
          {
            name: "MyStory",
            type: "TEXT_LIMITED",
            fieldValues: [
              {
                value: "Shalimar415 is Middle Eastern, 28 years old, 6’1” tall, and 180lbs."
              }
            ]
          }
        ]
      },
      {
        name: "IAm",
        fields: [
          {
            name: "He is",
            type: "CHECK_BOX",
            fieldValues: [
              {
                value: "Guy Next Door"
              },
              {
                value: "All-American"
              },
              {
                value: "Suit & Tie"
              },
              {
                value: "Bear"
              },
              {
                value: "Muscle"
              },
              {
                value: "Geek/Nerd"
              }
            ]
          }
        ]
      },
      {
        name: "RelationshipStatus",
        fields: [
          {
            name: "Relationship Status",
            type: "RADIO_BUTTON",
            fieldValues: [
              {
                value: "Partnered"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "He's Looking For",
    subSections: [
      {
        name: "MyType",
        fields: [
          {
            name: "MyType",
            type: "CHECK_BOX",
            fieldValues: [
              {
                value: "Guy Next Door"
              },
              {
                value: "All-American"
              },
              {
                value: "Cub"
              },
              {
                value: "Drag"
              },
              {
                value: "Chub"
              },
              {
                value: "Twink"
              }
            ]
          }
        ]
      },
      {
        name: "When/Where",
        fields: [
          {
            name: "When",
            type: "RADIO_BUTTON_CUSTOM",
            fieldValues: [
              {
                value: "Within 2 hours"
              }
            ]
          },
          {
            name: "Where",
            type: "RADIO_BUTTON_CUSTOM",
            fieldValues: [
              {
                value: "Your Place"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Sex Details",
    subSections: [
      {
        name: "Role",
        fields: [
          {
            name: "Role",
            type: "RADIO_BUTTON_CUSTOM",
            fieldValues: [
              {
                value: "Top"
              }
            ]
          }
        ]
      },
      {
        name: "SafetyPractice",
        fields: [
          {
            name: "SafetyPractice",
            type: "CHECK_BOX_CUSTOM",
            fieldValues: [
              {
                value: "Condoms"
              }
            ]
          }
        ]
      },
      {
        name: "Hankies",
        fields: [
          {
            name: "Hankies",
            type: "CHECK_BOX_CUSTOM",
            fieldValues: [
              {
                value: "S&M"
              },
              {
                value: "Fisting"
              }
            ]
          }
        ]
      }
    ]
  }
]

export const PROFILE_INTERACTIONS: ProfileInteractionButton[] = [
  {
    name: 'Share',
    image: require('Musl/images/profile/profile-view/tools/icon-share.png'),
    imageSelected: require('Musl/images/profile/profile-view/tools/icon-share.png'),
    isSelected: false
  },
  {
    name: 'Block',
    image: require('Musl/images/profile/profile-view/tools/icon-block.png'),
    imageSelected: require('Musl/images/profile/profile-view/tools/icon-block-active.png'),
    isSelected: false
  },
  {
    name: 'Note',
    image: require('Musl/images/profile/profile-view/tools/icon-note.png'),
    imageSelected: require('Musl/images/profile/profile-view/tools/icon-note-active.png'),
    isSelected: false
  },
  {
    name: 'Favorite',
    image: require('Musl/images/profile/profile-view/tools/icon-favorite.png'),
    imageSelected: require('Musl/images/profile/profile-view/tools/icon-favorite-active.png'),
    isSelected: false
  },
  {
    name: 'Flex',
    image: require('Musl/images/profile/profile-view/tools/icon-flex.png'),
    imageSelected: require('Musl/images/profile/profile-view/tools/icon-flex-active.png'),
    isSelected: false
  },
  {
    name: 'Message',
    image: require('Musl/images/profile/profile-view/tools/icon-message.png'),
    imageSelected: require('Musl/images/profile/profile-view/tools/icon-message-active.png'),
    isSelected: false
  }
]
