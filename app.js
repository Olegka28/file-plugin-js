import firebase from "firebase/app";
import "firebase/storage";

import { upload } from "./upload";

var firebaseConfig = {
  apiKey: "AIzaSyA7cYQCbJ1katfEFOJilC0Oo3IWNu2X-48",
  authDomain: "fe-upload-d53d9.firebaseapp.com",
  projectId: "fe-upload-d53d9",
  storageBucket: "fe-upload-d53d9.appspot.com",
  messagingSenderId: "586978317022",
  appId: "1:586978317022:web:f143001fda791f4518e84f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

console.log(storage);

upload("#file", {
  multi: true,
  accept: [".png", ".jpg", ".jpeg", ".gif"],
  onUpload(files, blocks) {
    files.forEach((file, index) => {
      const ref = storage.ref(`images/${file.name}`);
      const task = ref.put(file);

      task.on(
        "state_changed",
        (snapshot) => {
          const percentage = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(0);

          const block = blocks[index].querySelector(".preview-info-progress");
          block.textContent = `${percentage} %`;
          block.style.widnt = percentage + "%";
        },
        (error) => console.log(error),
        () => {
          task.snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
          });
        }
      );
    });
    console.log("Files:", files);
  },
});
