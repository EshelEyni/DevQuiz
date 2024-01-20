import { Outlet } from "react-router-dom";

export const About = () => {
  return (
    <>
      <div className="flex max-w-[800px] flex-col gap-8 p-4 md:p-8 lg:p-12">
        <h1 className="mb-6 text-center text-6xl font-bold md:text-4xl lg:text-5xl">
          About
        </h1>
        <p className="text-3xl md:text-xl">
          Welcome to <strong>DevQuiz</strong>, the ultimate quiz app for
          developers! Created with a passion for coding and learning, DevQuiz
          offers a dynamic way to test and enhance your knowledge in various
          development technologies including JavaScript, React, Node.js, and
          many more.
        </p>
        <p className="text-3xl md:text-xl">
          Our questions, crafted by leveraging the power of the OpenAI API and
          meticulously edited for clarity and accuracy, are designed to
          challenge and educate both beginners and seasoned developers.
        </p>
        <p className="text-3xl md:text-xl">
          Whether you&apos;re prepping for an interview, brushing up on your
          skills, or just looking for a fun way to learn, DevQuiz has something
          for everyone. Get ready to dive into hundreds of questions across
          different tech stacks and push your limits.
        </p>
        <p className="text-3xl md:text-xl">
          Start your quiz journey now and join a community of learners who are
          as passionate about technology as you are!
        </p>
      </div>
      <Outlet />
    </>
  );
};
