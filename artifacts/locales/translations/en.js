export default {
    // registration scene
    registration: {
        greeting: 'Welcome.\nLet\'s get started.',
        modal: {
            email: 'YOUR EMAIL',
            emailMessage: 'We use your email to confirm your identity and for communication with you regarding the service.' +
                '\n\nWe will NEVER share your email with other services or partners.',
            password: 'YOUR PASSWORD',
            passwordMessage: 'Passwords in MUSL require that you use a combination of upper and lowercase ' +
                'letters and at least one number'
        },
        error: {
            form: 'So sorry. You must enter the information above. It\'s required.',
            emailText: 'Your email is in an unknown format. Please check and reenter. Thanks.',
            passwordText: 'Please make sure your password contains both Numerals and a Capital letter.',
            passwordMismatch: 'Password mismatch'
        },
        passwordRequirements: 'Your password must be 8 characters and contain at least one capital letter and one number'
    },
    // login scene
    login: {
        error: {
            form: 'So sorry. You must enter the information above. It\'s required.',
            emailText: 'Your email is in an unknown format. Please check and reenter. Thanks.',
            passwordText: 'Please make sure your password contains both Numerals and a Capital letter.'
        },
        resetPassword: {
            caption: 'Forgot your username or password?',
            modal: {
                title: 'Reset password',
                desc: 'Please provide your email address',
                successDesc: 'We sent you an email with instructions for resetting your password',
                button: 'Reset',
                closeButton: 'Close'
            }
        }
    },
    // registration confirmation scene
    registrationConfirmation: {
        title: 'Let\'s confirm your information',
        message: `We’ve sent a confirmation email to “%{email}”
with a link to confirm your address.

Please check your email and click on the link there.
If you don’t find it, please check your spam/junk folder.`,
        resend: 'Resend'
    },
    // Under Construction Scene
    underConstruction: {
        title: 'Under construction'
    },
    // Profile Blocked Scene
    profileBlocked: {
        title: 'Profile is blocked'
    },
    profile: {
        setup: {
            setupFriendProfile: 'Set up your\nFriend Profile',
            setupFlirtProfile: 'Set up your\nFlirt Profile',
            setupFunProfile: 'Set up your\nFun Profile',
            nameInputPlaceholder: 'Profile Name',
            profilePicture: 'Profile Picture',
            addPhoto: 'Add a Photo',
            pictureNotification: 'Profile pictures may not contain any ' +
                'nudity. Our rule of thumb; No wangs or wahoos.' +
                'However your private photos can be whatever you like.',
            selectImageDialogTitle: 'Select source',
            selectImageDialogMessage: 'Select source to pick image',
            selectImageGallery: 'Gallery',
            selectImageCamera: 'Camera',
            deletePhotoRequest: 'Are you sure you want to delete this photo?',
            error: {
                pictureError: 'This photo violates our Ts & Cs. Please choose another.',
                nameError: 'This field is required'
            }
        },
        details: {
            screenTitle: 'Add some details',
            sections: {
                Media: {
                    name: 'Private Photos',
                    description: 'Your photos are private. You can select to whom you like to see them privately.'
                },
                AboutMe: {
                    name: 'About Me',
                    subSections: {
                        MyStory: {
                            name: 'My Story',
                            fields: {
                                MyStory: {
                                    name: 'My Story',
                                    placeholder: 'Tell everyone who you are and what you’re into. Use #hashtags as necessary.'
                                }
                            }
                        },
                        IAm: {
                            name: 'I am:',
                            fields: {
                                IAm: {
                                    name: 'I am:'
                                }
                            }
                        },
                        IEnjoy: {
                            name: 'I enjoy:',
                            fields: {
                                IEnjoy: {
                                    name: 'I enjoy:'
                                }
                            }
                        },
                        IHangOutAt: {
                            name: 'I hang out at:',
                            fields: {
                                IHangOutAt: {
                                    name: 'I hang out at:'
                                }
                            }
                        },
                        FunFact: {
                            name: 'Fun Fact',
                            fields: {
                                FunFact: {
                                    name: 'Fun Fact',
                                    placeholder: 'What’s one fun fact everyone should know about you. Use #hashtags as necessary.'
                                }
                            }
                        },
                        Details: {
                            name: 'Details',
                            fields: {
                                Birthday: {
                                    name: 'Birthday'
                                },
                                Weight: {
                                    name: 'Weight',
                                    metrics: 'lbs',
                                    error: {
                                        Metric: 'Sorry your weight must be between 23 and 340 kg',
                                        Imperial: 'Sorry your weight must be between 50 and 750 pounds'
                                    }
                                },
                                Height: {
                                    name: 'Height',
                                    metrics: 'ft',
                                    error: {
                                        Metric: 'Sorry your height must be between 91 and 243 cm',
                                        Imperial: 'Sorry your height must be between 3 and 8 feet'
                                    }
                                }
                            }
                        },
                        Ethnicity: {
                            name: 'Ethnicity',
                            fields: {
                                Ethnicity: {
                                    name: 'Ethnicity'
                                }
                            }
                        },
                        RelationshipStatus: {
                            name: 'Relationship Status',
                            fields: {
                                RelationshipStatus: {
                                    name: 'Relationship Status'
                                }
                            }
                        },
                        Work: {
                            name: 'Work',
                            fields: {
                                Work: {
                                    name: 'Work'
                                }
                            }
                        }
                    }
                },
                Sex: {
                    name: 'Sex',
                    subSections: {
                        SafetyPractice: {
                            name: 'Safety Practice',
                            fields: {
                                SafetyPractice: {
                                    name: 'Safety Practice'
                                },
                                MakeMySafetyPracticePublic: {
                                    name: 'Make My Safety Practice Public'
                                }
                            }
                        },
                        Role: {
                            name: 'Role',
                            fields: {
                                Role: {
                                    name: 'Role'
                                },
                                MakeMyRolePublic: {
                                    name: 'Make My Role Public'
                                }
                            }
                        },
                        Hankies: {
                            name: 'Hankies',
                            fields: {
                                Hankies: {
                                    name: 'Hankies'
                                }
                            }
                        }
                    }
                },
                LookingFor: {
                    name: 'Looking For',
                    subSections: {
                        Friends: {
                            name: 'Friends',
                            fields: {
                                Friends: {
                                    name: 'Friends'
                                }
                            }
                        },
                        Seeking: {
                            name: 'Seeking',
                            nameFLIRT: 'Seeking:',
                            fields: {
                                Seeking: {
                                    name: 'Seeking:',
                                    placeholder: 'What are you hoping to do. Use #hashtags as necessary.',
                                    placeholderFLIRT: 'Who\'s your ideal date? Use #hashtags as necessary.'
                                }
                            }
                        },
                        MyType: {
                            name: 'My Type',
                            fields: {
                                MyType: {
                                    name: 'My Type'
                                }
                            }
                        },
                        Ethnicity: {
                            name: 'Ethnicity',
                            fields: {
                                Ethnicity: {
                                    name: 'Ethnicity'
                                }
                            }
                        },
                        HopingFor: {
                            name: 'Hoping for',
                            fields: {
                                HopingFor: {
                                    name: 'Hoping for'
                                }
                            }
                        },
                        Role: {
                            name: 'Role',
                            fields: {
                                Role: {
                                    name: 'Role'
                                }
                            }
                        },
                        WhenWhere: {
                            name: 'When / Where',
                            fields: {
                                When: {
                                    name: 'When'
                                },
                                Where: {
                                    name: 'Where'
                                }
                            }
                        }
                    }
                },
                LinkProfile: {
                    name: 'Link this Profile',
                    note: {
                        FRIEND: 'Link this friend profile with one other user’s' +
                            'friend profile so that you can share conversations with other users',
                        FLIRT: 'Link this flirt profile with one other user’s' +
                            'flirt profile so that you can share conversations with other users',
                        FUN: 'Link this fun profile with one other user’s' +
                            'fun profile so that you can share conversations with other users'
                    },
                    linkedText: 'is linked to your profile',
                    modal: {
                        title: 'Unlink this profile',
                        text: 'Are you sure you want to unlink your profile from'
                    },
                    requestSent: 'Your request to link has been sent'
                }
            }
        },
        modal: {
            hubTitle: 'GETTING STARTED',
            hubMessage: 'To view the community and start ' +
                'connecting, all you need to do is ' +
                'select a profile, create a profile name ' +
                'and upload a photo. Of course the ' +
                'more information you give about ' +
                'yourself the better experience you ' +
                'will have. Okay let\'s get going, tap the ' +
                'Get Started button below:',
            hubButton: 'Get Started'
        },
        report: {
            popup: {
                title: 'Report this User',
                response: 'Thanks for letting us know about this problem. MUSL takes issues like this very seriously.'
            }
        }
    },
    settings: {
        screenTitle: 'Settings',
        metrics: {
            imperial: 'Imperial',
            metric: 'Metric'
        },
        alerts: {
            sectionTitle: 'Alerts',
            all: 'All Off/On',
            notifications: 'Notifications Off/On',
            sound: 'Sound & Vibrate Off/On',
            vibration: 'Vibrate Off/On',
            modalTitle: 'ALERTS',
            modalInfo: 'Turn Notifications and Alerts from MUSL on and off, as well as,' +
                'turn on sound and vibrations as necessary'
        },
        quietHours: {
            sectionTitle: 'Quiet Hours',
            onOff: 'Off/On',
            modalTitle: 'QUIET HOURS',
            modalInfo: 'Turning on Quiet Hours will turn all alerts off for the time period you set.' +
                'Set time limits by adjusting the beginning and ending on the dial.'
        },
        timeLimits: {
            sectionTitle: 'Time Limits',
            onOff: 'Limits Off/On',
            daily: 'Daily',
            weekly: 'Weekly',
            modalTitle: 'TIME LIMITS',
            modalInfo: 'Set time limits on how much you use the MUSL App. Once the limits have been set,' +
                'you’ll recieve an alert  when you hit the end of the limits you’ve set. ' +
                'You can set either Daily or Weekly Limits.'
        },
        accountDetails: {
            sectionTitle: 'Account Details',
            email: {
                modalTitle: 'YOUR EMAIL',
                modalInfo: 'We use your email to confirm your identity and for communication with you regarding the service.' +
                    '\n\nWe will NEVER share your email with other services or partners.'
            },
            password: {
                modalTitle: 'YOUR PASSWORD',
                modalInfo: 'Passwords in MUSL require that you use a combination of upper' +
                    'and lowercase le ers as well as at least one number and special symbol'
            }
        },
        switcher: {
            usePhotos: 'Use Photos in Switcher',
            modalTitle: 'PHOTOS IN SWITCHER',
            modalInfo: 'When you turn on this function, the icons in the switcher at the bottom of the app will become ' +
                'your main profile photos. Enjoy.'
        },
        logout: {
            logout: 'Log Out'
        },
        deleteAccount: {
            delete: 'Delete Your Account',
            popupTitle: 'Delete Your Account',
            popupText: 'You are about to delete your account permanently. Are you certain this is what you want?',
            dismissButton: 'Dismiss',
            confirmButton: 'Delete'
        }
    },
    visibility: {
        screenTitle: 'Visibility',
        safeForWork: {
            sectionTitle: 'Safe For Work',
            offOn: 'On/Off',
            mapTitle: 'Shift my location'
        },
        explore: {
            sectionTitle: 'Explore',
            offOn: 'On/Off',
            mapTitle: 'Tap the map to explore a new location'
        }
    },
    stats: {
        screenTitle: 'My Statistics',
        sections: {
            profile: {
                sectionTitle: 'Profile Views',
                last7Days: 'Profile views in the last 7 days',
                total: 'Total profile views'
            },
            flexes: {
                sectionTitle: 'Flexes',
                last7Days: 'Flexes recieved in the last 7 days',
                total: 'Total flexes recieved'
            },
            photos: {
                sectionTitle: 'Photos',
                total: 'Total number of times your photos have been seen'
            },
            chats: {
                sectionTitle: 'Chats',
                messagesSent: 'Total number of messages sent',
                messagesReceived: 'Total number of messages received'
            }
        }
    },
    changeEmail: {
        screenTitle: 'Change Email'
    },
    changePassword: {
        screenTitle: 'Change Password'
    },
    blockedUsers: {
        screenTitle: 'Blocked users'
    },
    // common
    common: {
        placeholder: {
            email: 'Your Email',
            password: 'Password',
            passwordConfirm: 'Reenter Password'
        },
        error: {
            fieldRequiredText: 'This field is required',
            fieldFormat: 'Unknown format',
            emptyFields: 'So sorry. You must enter the information above. It`s required.'
        },
        buttons: {
            close: 'Close',
            finish: 'Finish',
            next: 'Next',
            back: 'Back',
            continue_btn: 'Continue',
            login: 'Login',
            registration: 'Registration',
            cancel: 'Cancel',
            save: 'Save',
            unlink: 'Unlink',
            submit: 'Submit'
        }
    },
    terms: {
        buttons: {
            disagree: 'I Disagree',
            agree: 'I Agree',
            accept: 'I accept the terms',
            notAccept: 'I do not accept the terms'
        }
    }
};
//# sourceMappingURL=en.js.map