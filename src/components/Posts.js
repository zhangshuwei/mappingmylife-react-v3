import React from 'react'

import PropTypes from 'prop-types'

const Posts = ({posts}) => (
  <div>
    <ul>
      {posts.map((post, i) =>
        <li key={i}>{post.title}</li>
      )}
    </ul>

  </div>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
