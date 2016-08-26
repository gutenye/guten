import React, {Component} from "react"
import {graphql} from "react-apollo"
import gql from "graphql-tag"

class Home extends Component {
  state = {
    currentPage: 1
  }

  render() {
    if (this.props.loading)
      return <div>loading</div>
    var {props: {posts, post}, next} = this
    return (
      <div>
        <div>Post: {post.title}</div>
        {posts.map(({id, title, comments}) =>
        <div key={id}>{title}: {comments.length}</div>
        )}
        <div><button onClick={next}>Next</button></div>
      </div>
    )
  }

  next = () => {
    var {state: {currentPage}, props: {fetchMore}} = this
    currentPage = currentPage + 1
    this.setState({currentPage})
    fetchMore({
      variables: {page: currentPage},
      updateQuery: (data, {fetchMoreResult, queryVariables}) => {
        return {...data, posts: fetchMoreResult.data.posts}
      }
    })
  }
}

Home = graphql(gql`
  query Home($page: Int, $limit: Int) {
    posts(page: $page, limit: $limit) {
      id
      title
      comments {
        id
        content
      }
    }

    post {
      title
    }
  }
`, {
  options: () => ({
    variables: {page: 1, limit: 2}
  }),
  props: ({data}) => {
    return data
  },
})(Home)

export default Home
