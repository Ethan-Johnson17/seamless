export class Comment {
  constructor(data) {
    this.body = data.body
    this.likes = data.likes
    this.postId = data.postId
    this.creatorId = data.creatorId
  }

  get template() {
    return `
    
    `
  }
}
