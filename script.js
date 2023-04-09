var workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var now = dayjs();
$(document).ready(function () {

  //Add the current date with hour to page header
  $('#currentDay').text(now.format('MM/DD/YY h:mm:ss A'));

  loadHoursLayout();

  loadDailyEvents();

  //click function to store the text in local storage
  $('.saveBtn').click(function (event) {
    var buttonId = $(this).parent().attr('id');
    var eventText = $('#' + buttonId).find('textarea').val();
    var dailyEvent = {
      day: now.format('DD'),
      month: now.format('MM'),
      year: now.format('YY'),
      text: eventText
    }

    window.localStorage.setItem(buttonId, JSON.stringify(dailyEvent));

  });
  //falta que se actualice sola la pagina web para ver cuando se cambien las clases 

});


//function that loads all the lay outs and adds the corresponding ids and classes (present,future,past)
function loadHoursLayout() {
  var currentHour = now.format('h');

  //for each loop to generate all the blocks of of the hours, adding the class present, future or past depending on the current hour.
  workHours.forEach(hour => {
    $("#time-blocks").append(`<div id="${hour}" class="row time-block ${hour == currentHour ? ` present` : hour < currentHour ? ` past` : ` future`}">
        <div class="col-2 col-md-1 hour text-center py-3">${hour < 12 ? hour + ` AM` : hour === 12 ? hour + ` PM` : (hour - 12) + ` PM`}  </div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>`);
  });
};

//function that loads all daily events from the local storage and checks if the dates are the same
function loadDailyEvents() {

  workHours.forEach(eventId => {

    var token = localStorage.getItem(eventId);
    var eventObj = JSON.parse(token);
    //check if element exist on local storage and if the current dates are the same
    if (token && eventObj &&
      eventObj.day === now.format('DD') && eventObj.month === now.format('MM') && eventObj.year === now.format('YY')) {

      $('#' + eventId).find('textarea').val(eventObj.text);

    }
  });
}