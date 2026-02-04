//The following functions need work and are from another example of using OPFS
// https://www.telerik.com/blogs/how-store-files-user-device-opfs#:~:text=Chrome%20and%20Edge).-,What%20We%20Are%20Building,the%20VS%20Code%20Live%20Server.

//setup stuff
      const notesListEl = document.getElementById("notes-list");
      const statusEl = document.getElementById("status");
      const titleEl = document.getElementById("title");
      const noteEl = document.getElementById("note");
      async function getOPFSRoot() {
        if (!("storage" in navigator && "getDirectory" in navigator.storage)) {
          alert("OPFS is not supported in this browser.");
          throw new Error("OPFS not supported");
        }
        return await navigator.storage.getDirectory();
      }

//save photo to OPFS (might have to work with fileLoader.js)
      async function saveNote() {
        const title = titleEl.value.trim();
        const content = noteEl.value;
        if (!title) return showStatus("Please enter a title.");
        try {
          const root = await getOPFSRoot();
          const handle = await root.getFileHandle(`${title}.txt`, {
            create: true,
          });
          const writable = await handle.createWritable();
          await writable.write(content);
          await writable.close();
          showStatus(`Note '${title}' saved.`);
          loadNotesList();
        } catch (err) {
          console.error(err);
          showStatus("Error saving note.");
        }
      }
//load photos from OPFS (would propbably be done on the main page, coudl have a preview section too)
      async function loadNote(title) {
        try {
          const root = await getOPFSRoot();
          const handle = await root.getFileHandle(`${title}`);
          const file = await handle.getFile();
          const content = await file.text();
          titleEl.value = title.replace(".txt", "");
          noteEl.value = content;
          showStatus(`Note '${title}' loaded.`);
        } catch (err) {
          console.error(err);
          showStatus("Error loading note.");
        }
      }
//delete photos
      async function deleteNote(title) {
        if (!confirm(`Delete note '${title}'?`)) return;
        try {
          const root = await getOPFSRoot();
          await root.removeEntry(`${title}`);
          showStatus(`Note '${title}' deleted.`);
          loadNotesList();
        } catch (err) {
          console.error(err);
          showStatus("Error deleting note.");
        }
      }
      function showStatus(msg) {
        statusEl.textContent = msg;
      }