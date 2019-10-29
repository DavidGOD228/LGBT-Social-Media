import React from 'react'
import {
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import RNExitApp from 'react-native-exit-app';
import DefaultHeader from '../components/global/default-header'
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges'
import UiBlockVerticalCenter from '../components/ui/block/vertical-center'
import UiBlockBasic from '../components/ui/block/basic'
import ModalWindow from '../components/modal/modal-window'
import ModalCloseBtn from '../components/modal/modal-close-btn'
import ModalWindowContent from '../components/modal/modal-window-content'
import ModalWindowTitle from '../components/modal/modal-window-title'
import ModalWindowText from '../components/modal/modal-window-text'
import ModalFullWidthBtn from '../components/modal/modal-fullwidth-btn'
import ModalTextBtn from '../components/modal/modal-text-btn'
import UiBlockSpace from '../components/ui/block/space'
import {LocalSettingsService} from '../services/local-settings'
import {lazy} from '../annotations/inversify'
import i18n from '../locales/i18n'
import routeConfig from '../router'
import {NavigationScreenProp} from 'react-navigation'
import BaseScreenDefault from './base/base-scene'
import NavigationButtonBlueActive from '../components/global/bottom-navigation/button-blue-active'
import NavigationButtonWhiteActive from '../components/global/bottom-navigation/button-white-active'

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  scrolledToBottom: boolean,
  showModal: boolean,
  showErrorMessage: boolean
}

export default class TermsScreen extends BaseScreenDefault<Props, State> {

  static navigationOptions = {
    title: 'TermsScreen',
    header: <DefaultHeader/>,
    headerLeft: null
  }

