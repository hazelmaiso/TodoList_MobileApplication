angular.module('mynotes.notestore', [])


.factory('noteStore', function(){
  /*deserialize notes from localstorage otherwise deserialize an array*/
  var notes = angular.fromJson(window.localStorage['notes'] || "[]");
  /*Using html5 localStorage && angular to JSON to serialize*/
  /*localStorage Obj has to be serialize and deserialize*/
  function persist(){
    window.localStorage['notes'] = angular.toJson(notes);
  }
  /* methods */
  return {
    list: function(note){
      return notes;
    },
    get: function(noteId){
      for(var i = 0; i < notes.length; i++){
        if(notes[i].id === noteId) {
          return notes[i]
        }
      }
      return undefined;
    },
    create: function(note){
      notes.push(note);
      persist();
    },
    update: function(note){
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === note.id) {
          notes[i] = note;
          persist();
          return;
        }
      }
    },
    remove: function(noteId){
      for(var i = 0; i < notes.length; i++){
        if(notes[i].id === noteId){
          notes.splice(i,1);
          persist();
          return;
        }
      }
    },
  }
})
