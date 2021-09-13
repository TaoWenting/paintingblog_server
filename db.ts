export type Comment = {
  id: string;
  content: string;
 
};

export type Painting = {
  id: string;
  name: string;
  picture: string;
  comments: string[];
};

export const comments: Comment[] = [];
export const paintings: Painting[] = [];

export const resetDb = () => {
  comments.splice(
    0,
    Infinity,
    ...[
      {
        id: '1',
        content: 'Wonderful energy and beautiful colors!',
        
      },
      {
        id: '2',
        content: "Beautiful flowers!",

        
      },

    ]
  );

  paintings.splice(
    0,
    Infinity,
    ...[
      {
        id: '1',
        name: 'Flower1',
        picture: 'https://github.com/TaoWenting/painting_picture/blob/main/1.jpg?raw=true',
        comments: ['1'],
      },
      {
        id: '2',
        name: 'Flower2',
        picture: 'https://raw.githubusercontent.com/TaoWenting/painting_picture/06bed58e246803e952ed3308e007e0fafc82e727/2.jpg',
        comments: ['2'],
      },

    ]
  );
};

resetDb();