import React from "react";

function About() {
  return (
    <section>
      <h1>About StreamList</h1>

      <p>
        StreamList is a React-based application created for EZTechMovie. The app
        is designed to help users manage movies, shows, subscriptions, and cart
        items in one place.
      </p>

      <p>
        Users can create a personal watch list, search for movie information,
        review subscription options, add items to a cart, and keep selected data
        saved with localStorage.
      </p>

      <p>
        The final version also includes Progressive Web App features, including
        a manifest file and service worker, so the application can support a more
        app-like experience.
      </p>

      <div className="about-card">
        <h3>Current Features</h3>
        <ul>
          <li>React Router navigation</li>
          <li>StreamList add, edit, delete, and complete options</li>
          <li>TMDB movie search API</li>
          <li>Subscription and cart system</li>
          <li>Cart total and quantity controls</li>
          <li>localStorage support</li>
          <li>PWA manifest and service worker</li>
        </ul>
      </div>
    </section>
  );
}

export default About;