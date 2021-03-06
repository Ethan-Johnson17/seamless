export class Post {
  constructor(data) {
    this.tag = data.tag
    this.body = data.body
    this.image = data.image
    this.likes = data.likes
    this.creatorId = data.creatorId
    this.timestamps = data.createdAt
    this.id = data.id
  }

  get Template() {
    return `
    <div class="col-md-${this.size()} card px-0 m-${this.size()} border-0"><img src="${this.image}"
    class="rounded shadow m-0" data-bs-toggle="modal"
    data-bs-target="#postInfo" onclick="app.postsController.getPostData('${this.id}')"></div>`
  }

  get ModalTemplate() {
    return /* html */ `
    

    <div class="modal-header ratio ratio-1x1" style="background-image: url(${this.image})">
    <div class="d-flex justify-content-end align-items-start">
      <button type="button" class="btn-close float-end p-2 m-3 selectable" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>
  </div>
  
  <div class="modal-body container">
    <div class="row">
      <div class="col-md-12">
        <p><b>${this.tag}</b></p>
        <p>${this.body}</p>
      </div>
    </div>
    <div class="row" id="comments">
    </div>
  </div>

    <div class="row mx-auto align-items-center" style="min-height: 10vh;">
      <div class="col-md-12 d-flex justify-content-between">
        <form onsubmit="app.commentsController.createComment('${this.id}')">
          <div class="input-group mb-3">
            <input name="body" type="text" class="form-control" aria-label="Sizing example input" placeholder="New Comment..." 
            aria-describedby="inputGroup-sizing-default"></input>
              <button type="submit" class="btn btn-primary">Post</button>
              </div>
        </form>
      </div>
    </div>


  `
  }

  size() {
    if (this.likes <= 5) {
      return '1'
    } else if (this.likes <= 10) {
      return '2'
    } else {
      return '3'
    }
  }
}
