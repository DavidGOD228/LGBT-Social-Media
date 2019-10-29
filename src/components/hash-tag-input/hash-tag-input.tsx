import React, {Component} from 'react'
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Fetch from '../../utils/fetch'
import configuration from '../../configs/index'
import Query from '../../lib/smart-criteria/query'
import Restrictions from '../../lib/smart-criteria/restrictions'
import TagInput from 'react-native-tag-input'

interface Props {
  tags?: any[]
  onTagsChanged: (tags: any[]) => void
}

interface State {
  selectedTags: any[],
  availableTags: any[],
  suggestionsDataSource: any,
}

const LOGTAG = 'HashTagInput'

export default class HashTagInput extends Component<Props, State> {

  tagInputRef: any

  constructor(props) {
    super(props)
    console.log("TAAAGGGS", props.tags)
    this.state = {
      selectedTags: props.tags ? props.tags! : [] as any[],
      availableTags: [] as any[],
      suggestionsDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  onTagsChanged = (tags) => {
    console.log(LOGTAG, tags)
    const selectedTags = (Array.isArray(tags) ? tags : [tags]).map(t => typeof t === 'string' ? {value: t} : t)
    this.setState({
      ...this.state,
      selectedTags,
      availableTags: []
    })
    this.tagInputRef.tagInput.clear()
    this.props.onTagsChanged(selectedTags)
  }

  renderTag = (tag) => (
    <Text
      key={tag.id}
      style={{
        color: 'black',
        borderColor: 'grey',
        borderWidth: 1
      }}>
      {tag.value}
    </Text>
  )

  renderSuggestion = (tag) => (
    <TouchableOpacity
      style={{padding: 10}}
      key={tag.id}
      onPress={() => this.addTag(tag)}
    >
      <Text style={{color: 'black'}}>
        {tag.value}
      </Text>
    </TouchableOpacity>
  )

  hideSuggestions = () => this.setState({
    ...this.state,
    availableTags: []
  })

  render() {

    return (
      <View>

        <TagInput
          ref={(ref) => this.tagInputRef = ref}
          value={this.state.selectedTags}
          onChange={this.onTagsChanged}
          inputProps={{
            placeholder: this.state.selectedTags.length ? '' : 'Search by #hashtags',
            placeholderTextColor: '#8D8D8D'
          }}
          numberOfLines={20}
          onChangeText={this.getHashtags}
          labelExtractor={label => label.value}
        />
        {this.state.availableTags.length ?
          <TouchableOpacity
            activeOpacity={1}
            style={styles.overlay}
            onPress={this.hideSuggestions}
          >
          </TouchableOpacity> : null
        }

        {this.state.availableTags.length ?
          <View style={{
            position: 'absolute',
            top: -85,
            width: '100%',
            backgroundColor: 'white',
            borderColor: 'grey',
            borderWidth: 1
          }}>
            <ListView
              style={{
                height: 80,
                flex: 1
              }}
              dataSource={this.state.suggestionsDataSource.cloneWithRows(this.state.availableTags)}
              renderRow={this.renderSuggestion}
            />
          </View>
          : null }
      </View>
    )
  }

  private getHashtags = (term: string) => {
    if (!term || term.length < 2) {
      return
    }

    const query = new Query()
    query.add(Restrictions.like('value', term))

    return Fetch.post(configuration.remoteApi.base + '/hash-tags', query.generate())
                .then(tags => {
                  const availableTags = (tags.response.objects || []).filter(
                    t => !(this.state.selectedTags.map(s => s.value)
                               .indexOf(t.value) !== -1)
                  )
                  this.setState({
                    ...this.state,
                    availableTags
                  })
                })
  }

  private addTag(tag) {
    const newTags = [...this.state.selectedTags, tag]
    this.onTagsChanged(newTags)
  }

}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: 500,
    top: -250,
    left: 0,
    height: 500,
    position: 'absolute'
  }
})
