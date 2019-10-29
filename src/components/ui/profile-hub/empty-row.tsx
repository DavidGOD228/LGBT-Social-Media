import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {ProfileTypeDict} from '../../../configs/dicts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  text: {
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(40, 98, 148)'
  },
  subtext: {
    marginLeft: 20,
    fontSize: 19,
    fontWeight: 'bold',
    color: 'rgb(93, 164, 229)'
  },
  photo: {
    marginLeft: 20,
    height: '100%',
    aspectRatio: 1,
    borderRadius: 20
  }
})

interface Props {
  data: ProfileTypeDict,
  onClick: () => void
}

const UiProfileHubEmptyRow = ({data, onClick}: Props) => (
  <TouchableOpacity style={styles.container} onPress={onClick}>
    <Image source={data.photo} style={styles.photo}/>
    <View style={styles.textView}>
      <Text style={styles.text}>
        {data.name}
      </Text>
      <Text style={styles.subtext}>
        Create Profile
      </Text>
    </View>
  </TouchableOpacity>
)

export default UiProfileHubEmptyRow
