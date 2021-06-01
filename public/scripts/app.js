const renderPost = function (posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    let wrapper = `<article class="posts">${postHTML}</article>`;
    $(".text-post").prepend(wrapper);
  }
};

const renderMyFavs = function(posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    let wrapper = `<article class="posts">${postHTML}</article>`;
    $(".favourite-post").prepend(wrapper);
  }
};

const renderMyPosts = function(posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    let wrapper = `<article class="posts">${postHTML}<form id="delete"><button type="submit">Delete</button></form></article>`;
    $(".my-post").prepend(wrapper);
  }
}
const createPostHtml = function (obj) {
  let title = obj.title;
  let url = obj.url;
  let description = obj.description;
  let type = obj.name;
  let topic = obj.topic;
  let created = obj.created_at;
  let name = obj.poster_name;

  let $html = `
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

  `;
  return $html;
}

$(document).ready(function () {
  
  $(".new_post_form").hide();
  $.ajax('/api/users', {
    method: "GET",
  })
  .then(function (posts) {
    renderPost(posts);  
  });

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

  $('.favourite').click(function() {
    $(".text-post").hide();
    $.get('/api/users/favourites')
    .then(function (posts) {
      renderMyFavs(posts);
    })
    .then(function (){
      $.get('api/users/my_posts')
      .then(function (posts) {
        renderMyPosts(posts);
      })
    })
  })

  $(".new-post").click(function() {
    $(".new_post_form").slideToggle();
  });

  $(".new_post_form").submit(function(ev) {
    ev.preventDefault();
    console.log("reached!");
    const title = $('#new_title').val();
    const topic = $('#new_topic').val();
    const description = $('#new_description').val();
    const url = $('#new_url').val();
    const type = $('#new_type').val();
    const newPostObj = {title, topic, description, url, type};
    console.log(newPostObj);
    $.post('/api/users/create/', newPostObj)
    .then(function(post) {
      console.log(post);
      renderPost(post);
    })

  })

});

