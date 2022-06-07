/* global data */

var $title = document.querySelector('#title');
var $urlInput = document.querySelector('#URL-input');
var $notes = document.querySelector('#notes');
var $imgBox = document.querySelector('#img-box');
var $form = document.querySelector('form');

function changeSrc(event) {
  $imgBox.src = $urlInput.value;
}

$urlInput.addEventListener('input', changeSrc);

function view(viewName) {
  for (let i = 0; i < $allView.length; i++) {
    if ($allView[i].getAttribute('data-view') === viewName) {
      $allView[i].className = 'view';
    } else if ($allView[i].getAttribute('data-view') !== viewName) {
      $allView[i].className = 'view hidden';
    }
  }
}

function handleSubmit(event) {
  if (data.editing === null) {
    event.preventDefault();
    var newEntry = {};
    newEntry.image = $urlInput.value;
    newEntry.title = $title.value;
    newEntry.notes = $notes.value;
    newEntry.entryId = data.nextEntryId;
    data.entries.push(newEntry);
    data.nextEntryId++;
    $form.reset();
    view('entries');
    $ul.appendChild(renderEntry(newEntry));
    $imgBox.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else if (data.editing !== null) {
    event.preventDefault();
    data.editing.image = $urlInput.value;
    data.editing.title = $title.value;
    data.editing.notes = $notes.value;
    for (let i = 0; i < $allEntries.length; i++) {
      if ($allEntries[i].dataset.entryId === data.editing.entryId.toString()) {
        $allEntries[i] = data.editing;
        $allEntries[i].replaceWith(renderEntry(data.editing));
      }
    }
    $form.reset();
    view('entries');
    data.editing = null;
    $imgBox.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

/*
DOM model
<li>
  <div class="entry-container">
    <div class="row entry">
      <div class="column-half">
        <img class="img-box" src="images/placeholder-image-square.jpg">
      </div>
      <div class="column-half">
        <div class="row between">
          <h2>title</h2>
          <img class="edit-button" src="images/edit-3-32.png" alt="edit">
        </div>
        <div class="row">
          <p class="entry-notes">
            text content
          </p>
        </div>
      </div>
    </div>
  </div>
</li>
*/

function renderEntry(entry) {
  var li = document.createElement('li');
  li.setAttribute('data-entry-id', entry.entryId);
  var newEntry = document.createElement('div');
  newEntry.setAttribute('class', 'entry-container');
  li.appendChild(newEntry);
  var entryRow = document.createElement('div');
  entryRow.setAttribute('class', 'row entry');
  newEntry.appendChild(entryRow);

  var colHalf1 = document.createElement('div');
  colHalf1.setAttribute('class', 'column-half');
  entryRow.appendChild(colHalf1);
  var img = document.createElement('img');
  img.setAttribute('class', 'img-box');
  img.setAttribute('src', entry.image);
  colHalf1.appendChild(img);

  var colHalf2 = document.createElement('div');
  colHalf2.setAttribute('class', 'column-half');
  entryRow.appendChild(colHalf2);

  var row1 = document.createElement('div');
  row1.setAttribute('class', 'row between');
  colHalf2.appendChild(row1);
  var title = document.createElement('h2');
  var titleText = document.createTextNode(entry.title);
  title.appendChild(titleText);
  row1.appendChild(title);
  var editButton = document.createElement('img');
  editButton.setAttribute('class', 'edit-button');
  editButton.setAttribute('src', 'images/edit-3-32.png');
  row1.appendChild(editButton);

  var row2 = document.createElement('div');
  row2.setAttribute('class', 'row');
  colHalf2.appendChild(row2);
  var notes = document.createElement('p');
  var notesText = document.createTextNode(entry.notes);
  notes.appendChild(notesText);
  row2.appendChild(notes);

  return li;
}

var $ul = document.querySelector('ul');

for (let i = 0; i < data.entries.length; i++) {
  var entry = renderEntry(data.entries[i]);
  $ul.appendChild(entry);
}

$form.addEventListener('submit', handleSubmit);

var $allView = document.querySelectorAll('.view');
var $entries = document.querySelector('#entries');
var $new = document.querySelector('#new');

function switchView(event) {
  var $dataView = event.target.getAttribute('data-view');
  for (let i = 0; i < $allView.length; i++) {
    if ($allView[i].getAttribute('data-view') === event.target.getAttribute('data-view')) {
      $allView[i].className = 'view';
    } else if ($allView[i].getAttribute($dataView) !== event.target.$dataView) {
      $allView[i].className = 'view hidden';
    }
  }
  if ($h1.innerHTML === 'Edit Entry') {
    $h1.innerHTML = 'New Entry';
  }
}

$entries.addEventListener('click', switchView);
$new.addEventListener('click', switchView);

// create a new HTML form for editable content
// make it hidden and shown when clicking on an edit icon
// insert the textcontent of each DOM element as the content into the HTML element
// when completed, have content of HTML replace the content in the object at the right place in the entries array
// switch back to the entries view tab

// var $editButton = document.querySelector('.edit-button');
// var $saveEdit = document.querySelector('#save-edit');
var $entryList = document.querySelector('#entry-list');
var $allEntries = document.querySelectorAll('li');
var $h1 = document.querySelector('h1');

function handleEdit(event) {
  if (event.target.className === 'edit-button') {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId.toString() === event.target.closest('li').getAttribute('data-entry-id')) {
        data.editing = data.entries[i];
      }
    }
    $urlInput.value = data.editing.image;
    $title.value = data.editing.title;
    $notes.value = data.editing.notes;
    $imgBox.setAttribute('src', data.editing.image);
    $h1.innerHTML = 'Edit Entry';
    view('entry-form');
  }
}

$entryList.addEventListener('click', handleEdit);

// var $modal = document.querySelector('#modal');

// function open(event) {
//   $modal.showModal()
// }

// function close(event) {
//   $modal.close();
// }
