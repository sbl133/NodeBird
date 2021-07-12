import shortId from 'shortid';

export const initialstate = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '버러범',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          id: shortId.generate(),
          src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        },
        {
          id: shortId.generate(),
          src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        },
        {
          id: shortId.generate(),
          src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔군요~',
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'hero',
          },
          content: 'asdasd',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: shortId.generate(),
  content: data.content,
  User: {
    id: 1,
    nickname: '버러범',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '버러범',
  },
});
const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        aremoveostLoading: false,
        removePostError: action.error,
      };
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};
export default reducer;
