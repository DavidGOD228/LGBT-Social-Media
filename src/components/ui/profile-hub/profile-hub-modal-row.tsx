import React from 'react'
import {
  Image,
  StyleSheet,
  View
} from 'react-native'
import {ProfileTypeModalDict} from '../../../configs/dicts'
import TextBold from '../../global/text/basic/text-bold'
import TextNormal from '../../global/text/basic/text-normal'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textView: {
    marginLeft: 10,
    flex: 1
  },
  text: {
    fontSize: 16,
    color: 'white'
  },
  photo: {
    height: '100%',
    aspectRatio: 1
  }
})

interface Props {
  data: ProfileTypeModalDict
}

const UiProfileHubModalRow = ({data}: Props) => (
  <View style={styles.container}>
    <Image source={data.photo} style={styles.photo}/>
    <View style={styles.textView}>
      <TextBold style={styles.text}>
        {data.name}
        <TextNormal style={styles.text}>
          {data.description}
        </TextNormal>
      </TextBold>
    </View>
  </View>
)

export default UiProfileHubModalRow
