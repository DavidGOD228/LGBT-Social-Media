import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  containerViewStyle: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    backgroundColor: 'white'
  },
  headerStyle: {
    fontSize: 24,
    color: '#4A4A4A',
    fontFamily: 'Uniform-Light'
  },
  floatButtonContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  collapseBar: {
    marginRight: -15,
    paddingRight: 15
  }
})

export const globalParams = {
  bottomPanelHeight: 65
}
