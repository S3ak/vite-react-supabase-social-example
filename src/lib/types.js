import PropTypes from "prop-types";

/**
 * A Post created by a end-user.
 * @typedef  {Object} CommentModel
 * @property {Number} id - an ID.
 * @property {string} body
 * @property {Number} replyToId
 * @property {Number} postId
 * @property {String} owner
 * @property {String} created
 * @property {ProfileModel} author - Number of posts a profile created.
 * @property {Object} reactions
 * @property {string} reactions.symbol
 * @property {Number} reactions.count
 * @property {Number} reactions.postID
 * @property {string} reactions.message
 * @property {Object} _count
 * @property {Number} _count.comments
 * @property {Number} _count.reactions
 */

/**
 * A Post created by a end-user.
 * @typedef  {Object} ProfileModel
 * @property {Number} id - an ID.
 * @property {string} name - The unique name of the profile.
 * @property {string} email - The email address of the profile.
 * @property {string} avatar - The URL of the profile avatar image.
 * @property {string} banner - The URL of the profile banner image
 * @property {Object} _count - A JSON object containing the number of posts, followers and following for this profile..
 * @property {Number} _count.posts - Number of posts a profile created.
 * @property {Number} _count.followers - Number of other profiles following this profile.
 * @property {Number} _count.posts - Number of other profiles this profile is following.
 */

/**
 * A Post created by a end-user.
 * @typedef  {Object} PostModel
 * @property {Number} id - an ID.
 * @property {string} title - summary of the post.
 * @property {string} body - article of the post.
 * @property {string[]} tags - Tags to group a post.
 * @property {string} media - A URL to an image or video.
 * @property {string} created - The date the post was created.
 * @property {string} updated - The date the post was last updated.
 * @property {Object} _count - A JSON object containing the number of comments and reactions.
 * @property {Number} _count.comments - the number of comments.
 * @property {Number} _count.reactions - the number of reactions.
 * @property {ProfileModel} author - The profile that created this post.
 * @property {Object} comments - The profile that created this post.
 */

export const PostShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  reactions: PropTypes.number,
  userId: PropTypes.number,
  authorName: PropTypes.string,
  imageUrl: PropTypes.string,
};
