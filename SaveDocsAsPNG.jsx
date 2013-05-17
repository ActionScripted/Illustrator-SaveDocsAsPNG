/**********************************************************

ADOBE SYSTEMS INCORPORATED
Copyright 2005-2006 Adobe Systems Incorporated
All Rights Reserved

NOTICE:  Adobe permits you to use, modify, and
distribute this file in accordance with the terms
of the Adobe license agreement accompanying it.
If you have received this file from a source
other than Adobe, then your use, modification,
or distribution of it requires the prior
written permission of Adobe.

*********************************************************/

/** Saves every document open in Illustrator
  as a PNG file in a user specified folder.
*/

// Main Code [Execution of script begins here]

try {
  // uncomment to suppress Illustrator warning dialogs
  // app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

  if (app.documents.length > 0 ) {

    var userConfirmSave = confirm('Because of scripting limitations, each file will be closed without prompting you to save after each export. You will lose any unsaved changes. Are you sure you want to continue?', true, 'Are you sure you want to export/close these open files?');

    if (userConfirmSave) {

      // Get the folder to save the files into
      var destFolder = null;
      destFolder = Folder.selectDialog( 'Select folder for PNG files.', '~' );

      if (destFolder != null) {
        var options, type, targetFile, docCount;

        options  = this.getOptions(); // Get the PNG options to be used, changeable below
        type     = this.getType();    // Get the export type (PNG24)
        docCount = 0;

        // Because exportFile sucks, we can only work with the active document so...

        while (app.documents.length) {
          // Get the file to export the document as swf intos
          var targetFile = new File(destFolder + '/' + app.activeDocument.name + '.png');

          // Export to PNG
          app.activeDocument.exportFile(targetFile, type, options);

          // Close current file
          app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

          docCount++;
        }

        alert(docCount + ' document(s) saved as PNG to ' + destFolder);
      }

    }

  }
  else{
    throw new Error('There are no documents open!');
  }
}
catch(e) {
  alert( e.message, "Script Alert", true);
}


/** Returns the options to be used for the generated files.
  @return ExportOptionsPNG24 object
*/
function getOptions() {
  // Create the required options object
    var options = new ExportOptionsPNG24();

    // The defaults are awesome, except this one
    options.artBoardClipping = true;

    return options;
}


/** Returns the type to be used for the generated files.
 *  @return ExportType.PNG24
 */

function getType() {
  var type = ExportType.PNG24;
  return type;
}


/** Returns the file to save or export the document into.
  @param docName the name of the document
  @param ext the extension the file extension to be applied
  @param destFolder the output folder
  @return File object
*/
function getTargetFile(docName, ext, destFolder) {
  var newName = "";

  // if name has no dot (and hence no extension),
  // just append the extension
  if (docName.indexOf('.') < 0) {
    newName = docName + ext;
  } else {
    var dot = docName.lastIndexOf('.');
    newName += docName.substring(0, dot);
    newName += ext;
  }

  // Create the file object to save to
  var myFile = new File( destFolder + '/' + newName );

  // Preflight access rights
  if (myFile.open("w")) {
    myFile.close();
  }
  else {
    throw new Error('Access is denied');
  }
  return myFile;
}
