export class Post {
  constructor(data) {
    this.tag = data.tag
    this.body = data.body
    this.image = data.image
    this.likes = data.likes
    this.creatorId = data.creatorId
    this.timestamps = data.timestamps
  }

  get Template() {
    return `
      <div class="col-md-${this.size()}"><img src="${this.image}"> </div>`
  }

  size() {
    if (this.likes <= 5) {
      return '2'
    } else if (this.likes <= 10) {
      return '4'
    } else {
      return '6'
    }
  }
}
