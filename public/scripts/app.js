// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

const renderPost = function (posts) {
  console.log(posts);
  for (const obj of posts.users) {
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
    <h6>${created}</h6>
  </footer>
  </div>
  `;
  return $html;
}

$(document).ready(function () {
  console.log('ready')
  $.ajax('/api/users', {
    method: "GET",
  })
    .then(function (posts) {
      renderPost(posts);
    })
})
