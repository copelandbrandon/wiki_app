const renderPost = function (posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    $(".text-post").prepend(postHTML);
  }
};

const createPostHtml = function (obj) {
  let title = obj.title;
  let url = obj.url;
  let description = obj.description;
  let type = obj.name;
  let topic = obj.topic;
  let created = obj.created_at;
  let name = obj.poster_name;

  let $html = `
  <div class = "posts">
  <header>
    <h4>${title}</h4>
    <h5>By: ${name}</h5>
  </header>
  <body>
    <h6>${description}</h6>
  </body>
  <footer id= "timestamp">
    <span>${timeago.format(created)}</span><span></i><i class="fas fa-heart"></i></span>
  </footer>
  </div>
  `;
  return $html;
}

$(document).ready(function () {

  $.ajax('/api/users', {
    method: "GET",
  })
  .then(function (posts) {
    console.log("first render", posts);
    renderPost(posts);
  })

  $(`#search-form`).submit(function(ev) {
    ev.preventDefault();
    const title = $('#title').val();
    const topic = $('#topic').val();
    const type = $('#type').val();
    const dataObj = {title, topic, type};

    $.post('/api/users/search', dataObj)
    .then(function (posts) {
      $(".text-post").empty();
      renderPost(posts);
    })

  })
})
