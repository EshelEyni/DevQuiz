import { Footer } from "../Gen/Footer";

export const AppFooter = () => {
  return (
    <Footer>
      <div className="fixed bottom-0 left-0 mt-4 flex h-20 w-screen items-center justify-between bg-gray-800 px-3 text-3xl text-gray-300 md:h-16 md:text-2xl">
        <p>
          Created By
          <a
            href="https://www.esheleyni.com/home"
            target="_blank"
            rel="noreferrer"
            className="mx-1 font-semibold text-white hover:underline"
          >
            Eshel Eyni
          </a>
          , 2023
        </p>
      </div>
    </Footer>
  );
};
