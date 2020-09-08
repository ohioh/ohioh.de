We use CSS MEdia Quesries to adjust Layout& Design.

We try to influence the world of tracing from different fields and views.

On is to make the APP Experiance for the use extreme comprehensible and understandable.

For this implementation of goals we need and combination of traditional App Coding ( JavaScript with React+(Native) ) and html & css.
An important file for this to understand the schema is the material.{primary}-{accent}.min.css ormaterial.{primary}-{accent}.min.js File in our repository.
Test it yourself by open our APP-Page in Chrome and open the Dev Tools -> Elements. Now move the size of the App-View-Field and you see that the code is reacting on your choice of the View size. Look to the class changes in the file "..is-small-screen".

The DOM ( https://de.wikipedia.org/wiki/Document_Object_Model ) need a style guide. In React Native it is often used with the style class and a methode for each element that we used. The CSS and JS calles from the index.html and serviceWorker is  very similar


This brings the user a reponsive Experiance


Interesting Link:

https://getmdl.io/started/

http://daemonite.github.io/material/docs/4.0/getting-started/introduction/

If you want to give your knowledge a try you can dive to following code:

<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta content="initial-scale=1, shrink-to-fit=no, width=device-width" name="viewport">

    <!-- CSS -->
    <!-- Add Material font (Roboto) and Material icon as needed -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Add Material CSS, replace Bootstrap CSS -->
    <link href="css/material.min.css" rel="stylesheet">
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

    <!-- Then Material JavaScript on top of Bootstrap JavaScript -->
    <script src="js/material.min.js"></script>
  </body>
</html>
