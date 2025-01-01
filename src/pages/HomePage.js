import React from 'react';
import NavBar from '../components/NavBar';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className="container fade-in">
        <h1 className="title">Welcome to the Forms</h1>
        <p>The best forms web app in the world.</p>
        <img src="/images/forms-example1.png" alt="Forms Example 1" className="example" />
      </div>
      <div className="description fade-in">
        <h2>Create Fully Customizable Forms</h2>
        <p>
          You can create any type of form such as quizzes, tests, questionnaires, and many more.
        </p>
        <div className="image-row">
          <img src="/images/forms-example2.png" alt="Forms Example 2" className="example" />
          <img src="/images/forms-example3.png" alt="Forms Example 3" className="example" />
        </div>
        <h3>Easy-to-Use Website with Different Functions and Templates</h3>
        <button className="cta-button">Start Creating Now</button>
      </div>
      <div className="footer">
        <h4>Copyright 2024 © Itransition Project</h4>
      </div>
    </div>
  );
};

export default HomePage;