  private static isScrolledToBottom({layoutMeasurement, contentOffset, contentSize}) {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
  }

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      scrolledToBottom: false,
      showModal: false
    }
  }

  pageScrolled = (event: NativeSyntheticEvent<NativeScrollEvent> | undefined) => {
    if (event && TermsScreen.isScrolledToBottom(event.nativeEvent)) {
      this.enableAgreeButton()
    }
  }

  disagreeButtonPressed = () => {
    this.showModal()
    this.showErrorMessage()
  }

  modalCloseButtonPressed = () => {
    this.hideModal()
  }

  agreeButtonPressed = () => {
    return this.acceptTerms()
  }

  modalAgreeButtonPressed = () => {
    this.hideModal()
    return this.acceptTerms()
  }

  modalDeclineButtonPressed = () => {
    this.closeApp()
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <ScrollView style={styles.scrollViewStyle} onScroll={this.pageScrolled}>

          {this.state.showErrorMessage ? (
            <Text style={styles.headlineStyle1}>
              You must agree to our Terms {'&'} Conditions in order to use the MUSL App
            </Text>
          ) : null}

          <Text style={styles.headlineStyle2}>
            Terms {'&'} Conditions Of Use
          </Text>

          <Text style={styles.legalTitle}>1. Rules and Registration</Text>
          <Text style={styles.legalParagraph}>
            In order to join MuslApp, User must register for account. User must be over 18 years old (or other legal age
            of majority depending on User’s location). By signing up for an account, User understands and acknowledges
            that he or she is entering into a legally binding agreement between MuslApp and User that includes these
            Terms and Conditions and the <Text
            style={styles.legalLinking}
            onPress={() => Linking.openURL('http://www.muslapp.com/privacy')}
          >Privacy Policy</Text>.
          </Text>
          <Text style={styles.legalParagraph}>By registering for an account, User authorizes MuslApp to collect and
            store his or her personal information, display and use the User’s personal information, and access the
            User’s account(s). User is being given a limited license to use the website to access public information.
            User represents that all information and content posted by User is accurate and truthful, and that User will
            promptly update any information or content that subsequently becomes inaccurate or false.</Text>
          <Text style={styles.legalParagraph}>User agrees he or she will comply with all applicable local, state,
            national and international laws, rules and regulations. User represents and warrants that User has never
            been convicted of a felony, and that User is not required to register as a sex offender with any state,
            federal or local sex offender registry.</Text>
          <Text style={styles.legalParagraph}>User may delete his or her account at any time. If User cancels his or her
            subscription, User may use his or her subscription until the end of the subscription term, and User’s
            subscription will not be renewed after it expires. User understands that there may be some delay between the
            User’s request to remove his or her account and the actual removal of the account from the website. User
            will not be provided any refunds once a service or product has been purchased. After User has terminated the
            account, MuslApp may retain information about User and User’s account indefinitely, but is not required to
            do so except as required by law. MuslApp intends to retain information about User and User’s account for
            thirty (30) days after the termination of User’s account, but that may change from time to time. Please
            check the Terms and Conditions and Privacy Policy for any updates on this data retention policy.</Text>
          <Text style={styles.legalParagraph}>MuslApp reserves the right to terminate or suspend a User and his or her
            MuslApp account(s) at any time for any reason, including the violation of these Terms and Conditions or
            the&nbsp;<Text
              style={styles.legalLinking}
              onPress={() => Linking.openURL('http://www.muslapp.com/privacy')}
            >Privacy Policy</Text>.
          </Text>
          <Text style={styles.legalTitle}>2. Content</Text>
          <Text style={styles.legalParagraph}>There are three types of content on MuslApp: content uploaded by User,
            content uploaded by other users, and public content uploaded by MuslApp.</Text>
          <Text style={styles.legalParagraph}>User Content. User’s public information will be visible to other users,
            and User consents and understands that other users of MuslApp will be able view that content.
            User will own the content posted by User, but is giving MuslApp a license to use and access that information
            for the purpose of operating and developing MuslApp, and for other purposes described in these Terms and
            Conditions. User is responsible for the content and information User uploads, posts, or transmits to other
            users. User agrees to be bound by the limitations in these Terms and Conditions when posting information and
            content, including but not limited to those specifically identified in Section 3, below. User is solely
            responsible for maintaining the confidentiality of his or her password.</Text>
          <Text style={styles.legalParagraph}>Other User&rsquo;s Content. User may access any public content of other
            users, but may not access the private content of other users. User may not alter the content of any other
            user whether public or private without the other user’s written consent.</Text>
          <Text style={styles.legalParagraph}>User understands that he or she will be involved in communications with
            other MuslApp users. User understands that MuslApp cannot provide any assurances regarding the accuracy of
            information posted by other users. As outlined in Sections 7 and 8, below, User agrees that MuslApp will
            have no responsibility or liability for the content of those discussions with other users. User also
            understands that there will be different channels of interaction provided on the website based on the
            representations of the individual users. The three channels are “Friend”, “Flirt” and “Fun”. If User has any
            concerns about the substance of any interactions, and whether those interactions are appropriate for the
            channel User has chosen, User’s rights are limited to reporting those concerns to MuslApp at <Text
              style={styles.legalLinking}
              onPress={() => Linking.openURL('mailto:customercare@muslapp.com')}
            >customercare@muslapp.com</Text>. </Text>
          <Text style={styles.legalParagraph}>MuslApp Content. User may access the public content posted by MuslApp.
            User may not access any non-public locations on the website or content of MuslApp.</Text>
          <Text style={styles.legalParagraph}>MuslApp reserves the right to monitor, edit and/or delete the information
            and content of its users for any reason, including if MuslApp believes any such content is in violation of
            these Terms and Conditions, but MuslApp also has no obligation to do so.</Text>
          <Text style={styles.legalParagraph}>Content other than expressly reserved to User is owned by MuslApp and is
            protected by all relevant intellectual property laws. MuslApp retains all proprietary rights in all content,
            trademarks, trade names, service marks and other intellectual property rights related to the website. The
            MuslApp website contains copyrighted material, trademarks, and other proprietary information MuslApp and its
            affiliates, including the provision of the separate communication channels for its users. User agrees to not
            copy, reproduce, modify, alter, transmit, create any derivative works from, or make use of any copyrighted
            material, trademarks, trade names, service marks, or other intellectual property or proprietary information
            accessible through MuslApp and/or the website, without first obtaining the prior written consent of MuslApp
            or, if such property is not owned by the MuslApp, the owner of such intellectual property or proprietary
            rights. User also agrees to not remove, obscure or alter any proprietary notices appearing on any content on
            the website.</Text>
          <Text style={styles.legalParagraph}>If User believes that his or her work has been used replicated, or
            compromised in a way that constitutes copyright infringement, please provide MuslApp with notice of such
            violation, and specifically include the following information: 1) the signature of the owner of the
            copyright interest or person authorized to act on behalf of the owner of the copyright interest; 2) a
            description of the copyrighted work that User contends has been infringed; 3) a description of where the
            material that User contends to be infringed is located (i.e. URL); 4) User’s contact information, including
            address, telephone number and email address; 5) a written statement by User that you have a good faith
            belief that the disputed use is not authorized by the copyright owner, its agent, or the law; and 6) a
            statement made under penalty of perjury that the above information in User’s notice is accurate and that
            User is the copyright owner or authorized to act on the copyright owner’s behalf.</Text>
          <Text style={styles.legalParagraph}>The notice of User’s claim for copyright infringement should be provided
            to the Company’s Copyright Agent by e-mail at <Text
              style={styles.legalLinking}
              onPress={() => Linking.openURL('mailto:customercare@muslapp.com')}
            >customercare@muslapp.com</Text> and by United States mail or overnight mail to
          </Text>
          <Text style={styles.legalParagraph}>276 Shipley Street San Francisco, CA 94107 </Text>
          <Text style={styles.legalTitle}>3. Restrictions on the Use of MuslApp</Text>
          <Text style={styles.legalParagraph}>The license given to User to access information on the MuslApp website is
            for personal use only. User may not use information or content on MuslApp in connection with any commercial
            endeavors such as advertising or soliciting any other user to buy or sell any products or services to any
            other user without his or her prior explicit consent.</Text>
          <Text style={styles.legalParagraph}>User also understands and acknowledges that User will not post content or
            information that constitutes any of the following: obscenity, abuse, racism, bigotry, hatred,
            physical or emotions threats, illegal activity, harassment, spam, spy ware, solicitation, exploitation,
            infringing on third party’s rights, defamation, or showing another person without that person’s consent.
            User may not post content or information that contains computer viruses, time bombs, trojan horses,
            cancelbots, malware, ransomware, worms, robots, spiders, site search/retrieval applications, or any other
            harmful or disruptive codes, components or devices, including those that data mine or impersonate or
            otherwise misrepresent a connection with any person or entity. This is just a partial list of prohibited
            content, and may be updated from time to time. User may not scrape or replicate content. User may not
            “frame” or “mirror” any part of MuslApp, or use meta tags or code or other devices containing any reference
            to MuslApp to direct any person to any other website for any purpose. User may not interfere with or disrupt
            the servers or networks connected to MuslApp or its partners, affiliates or users.</Text>
          <Text style={styles.legalParagraph}>User agrees not to post pictures of, and/or information about, any person
            other than User without the express written consent of that individual.</Text>
          <Text style={styles.legalParagraph}>User understands and acknowledges that MuslApp may remove content for any
            reason, including the violation of these Terms and Conditions. MuslApp reserves the right to determine
            whether information and content posted by User falls under any of these prohibited categories. In the event
            User views any content he or she believes to violate these Terms and Conditions, User can report such abuse
            to MuslApp at <Text
              style={styles.legalLinking}
              onPress={() => Linking.openURL('mailto:customercare@muslapp.com')}
            >customercare@muslapp.com</Text>.</Text>
          <Text style={styles.legalParagraph}>User understands and acknowledges that MuslApp may access and disclose
            account information if required to do so by law or in good faith MuslApp believes that such access is
            required to comply with legal process, enforce these Terms and Conditions, respond to User requests for
            customer service, or protect the rights, property or safety of MuslApp or any other user.</Text>
          <Text style={styles.legalParagraph}>MuslApp reserves the right to investigate and take any legal action
            available to it against anyone who violates this provision, including removing the offending communication
            or terminating or suspending User’s account for such violation.</Text>
          <Text style={styles.legalTitle}>4. Privacy</Text>
          <Text style={styles.legalParagraph}>User agrees that he or she will be sharing personal information on the
            MuslApp website. User understands that the use of such information will be subject to MuslApp’s <Text
              style={styles.legalLinking}
              onPress={() => Linking.openURL('http://www.muslapp.com/privacy')}
            >Privacy Policy</Text>.
          </Text>
          <Text style={styles.legalTitle}>5. Third Party Store Purchases and Pricing</Text>
          <Text style={styles.legalParagraph}>User understands and acknowledges that MuslApp operates in conjunction
            with other platforms that may require User to register with other web sites, including but not limited to
            Apple/ITunes and Google Play. User understands and acknowledges that the agreement between User and MuslApp
            in these Terms and Conditions is only between MuslApp and User, and does not constitute any agreement with
            third parties. User agrees that he or she will comply with the terms and conditions of those other web
            sites, including any third party app store. MuslApp makes no representations about those third party terms
            and conditions. User understands and acknowledges that the restrictions imposed by third parties may be more
            onerous than MuslApp. User understands and acknowledges that these Terms and Conditions apply if the terms
            and conditions of third parties are less restrictive than these Terms and Conditions.</Text>
          <Text style={styles.legalParagraph}>MuslApp may make products and/or services available to User for a
            subscription fee. User understands and acknowledges that pricing for those products and/or services may vary
            depending on promotional offers available to User. User may purchase premium services through various
            payment methods, but all such payments will occur in an app store and not via MuslApp. User agrees to abide
            by the payment terms of those third party payment processers. User may change the payment method at any
            time.</Text>
          <Text style={styles.legalParagraph}>User understands and acknowledges that MuslApp shall have no liability for
            the actions and/or content of any third parties, including third party app stores, or in connection with
            downloading MuslApp. User agrees that MuslApp shall have no liability for any payment processing errors.
            User understands and acknowledges that third parties, including third party app stores, have no obligation
            to provide maintenance or support for MuslApp and the MuslApp website.</Text>
          <Text style={styles.legalTitle}>6. Advertisements, Push Notification, Location Based Tracking</Text>
          <Text style={styles.legalParagraph}>User understands that from time to time MuslApp will send emails, texts,
            offers, advertisements, notifications, and/or products to User based on their location. Advertisers may also
            send opportunities to you by push notification using GPS, Bluetooth, or other location-based features. Users
            who have purchased specialized products, promotions and/or services may decline to receive location-based
            advertisements or notifications.</Text>
          <Text style={styles.legalTitle}>7. Disclaimer/Warranty/Limitation of Liability</Text>
          <Text style={styles.legalParagraph}>User understands and acknowledges that he or she takes the content “as
            is”, and that User is using MuslApp at his or her own risk. MuslApp makes no warranties about the continuity
            of services, or that the MuslApp website will meet expectations. Accordingly, User acknowledges having read
            the following disclaimer:</Text>
          <Text style={styles.legalParagraph}>TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, MUSLAPP PROVIDES THIS
            CONTENT AND INFORMATION ON AN “AS IS” AND “AS AVAILABLE” BASIS AND GRANTS NO WARRANTIES OF ANY KIND, WHETHER
            EXPRESS, IMPLIED, STATUTORY OR OTHERWISE WITH RESPECT TO MUSLAPP AND ANY OF ITS CONTENT CONTAINED THEREIN,
            INCLUDING (WITHOUT LIMITATION) ANY IMPLIED WARRANTIES OF SATISFACTORY QUALITY, MERCHANTABILITY, FITNESS FOR
            A PARTICULAR PURPOSE OR NON-INFRINGEMENT.</Text>
          <Text style={styles.legalParagraph}>ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE
            SERVICE IS ACCESSED AT USER’S OWN DISCRETION AND RISK, AND USER WILL BE SOLELY RESPONSIBLE FOR AND HEREBY
            WAIVE ANY AND ALL CLAIMS AND CAUSES OF ACTION WITH RESPECT TO ANY DAMAGE TO USER’S DEVICE, COMPUTER SYSTEM,
            INTERNET ACCESS, DOWNLOAD OR DISPLAY DEVICE, OR LOSS OR CORRUPTION OF DATA THAT RESULTS OR MAY RESULT FROM
            THE DOWNLOAD OF ANY SUCH MATERIAL. IF USER DOES NOT ACCEPT THIS LIMITATION OF LIABILITY, USER IS NOT
            AUTHORIZED TO DOWNLOAD OR OBTAIN ANY MATERIAL THROUGH MUSLAPP.</Text>
          <Text style={styles.legalParagraph}>To the extent User encounters links to other websites on the MuslApp
            website, MuslApp makes no representations or warranties about those third party websites. All third party
            content is the responsibility of the respective authors of such content. MuslApp does not guarantee the
            accuracy or completeness of any third party content, and does not adopt, endorse or accept responsibility
            for the accuracy of such content. Under no circumstances will MuslApp be responsible for any loss or damages
            resulting from User’s reliance on information or content found on third party websites or transmitted by
            other users.</Text>
          <Text style={styles.legalParagraph}>User also agrees that MuslApp is not responsible for the conduct of any
            other User. In no event shall the MuslApp, its affiliates or its partners be liable for any losses or
            damages whatsoever, whether direct, indirect, general, special, compensatory, consequential, and/or
            incidental, arising out of or relating to the conduct of User or anyone else in connection with the use of
            MuslApp. User waives all claims against MuslApp, and acknowledges having read the following limitation of
            liability.</Text>
          <Text style={styles.legalParagraph}>TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, IN NO EVENT WILL MUSLAPP,
            ITS AFFILIATES OR PARTNERS, BE LIABLE TO USER OR ANY THIRD PERSON FOR ANY INDIRECT, RELIANCE, CONSEQUENTIAL,
            EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES, INCLUDING, WITHOUT LIMITATION, LOSS OF PROFITS, LOSS OF
            GOODWILL, DAMAGES FOR LOSS, CORRUPTION OR BREACHES OF DATA OR PROGRAMS, SERVICE INTERRUPTIONS AND
            PROCUREMENT OF SUBSTITUTE SERVICES, EVEN IF THE COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, THE COMPANY'S LIABILITY TO YOU FOR ANY CAUSE
            WHATSOEVER, AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF
            ANY, BY YOU TO THE COMPANY FOR THE SERVICE WHILE YOU HAVE AN ACCOUNT.</Text>
          <Text style={styles.legalParagraph}>User agrees that MuslApp will not be liable in any manner and that User
            will hold MuslApp harmless in the event that User’s information and/or pictures are placed in the incorrect
            channel, be it through User’s own error or by MuslApp.</Text>
          <Text style={styles.legalParagraph}>To the extent this limitation of liability provision is deemed void, User
            understands and acknowledges that MuslApp’s limitation of liability shall be limited to $100. User
            understands and acknowledges that this limitation of liability is a fundamental condition of these Terms and
            Conditions, and the agreement between User and MuslApp.</Text>
          <Text style={styles.legalParagraph}>User understands that he or she will not use MuslApp while operating a
            vehicle because this is a web-based application.</Text>
          <Text style={styles.legalTitle}>8. Interactions with Other Users</Text>
          <Text style={styles.legalParagraph}>USER UNDERSTANDS AND ACKNOWLEDGES THAT USER WILL BE IN CONTACT WITH OTHER
            USERS. USER ACKNOWLEDGES THAT USER IS SOLELY RESPONSIBLE FOR ALL INTERACTIONS WITH OTHER USERS, AND USER
            AGREES TO TAKE REASONABLE PRECAUTIONS IN HIS OR HER INTERACTIONS WITH OTHER USERS. MUSLAPP IS NOT
            RESPONSIBLE AND WILL HAVE NO LIABILITY RELATED TO INTERACTIONS BETWEEN USERS, INCLUDING ANY PHYSICAL OR
            EMOTIONAL HARM OR DAMAGES THAT USER SUFFERS AS A RESULT OF SUCH INTERACTIONS. USER UNDERSTANDS AND
            ACKNOWLEDGES THAT MUSLAPP DOES NOT PERFORM BACKGROUND OR CRIMINAL CHECKS OR SCREENING ON ITS USERS, AND
            MAKES NO REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OF USERS.</Text>
          <Text style={styles.legalTitle}>9. Indemnity and Hold Harmless</Text>
          <Text style={styles.legalParagraph}>User agrees that he or she will indemnify, defend, release, and hold
            harmless, MuslApp and its affiliates, officers, agents, employees, partners, and third parties with which
            MuslApp contracts for any loss, liability, claim or demand resulting from acts on behalf of User for content
            or information posted on MuslApp, or any conduct of User resulting from communications that first occurred
            on MuslApp. MuslApp reserves the right but does not have the obligation to assume the exclusive defense and
            control of any matter otherwise subject to indemnification by User, and User will cooperate with MuslApp to
            the fullest extent permissible by law in such defense.</Text>
          <Text style={styles.legalTitle}>10. Digital Millennium Copyright Act </Text>
          <Text style={styles.legalParagraph}>User understands and acknowledges that he or she does not have the right
            to use the content of other users. By signing up for MuslApp, User does not gain any license to the content
            of other users. This agreement is subject to 512(c) and (d) of Digital Millennium Copyright Act 1998.
            MuslApp has adopted a policy regarding copyright infringement. If you think your intellectual property
            rights have been stolen or compromised, please submit notification of the infringement to <Text
              style={styles.legalLinking}
              onPress={() => Linking.openURL('mailto:customercare@muslapp.com')}
            >customercare@muslapp.com</Text>
          </Text>
          <Text style={styles.legalTitle}>11. Miscellaneous Terms</Text>
          <Text style={styles.legalParagraph}>User understands and acknowledges that these Terms and Conditions may be
            amended from time to time. MuslApp may do this for a variety of reasons, including changes in the law or
            MuslApp’s business practice. If changes to these Terms and Conditions include material changes that affect
            your rights or obligations, MuslApp will send a message to User’s account, and User will be legally bound by
            the updated Terms and Conditions. User must consent to those changes to the Terms and Conditions to continue
            using MuslApp.</Text>
          <Text style={styles.legalParagraph}>MuslApp has taken reasonable steps to keep everything on the website and
            App current, but MuslApp makes no representations that this is the case. User also understands and
            acknowledges that MuslApp may be modified or discontinued, temporarily or permanently, with or without
            notice. User understands and acknowledges that MuslApp shall not be liable to User or to any third party for
            any modification, suspension or discontinuance.</Text>
          <Text style={styles.legalParagraph}>It is the responsibility of customer to ensure material obtained is free
            from virus. MuslApp is providing no warranty to User about any interruption of services or computer
            viruses. </Text>
          <Text style={styles.legalParagraph}>If any term in these Terms and Conditions is deemed invalid, that term
            shall be severed, and the remainder of these Terms and Conditions shall remain enforceable.</Text>
          <Text style={styles.legalParagraph}>User represents that he or she is in a country without an embargo with the
            United States. MuslApp is a United States company and its servers are located in the United States. But it
            is possible that MuslApp may be accessed by users located in other countries. If User is in a country with
            data protection laws, the laws pertaining to the storage of data in the United States may not be as secure
            as the User’s residence country.</Text>
          <Text style={styles.legalParagraph}>User agrees that where any dispute arises, User will first contact MuslApp
            and attempt to settle the dispute informally. User agrees that should such informal process fail, the
            exclusive means of resolving any dispute or claim arising out of or relating to these Terms and Conditions
            shall be binding arbitration administered by the American Arbitration Association. The arbitration shall
            occur in San Francisco County, California. By registering for an account, User agrees to this arbitration
            agreement. User understands he or she is giving up his or her right to proceed in a court of law. User’s
            rights will be determined by an arbitrator, and not a judge or jury. The choice of law for resolving
            disputes under these Terms and Conditions or any claims against MuslApp will be California, and the
            procedures shall be consistent with the Federal Arbitration Act.</Text>
          <Text style={styles.legalParagraph}>User agrees to a waiver of claims brought by class action. User also
            waives his or her right to jury trial. To the extent this arbitration agreement is deemed unenforceable or
            User is otherwise permitted to seek relief from the courts, the exclusive jurisdiction will be of the courts
            of the United States and California. User agrees to this jurisdiction.</Text>
          <Text style={styles.legalParagraph}>User understands and agrees to be bound by his or her electronic
            signature. The effective date for this agreement will be the time the entry of the application.</Text>
          <Text style={styles.legalParagraph}>User agrees that this Agreement and the Privacy Policy contains the entire
            agreement between User and MuslApp regarding the use of the Service.</Text>

          <Text style={[styles.headlineStyle2, {fontSize: 18}]}>
            By tapping "I Agree", I agree to accept the Terms and Conditions
          </Text>
        </ScrollView>

        <UiBlockBasic>
          <BottomNavigationPanel>
            <UiBlockVerticalCenter>
              <UiBlockHorizontalEdges>
                <NavigationButtonBlueActive
                  isActive={this.state.scrolledToBottom}
                  onPress={this.state.scrolledToBottom ? this.disagreeButtonPressed : this.showErrorMessage}>
                  {i18n.t('terms.buttons.disagree')}
                </NavigationButtonBlueActive>
                <NavigationButtonWhiteActive
                  isActive={this.state.scrolledToBottom}
                  onPress={this.state.scrolledToBottom ? this.agreeButtonPressed : this.showErrorMessage}>
                  {i18n.t('terms.buttons.agree')}
                </NavigationButtonWhiteActive>
              </UiBlockHorizontalEdges>
            </UiBlockVerticalCenter>
          </BottomNavigationPanel>
        </UiBlockBasic>

        <ModalWindow visible={this.state.showModal}>
          <UiBlockSpace height={30}/>
          <ModalCloseBtn onPress={this.modalCloseButtonPressed}/>
          <UiBlockSpace height={80}/>
          <ModalWindowContent>
            <ModalWindowTitle>
              TERMS {'&'} CONDITIONS
            </ModalWindowTitle>
            <UiBlockSpace/>
            <ModalWindowText>
              If you do not accept our terms and conditions, you will be unable to use
              the MUSL App.
            </ModalWindowText>
            <UiBlockSpace height={30}/>
            <ModalFullWidthBtn
              onPress={this.state.scrolledToBottom ? this.modalAgreeButtonPressed : this.modalCloseButtonPressed}
            >
              {i18n.t('terms.buttons.accept')}
            </ModalFullWidthBtn>
            <UiBlockSpace height={30}/>
            <ModalTextBtn onPress={this.modalDeclineButtonPressed}>
              {i18n.t('terms.buttons.notAccept')}
            </ModalTextBtn>
          </ModalWindowContent>
        </ModalWindow>
      </View>
    )
  }

  private closeApp = () => {
    RNExitApp.exitApp();
  }

  private showModal = () => {
    this.setSpecState('showModal', true)
  }

  private showErrorMessage = () => {
    this.setSpecState('showErrorMessage', true)
  }

  private enableAgreeButton = () => {
    this.setSpecState('scrolledToBottom', true)
  }

  private hideModal = () => {
    this.setSpecState('showModal', false)
  }

  private acceptTerms = async () => {
    await this.localSettingsService.acceptTerms()
    this.navigateToRegistration()
  }

  private navigateToRegistration = () => {
    return this.props.navigation.navigate(routeConfig.registration.name)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  headlineStyle1: {
    // fontFamily: 'Uniform-Medium',
    fontSize: 18,
    lineHeight: 26,
    color: '#D3000D',
    marginTop: 30,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  headlineStyle2: {
    // fontFamily: 'Uniform-Medium',
    fontSize: 24,
    lineHeight: 26,
    color: 'rgb(46, 46, 46)',
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  legalLinking: {
    color: 'rgb(77, 146, 223)'
  },
  termsTitleStyle: {
    // fontFamily: 'Uniform',
    color: '#4A4A4A',
    fontSize: 24,
    paddingBottom: 15
  },
  scrollViewStyle: {
    width: '95%',
    left: 13,
    paddingRight: 40,
    paddingLeft: 20
  },
  scrollViewTextStyle: {
    // fontFamily: 'Uniform',
    color: '#4A4A4A',
    fontSize: 14,
    lineHeight: 20
  },
  scrollViewAgreeTextStyle: {
    // fontFamily: 'Uniform',
    fontSize: 18,
    color: '#4A4A4A',
    paddingTop: 20
  },
  agreeButtonStyle: {
    fontSize: 24,
    color: '#ffffff',
    width: 150,
    right: 32
  },
  confirmHeaderTextStyle: {
    flexDirection: 'column',
    color: '#fff',
    fontSize: 24,
    textAlign: 'left'
  },
  confirmTextStyle: {
    flexDirection: 'column',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'left',
    color: '#fff'
  },
  legalParagraph: {
    paddingBottom: 10,
    fontSize: 16,
    color: 'rgb(46, 46, 46)',
    lineHeight: 22
  },
  legalTitle: {
    paddingBottom: 20,
    paddingTop: 10,
    fontSize: 16,
    color: 'rgb(46, 46, 46)'
    // fontFamily: 'Uniform-Bold',
  }

})
