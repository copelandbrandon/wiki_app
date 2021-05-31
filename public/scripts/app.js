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
  <h1>${title}</h1>
  <h1>${url}</h1>
  <h1>${description}</h1>
  <h1>${type}</h1>
  <h1>${topic}</h1>
  <h1>${created}</h1>
  <h1>${name}</h1>
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
