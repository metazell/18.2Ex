console.log("Let's get this party started!");

$(document).ready(function() {
  const $gifContainer = $('#gifContainer');
  const $searchForm = $('#searchForm');
  const $removeAllButton = $('#removeAll');

  function centerElements() {
    $('body').css({
      'display': 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'flex-start', 
      'min-height': '100vh',
      'margin': '0',
      'text-align': 'center',
      'padding-top': '50px' 
    });
    $('#searchForm').css({
      'margin-bottom': '20px'
    });
    $('#gifContainer').css({
      'display': 'flex',
      'flex-wrap': 'wrap',
      'justify-content': 'center'
    });
    $('#gifContainer img').css({
      'margin': '10px',
      'max-width': '100%',
      'height': 'auto'
    });
  }

  async function getGif(query) {
    const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'; 
    const url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=1`;

    try {
      const response = await axios.get(url);
      const gifUrl = response.data.data[0].images.fixed_height.url;
      appendGif(gifUrl);
    } catch (error) {
      console.error("Error fetching data from Giphy API", error);
    }
  }

  function appendGif(gifUrl) {
    const $gif = $('<img>').attr('src', gifUrl);
    $gifContainer.append($gif);
    centerElements();
  }

  $searchForm.on('submit', function(event) {
    event.preventDefault();
    const query = $('#searchInput').val();
    getGif(query);
    $('#searchInput').val(''); 
  });

  $removeAllButton.on('click', function() {
    $gifContainer.empty();
  });

  centerElements();
});




