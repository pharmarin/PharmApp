import React from 'react';
import {
  Text
} from 'react-native';

export default class TermList extends React.Component {

  render () {
    post = this.props.post
    titleTerm = this.props.term

    terms = []

    post.terms[titleTerm].forEach(function (term) {
      terms.push(term.name)
    })

    return (
      <Text>
        {
          terms.reduce((previous, next) => [previous, ', ', next])
        }
      </Text>
    )
  }

}
