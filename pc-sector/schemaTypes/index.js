// schemaTypes/index.js
import blockContent from './blockContent'
import article from './article'
import game from './game'
import developer from './developer'
import publisher from './publisher'
import genre from './genre'
import review from './review'
import video from './video'
import tag from './tag'
// If you create an 'author' schema, import it here too:
// import author from './author'

export const schemaTypes = [
  // Document types
  article,
  game,
  developer,
  publisher,
  genre,
  review,
  video,
  tag,
  // author, // if you add it

  // Object types
  blockContent,
]