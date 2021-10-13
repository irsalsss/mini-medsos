- Since I really familiar with antd and to save much time, I decided to use it.
- List of users is part of filter.
- Each detail user information can be seen by clicking on the user full name.
- Each detail photo information can be seen by clicking on the image.

Comment:
- Each comments can be seen by clicking on the detail post. Hover the comment to show edit or delete icon.
- The comment is persist even after user changes another page, create new comment, edit and delete (not reload).
- I assume create new comment need an email, so I made irsal@hehehe.com.
- I assume user can only create, edit and delete the comment that he created.
- I can't update and delete comment using the given API, so I just handle it on client side.

Post:
- Every user can create, edit, delete a post.
- I created postCounter state to help me define unique id


how to run (node version: v16.4.0): 
- npm install
- npm start