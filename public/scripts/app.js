const images = {
  1: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1040&q=80",
  2: "https://images.unsplash.com/photo-1586488902367-b1ef9e974582?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  3: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  4: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
  5: "https://images.unsplash.com/photo-1533747122906-9ac6b6709832?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80",
  6: "https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
}

const renderPost = function (posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    let wrapper = `<article class="posts" style="background-image: linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url(${images[obj.resource_type_id]})">${postHTML}</article>`;
    $(".text-post").prepend(wrapper);
  }
};

const renderMyFavs = function(posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    let wrapper = `<article class="posts" style="background-image: linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url(${images[obj.resource_type_id]})">${postHTML}</article>`;;
    $(".favourite-post").prepend(wrapper);
  }
};

const renderMyPosts = function(posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    let wrapper = `<article class="posts" style="background-image: linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url(${images[obj.resource_type_id]})">${postHTML}<form id="delete"><button type="submit">Delete</button></form></article>`;
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
    <div id ="source_button"><a href="${url}" id="short_source">Go To Source</a></div>
  </body>
  <footer id= "timestamp">
    <span>Posted ${timeago.format(created)} </span><span></i><i class="fas fa-heart"></i></span>
  </footer>

  `;
  return $html;
}

$(document).ready(function () {
  $('.favourite').on('click');
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
    $('.favourite').off('click');
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

