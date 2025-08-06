# Web Development Final Project - KoilKare Forum

Submitted by: Praise Okoli

This web app: Promotes community building within the type 4C hair community by providing a forum with access to discussion threads based on topic. The topics include #washday, #products, #protectivestyles, and more! Users can create accounts to track their threads, create and edit thread postings, and interact with other users. 

Time spent: 18 hours spent in total

## Required Features

The following **required** functionality is completed:


- [X] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [X] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [X] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [X] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [X] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

The following **optional** features are implemented:


- [X] Web app implements pseudo-authentication
  - Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation
  - **or** upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them
  - For both options, only the original user author of a post can update or delete it
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post
  - Users can repost a previous post by referencing its post ID
  - On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface
  - e.g., selecting the color scheme or showing the content and image of each post on the home feed
- [X] Users can add more characterics to their posts
  - Users can share and view web videos
  - Users can set flags such as "Question" or "Opinion" while creating a post
  - Users can filter posts by flags on the home feed
  - Users can upload images directly from their local machine as an image file
- [X] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [X] A summary page of the number of threads and categories for each thread is listed on the Home page. 
* [X] Users can search for titles by looking up specific categories. Since most thread titles have some form of the category in them, users have access to more threads related to their desired topic
* [X] A Login and SignUp page are added for later development
 
## Video Walkthrough

Here's a walkthrough of implemented user stories:
Home and Explore Page:
<img src='https://i.imgur.com/n29dIN1.gif' title='Home/Explore Page Walkthrough' width='' alt='Home/Explore Page Walkthrough' />
Create Post/Thread:
<img src='https://i.imgur.com/7CebQRI.gif' title='Create Post Walkthrough' width='' alt='Create Post  Walkthrough' />
Update/Delete Post:
<img src='https://i.imgur.com/dbkR5EB.gif' title='Update/Delete Post Walkthrough' width='' alt='Update/Delete Post  Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
[ScreenToGif](https://www.screentogif.com/) for Windows


## Notes

Describe any challenges encountered while building the app.

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.