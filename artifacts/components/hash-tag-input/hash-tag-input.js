import React, { Component } from 'react';
import { ListView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Fetch from '../../utils/fetch';
import configuration from '../../configs/index';
import Query from '../../lib/smart-criteria/query';
import Restrictions from '../../lib/smart-criteria/restrictions';
import TagInput from 'react-native-tag-input';
const LOGTAG = 'HashTagInput';
export default class HashTagInput extends Component {
    constructor(props) {
        super(props);
        this.onTagsChanged = (tags) => {
            console.log(LOGTAG, tags);
            const selectedTags = (Array.isArray(tags) ? tags : [tags]).map(t => typeof t === 'string' ? { value: t } : t);
            this.setState(Object.assign({}, this.state, { selectedTags, availableTags: [] }));
            this.tagInputRef.tagInput.clear();
            this.props.onTagsChanged(selectedTags);
        };
        this.renderTag = (tag) => (React.createElement(Text, { key: tag.id, style: {
                color: 'black',
                borderColor: 'grey',
                borderWidth: 1
            } }, tag.value));
        this.renderSuggestion = (tag) => (React.createElement(TouchableOpacity, { style: { padding: 10 }, key: tag.id, onPress: () => this.addTag(tag) },
            React.createElement(Text, { style: { color: 'black' } }, tag.value)));
        this.hideSuggestions = () => this.setState(Object.assign({}, this.state, { availableTags: [] }));
        this.getHashtags = (term) => {
            if (!term || term.length < 2) {
                return;
            }
            const query = new Query();
            query.add(Restrictions.like('value', term));
            return Fetch.post(configuration.remoteApi.base + '/hash-tags', query.generate())
                .then(tags => {
                const availableTags = (tags.response.objects || []).filter(t => !(this.state.selectedTags.map(s => s.value)
                    .indexOf(t.value) !== -1));
                this.setState(Object.assign({}, this.state, { availableTags }));
            });
        };
        console.log("TAAAGGGS", props.tags);
        this.state = {
            selectedTags: props.tags ? props.tags : [],
            availableTags: [],
            suggestionsDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        };
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(TagInput, { ref: (ref) => this.tagInputRef = ref, value: this.state.selectedTags, onChange: this.onTagsChanged, inputProps: {
                    placeholder: this.state.selectedTags.length ? '' : 'Search by #hashtags',
                    placeholderTextColor: '#8D8D8D'
                }, numberOfLines: 20, onChangeText: this.getHashtags, labelExtractor: label => label.value }),
            this.state.availableTags.length ?
                React.createElement(TouchableOpacity, { activeOpacity: 1, style: styles.overlay, onPress: this.hideSuggestions }) : null,
            this.state.availableTags.length ?
                React.createElement(View, { style: {
                        position: 'absolute',
                        top: -85,
                        width: '100%',
                        backgroundColor: 'white',
                        borderColor: 'grey',
                        borderWidth: 1
                    } },
                    React.createElement(ListView, { style: {
                            height: 80,
                            flex: 1
                        }, dataSource: this.state.suggestionsDataSource.cloneWithRows(this.state.availableTags), renderRow: this.renderSuggestion }))
                : null));
    }
    addTag(tag) {
        const newTags = [...this.state.selectedTags, tag];
        this.onTagsChanged(newTags);
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
});
//# sourceMappingURL=hash-tag-input.js.map