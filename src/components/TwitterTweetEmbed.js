import React, { Component } from 'react'
import PropTypes from 'prop-types'
const script = require('scriptjs')

script('https://platform.twitter.com/widgets.js', 'twitter-embed')

export default class TwitterTweetEmbed extends Component {
    static propTypes = {
        tweetId: PropTypes.string.isRequired,
        options: PropTypes.object
    }

    componentDidMount() {
        if(typeof window !== 'undefined') {
            script.ready('twitter-embed', () => {
                if(!window.twttr) {
                    console.error('Failure to load window.twttr, aborting load.')
                    return
                }

                const { tweetId, options = {} } = this.props
                window.twttr.widgets.createTweet(tweetId, this.embedContainer, options)
            })
        }
    }

    render = () => <div ref={el => { this.embedContainer = el }} className="embedded-tweet" />
}
