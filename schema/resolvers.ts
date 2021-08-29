import { DateTimeResolver, URLResolver } from 'graphql-scalars';
import { Comment, paintings, comments } from '../db';
import { Resolvers } from '../types/graphql';


const resolvers: Resolvers = {

  URL: URLResolver,

  Comment: {
    painting(comment) {
      return paintings.find(c => c.comments.some(m => m === comment.id)) || null;
    },
  },

  Painting: {

    comments(painting) {
      return comments.filter((m) => painting.comments.includes(m.id));
    },


    lastComment(painting) {
      const lastComment = painting.comments[painting.comments.length - 1];

  
      return comments.find((m) => m.id === lastComment) || null;
    },
  },

  Query: {
    paintings() {
      return paintings;
    },


    painting(root, { paintingId}) {
      return paintings.find((c) => c.id === paintingId) || null;
    },
  },

  Mutation: {

    addComment(root, { paintingId, content }, { pubsub }) {
      const paintingIndex = paintings.findIndex((c) => c.id === paintingId);

      if (paintingIndex === -1) return null;

      const painting = paintings[paintingIndex];

      const commentsIds = comments.map(currentComment => Number(currentComment.id));
      const commentIds = comments.map((currentComment) =>
        Number(currentComment.id)
      );
      const commentId = String(Math.max(...commentIds) + 1);

      const comment: Comment = {
        id: commentId,
        
        content,
      };
      comments.push(comment);
      painting.comments.push(commentId);
      // The painting will appear at the top of the PaintingsList component
      paintings.splice(paintingIndex, 1);
      paintings.unshift(painting);

      pubsub.publish('commentAdded', {
        commentAdded: comment,
      });


      return comment;
    },
  },
  Subscription: {
    commentAdded: {
      subscribe: (root, args, { pubsub }) =>
        pubsub.asyncIterator('commentAdded'),
    },
  },

};
export default resolvers;