
var localeStorage = {};
dayjs.locale(localeStorage);

//Users current time
$(function () {
  var currentHour = dayjs().format('H');
// This function changes the color of each time block based on whether it's in the past, present, or future depending on the current time.
  function hoursColor() {
    $('.time-block').each(function() {
      var blocksHour = parseInt(this.id);
      $(this).toggleClass('past', blocksHour < currentHour);
      $(this).toggleClass('present', blocksHour === currentHour);
      $(this).toggleClass('future', blocksHour > currentHour);
    });
  }
// The  function below will save the user's input in a textarea to localStorage - only when the save button followed by te refresh button.
  function usersInput() {
    $('.saveBtn').on('click', function() {
      var keyinput = $(this).parent().attr('id');
      var value = $(this).siblings('.description').val();
      localStorage.setItem(keyinput, value);
    });
  }
 // The function below will refresh the color of each time block based on whether it's in the past (grey), present(yellow), or future(green) relative to the current time. 
  function changeColor() {
    $('.time-block').each(function() {
      var blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }
  // This will get the user input from the localStorage and set textarea values for each time block.
  $('.time-block').each(function() {
    var keyinput = $(this).attr('id');
    var value = localStorage.getItem(keyinput);
    $(this).children('.description').val(value);
  });

  // This function will update the time every second
  function refreshedTime() {
    var dateElement = $('#date');
    var timeElement = $('#time');
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    var currentTime = dayjs().format('hh:mm:ss A');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }
  // Call the three main functions to set up the page.
  hoursColor();
  usersInput();                
  changeColor();

  // Call the function to show the current date and time
  setInterval(refreshedTime, 1000);
});

