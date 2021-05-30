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
const renderPost = function(posts) {
  for (let obj of posts) {
    let postHtml = createPostHtml(obj)
  }
}
const createPostHtml = function(obj) {
  console.log(obj.title)
}
$(document).ready( function() {
  console.log('ready')
  $.ajax({
    method: "GET",
    url: "/api/users"
  })
  .then(function(posts) {
    renderPost(posts);
  })
})
