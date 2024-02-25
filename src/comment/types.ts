import data from '../../data.json'

export type User = typeof data.currentUser;

export type Comment = typeof data.comments[0];

export type Reply = typeof data.comments[0]['replies'][0];
